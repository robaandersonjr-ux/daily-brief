import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Switch } from "./ui/switch";
import { applyReminders, getReminders, type Reminder } from "../native/reminders";
import { isNative } from "../native/platform";
import { haptic } from "../native/haptics";

export function Reminders() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<Reminder[]>(getReminders);
  const [denied, setDenied] = useState(false);

  const update = async (id: Reminder["id"], patch: Partial<Reminder>) => {
    const next = reminders.map((r) => (r.id === id ? { ...r, ...patch } : r));
    setReminders(next);
    haptic.tap();
    try {
      await applyReminders(next);
      if (isNative && next.some((r) => r.enabled)) {
        const { LocalNotifications } = await import("@capacitor/local-notifications");
        const { display } = await LocalNotifications.checkPermissions();
        setDenied(display === "denied");
      }
    } catch {
      // Settings are still saved; scheduling retries on next launch.
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80"
      >
        <ArrowLeft className="size-4" /> Back
      </button>

      <div className="space-y-1">
        <h1 className="text-[28px] text-white font-light">Reminders</h1>
        <p className="text-sm text-white/50">
          A nudge at each point in your day. You can change the times or turn any of them off.
        </p>
      </div>

      {!isNative && (
        <p className="text-sm text-white/60 border-[0.5px] border-white/[0.08] rounded-xl bg-white/[0.06] p-4">
          Reminders work in the Daily Brief mobile app.
        </p>
      )}

      {denied && (
        <p className="text-sm text-[#F2A36B] border-[0.5px] border-[#AD4E14]/40 rounded-xl bg-[#AD4E14]/10 p-4">
          Notifications are turned off for Daily Brief. Turn them on in your phone's Settings to get
          reminders.
        </p>
      )}

      <div className="space-y-3">
        {reminders.map((r) => (
          <div
            key={r.id}
            className="border-[0.5px] border-white/[0.08] rounded-xl bg-white/[0.06] p-4 flex items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="text-white text-[15px]">{r.label}</div>
              <input
                type="time"
                value={r.time}
                disabled={!r.enabled}
                onChange={(e) => e.target.value && update(r.id, { time: e.target.value })}
                aria-label={`${r.label} time`}
                className="bg-transparent text-[#5271FF] text-[15px] disabled:text-white/30 [color-scheme:dark]"
              />
            </div>
            <Switch
              checked={r.enabled}
              onCheckedChange={(enabled) => update(r.id, { enabled })}
              aria-label={`${r.label} reminder`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
