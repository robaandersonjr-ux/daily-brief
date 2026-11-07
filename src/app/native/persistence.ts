import { Preferences } from "@capacitor/preferences";
import { isNative } from "./platform";

/**
 * In the app, entries are kept in localStorage for fast synchronous reads AND
 * mirrored to native storage (Preferences), which the OS won't clear the way it
 * can clear WebView storage. On launch, native storage restores localStorage.
 */
const MIRRORED_KEYS = ["daily-brief-data", "daily-brief-reminders", "daily-brief-reminders-setup"];

export function persist(key: string, value: string): void {
  if (isNative) Preferences.set({ key, value }).catch(() => {});
}

export async function restoreFromNative(): Promise<void> {
  if (!isNative) return;
  for (const key of MIRRORED_KEYS) {
    try {
      const { value } = await Preferences.get({ key });
      const local = localStorage.getItem(key);
      if (value !== null && local === null) {
        localStorage.setItem(key, value);
      } else if (value === null && local !== null) {
        await Preferences.set({ key, value: local });
      }
    } catch {
      // Keep going with whatever localStorage has.
    }
  }
}
