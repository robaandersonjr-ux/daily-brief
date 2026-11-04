import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getTodayEntry, type DayEntry } from "../utils/storage";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { motion } from "motion/react";

export function Dashboard() {
  const [todayEntry, setTodayEntry] = useState<DayEntry | null>(null);

  useEffect(() => {
    const entry = getTodayEntry();
    setTodayEntry(entry);
  }, []);

  const hasIntentions = todayEntry?.intentions && todayEntry.intentions.length > 0;
  const hasCheckIn = todayEntry?.middayCheckIn;
  const hasReflection = todayEntry?.reflection;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center pt-4 pb-2">
        <div className="text-[11px] text-white/50 font-medium">
          {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-1 rounded-full bg-white/30"></div>
          <div className="w-5 h-1 rounded-full bg-white/30"></div>
          <div className="w-5 h-1 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Header with Logo */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <div className="flex-1">
            <h1 className="text-[20px] text-white tracking-[0.04em] leading-tight">
              <span className="font-light text-white/70">daily </span>
              <span className="font-normal text-[#5271FF]">brief</span>
            </h1>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.14em] font-medium mt-0.5">
              Clarity · Intention · Focus
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[28px] text-white font-light tracking-tight mb-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </h2>
          <p className="text-white/40 text-sm">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Daily Flow Cards */}
      <div className="space-y-4">
        {/* Morning Intentions */}
        <div className="border-[0.5px] border-white/10 rounded-xl bg-transparent p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Morning Intentions</h3>
              <p className="text-sm text-white/40">Set your daily focus</p>
            </div>
            {hasIntentions && (
              <div className="size-2 rounded-full bg-accent"></div>
            )}
          </div>
          
          {hasIntentions ? (
            <>
              <div className="space-y-2">
                {todayEntry.intentions.map((intention, index) => (
                  <p key={index} className="text-sm text-white/60">
                    {index + 1}. {intention}
                  </p>
                ))}
              </div>
              <Link to="/intentions">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-white/20 text-white hover:bg-white/5 rounded-lg"
                >
                  Edit Intentions <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/intentions">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg">
                Start Morning <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mid-day Check-in */}
        <div className="border-[0.5px] border-white/10 rounded-xl bg-transparent p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Mid-day Check-in</h3>
              <p className="text-sm text-white/40">Track your progress</p>
            </div>
            {hasCheckIn && (
              <div className="size-2 rounded-full bg-accent"></div>
            )}
          </div>
          
          {hasCheckIn ? (
            <Link to="/checkin">
              <Button 
                variant="outline" 
                className="w-full h-12 border-white/20 text-white hover:bg-white/5 rounded-lg"
              >
                Edit Check-In <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          ) : hasIntentions ? (
            <Link to="/checkin">
              <Button 
                variant="outline" 
                className="w-full h-12 border-white/20 text-white hover:bg-white/5 rounded-lg"
              >
                Check In <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <p className="text-sm text-white/40">Set intentions first</p>
          )}
        </div>

        {/* Evening Reflection */}
        <div className="border-[0.5px] border-white/10 rounded-xl bg-transparent p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Evening Reflection</h3>
              <p className="text-sm text-white/40">Close your day</p>
            </div>
            {hasReflection && (
              <div className="size-2 rounded-full bg-accent"></div>
            )}
          </div>
          
          {hasReflection ? (
            <p className="text-sm text-white/60 line-clamp-3">
              {todayEntry.reflection}
            </p>
          ) : hasIntentions ? (
            <Link to="/reflection">
              <Button 
                variant="outline" 
                className="w-full h-12 border-white/20 text-white hover:bg-white/5 rounded-lg"
              >
                Reflect <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <p className="text-sm text-white/40">Set intentions first</p>
          )}
        </div>
      </div>

      {/* History Link */}
      <div className="text-center pt-4">
        <Link
          to="/history"
          className="text-sm text-white/40 hover:text-white/60 transition-colors inline-flex items-center gap-2"
        >
          View History
        </Link>
      </div>
    </motion.div>
  );
}