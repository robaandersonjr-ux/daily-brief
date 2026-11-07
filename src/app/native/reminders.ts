import { LocalNotifications } from "@capacitor/local-notifications";
import { isNative } from "./platform";
import { persist } from "./persistence";

export type ReminderId = "morning" | "midday" | "evening";

export interface Reminder {
  id: ReminderId;
  label: string;
  title: string;
  body: string;
  route: string;
  enabled: boolean;
  time: string; // "HH:MM", 24-hour
}

const KEY = "daily-brief-reminders";

const NOTIFICATION_IDS: Record<ReminderId, number> = {
  morning: 101,
  midday: 102,
  evening: 103,
};

export const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: "morning",
    label: "Morning intentions",
    title: "Set today's intentions",
    body: "Three things that would make today a win.",
    route: "/intentions",
    enabled: true,
    time: "07:30",
  },
  {
    id: "midday",
    label: "Mid-day check-in",
    title: "Mid-day check-in",
    body: "How are your intentions going?",
    route: "/checkin",
    enabled: true,
    time: "12:30",
  },
  {
    id: "evening",
    label: "Evening reflection",
    title: "Close out your day",
    body: "One win, one challenge. Two minutes.",
    route: "/reflection",
    enabled: true,
    time: "20:00",
  },
];

export function getReminders(): Reminder[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null") as
      | Pick<Reminder, "id" | "enabled" | "time">[]
      | null;
    if (!saved) return DEFAULT_REMINDERS;
    return DEFAULT_REMINDERS.map((r) => {
      const s = saved.find((x) => x.id === r.id);
      return s ? { ...r, enabled: s.enabled, time: s.time } : r;
    });
  } catch {
    return DEFAULT_REMINDERS;
  }
}

function saveReminders(reminders: Reminder[]): void {
  const json = JSON.stringify(reminders.map(({ id, enabled, time }) => ({ id, enabled, time })));
  localStorage.setItem(KEY, json);
  persist(KEY, json);
}

/** Asks for notification permission. Returns true if granted. */
export async function ensurePermission(): Promise<boolean> {
  if (!isNative) return false;
  let { display } = await LocalNotifications.checkPermissions();
  if (display === "prompt" || display === "prompt-with-rationale") {
    ({ display } = await LocalNotifications.requestPermissions());
  }
  return display === "granted";
}

/** Cancels and re-creates all daily reminders from the saved settings. */
export async function applyReminders(reminders: Reminder[] = getReminders()): Promise<void> {
  saveReminders(reminders);
  if (!isNative) return;

  await LocalNotifications.cancel({
    notifications: Object.values(NOTIFICATION_IDS).map((id) => ({ id })),
  });

  const active = reminders.filter((r) => r.enabled);
  if (active.length === 0) return;
  if (!(await ensurePermission())) return;

  await LocalNotifications.schedule({
    notifications: active.map((r) => {
      const [hour, minute] = r.time.split(":").map(Number);
      return {
        id: NOTIFICATION_IDS[r.id],
        title: r.title,
        body: r.body,
        schedule: { on: { hour, minute }, allowWhileIdle: true },
        extra: { route: r.route },
      };
    }),
  });
}

/** Opens the right screen when a reminder is tapped. Call once at startup. */
export function listenForReminderTaps(navigate: (route: string) => void): void {
  if (!isNative) return;
  LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
    const route = event.notification.extra?.route;
    if (typeof route === "string") navigate(route);
  });
}

const SETUP_KEY = "daily-brief-reminders-setup";

/**
 * The first time someone saves intentions, turn on the default reminders.
 * This is when the permission prompt makes sense to them.
 */
export function setUpRemindersOnce(): void {
  if (!isNative || localStorage.getItem(SETUP_KEY)) return;
  localStorage.setItem(SETUP_KEY, "1");
  persist(SETUP_KEY, "1");
  applyReminders().catch(() => {});
}
