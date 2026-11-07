import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { getAllEntries, type DayEntry, toLocalDateString } from "../utils/storage";
import { motion } from "motion/react";

export function History() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<{ date: string; entry: DayEntry }[]>([]);

  useEffect(() => {
    const allEntries = getAllEntries();
    setEntries(allEntries);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateOnly = dateString;
    const todayOnly = toLocalDateString(today);
    const yesterdayOnly = toLocalDateString(yesterday);

    if (dateOnly === todayOnly) {
      return "Today";
    } else if (dateOnly === yesterdayOnly) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="space-y-4 pt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm">Back</span>
        </button>
        <div>
          <h1 className="text-[32px] text-white tracking-tight">
            History
          </h1>
          <p className="text-white/60">
            Your journey over time
          </p>
        </div>
      </div>

      {/* Entries List */}
      {entries.length === 0 ? (
        <div className="border-[0.5px] border-white/10 rounded-xl bg-transparent p-12 text-center">
          <p className="text-white/40">No entries yet</p>
        </div>
      ) : (
        <div className="space-y-4 pb-8">
          {entries.map(({ date, entry }) => (
            <div
              key={date}
              className="border-[0.5px] border-white/10 rounded-xl bg-transparent p-6 space-y-4"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-white">{formatDate(date)}</h3>
                {entry.intentions.length > 0 && entry.middayCheckIn && entry.reflection && (
                  <div className="size-2 rounded-full bg-accent"></div>
                )}
              </div>

              {/* Intentions */}
              {entry.intentions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-white/40">Intentions</p>
                  <div className="space-y-1.5">
                    {entry.intentions.map((intention, index) => {
                      const isCompleted = entry.middayCheckIn?.completed[index];
                      return (
                        <div key={index} className="flex items-start gap-2">
                          {isCompleted && (
                            <Check className="size-3 text-primary flex-shrink-0 mt-1" strokeWidth={3} />
                          )}
                          <p className={`text-sm ${isCompleted ? "text-white/60" : "text-white/80"}`}>
                            {intention}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Check-in Note */}
              {entry.middayCheckIn?.note && (
                <div className="space-y-2">
                  <p className="text-xs text-white/40">Mid-day Note</p>
                  <p className="text-sm text-white/60 italic">{entry.middayCheckIn.note}</p>
                </div>
              )}

              {/* Reflection */}
              {entry.reflection && (
                <div className="space-y-2">
                  <p className="text-xs text-white/40">Reflection</p>
                  <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                    {entry.reflection}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}