import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { saveMiddayCheckIn, getTodayEntry } from "../utils/storage";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function MiddayCheckIn() {
  const navigate = useNavigate();
  const [intentions, setIntentions] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean[]>([]);

  useEffect(() => {
    const entry = getTodayEntry();
    if (entry?.intentions) {
      setIntentions(entry.intentions);
      if (entry.middayCheckIn) {
        setCompleted(entry.middayCheckIn.completed);
      } else {
        setCompleted(new Array(entry.intentions.length).fill(false));
      }
    }
  }, []);

  const toggleIntention = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const handleSave = () => {
    saveMiddayCheckIn(completed);
    navigate("/dashboard");
  };

  const handleReset = () => {
    setCompleted(new Array(intentions.length).fill(false));
  };

  const completedCount = completed.filter(c => c).length;
  const totalCount = intentions.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Find next incomplete intention
  const nextIncompleteIndex = completed.findIndex(c => !c);

  if (intentions.length === 0) {
    return (
      <motion.div 
        className="min-h-screen flex flex-col pb-20 px-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status Bar */}
        <div className="flex justify-between items-center pt-4 pb-2">
          <div className="text-[11px] text-white/50 font-medium">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </div>
          <div className="flex gap-1">
            <div className="w-5 h-1 rounded-full bg-white/30"></div>
            <div className="w-5 h-1 rounded-full bg-white/30"></div>
            <div className="w-5 h-1 rounded-full bg-white/50"></div>
          </div>
        </div>

        <div className="space-y-3 pt-8">
          <h1 className="text-[28px] leading-tight text-white">
            Mid-day Check-in
          </h1>
          <p className="text-white/60">
            Set your morning intentions first to check in.
          </p>
        </div>
        <Button
          onClick={() => navigate("/intentions")}
          className="w-full h-12 bg-[#5271FF] hover:bg-[#5271FF]/90 text-white rounded-xl font-medium mt-8"
        >
          Set Morning Intentions
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col pb-20"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <div className="text-[11px] text-white/50 font-medium">
          {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-1 rounded-full bg-white/30"></div>
          <div className="w-5 h-1 rounded-full bg-white/30"></div>
          <div className="w-5 h-1 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3 pt-4 px-6">
        <p className="text-white/60 font-light">
          Thank you, <span className="text-[#AD4E14]">Rob</span>
        </p>
        <h1 className="text-[28px] leading-tight">
          <span className="text-white">How's your </span>
          <span className="text-[#5271FF]">day</span>
          <span className="text-white"> so far?</span>
        </h1>
      </div>

      {/* Circular Progress Ring */}
      <div className="flex justify-center mt-10 mb-8">
        <div className="relative" style={{ width: '128px', height: '128px' }}>
          {/* Background ring */}
          <svg className="absolute inset-0" width="128" height="128" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#AD4E14"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
              strokeLinecap="round"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              className="text-[32px] text-white font-light"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 10 }}
            >
              {completedCount}
            </motion.div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">of {totalCount}</div>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3 px-6 flex-1">
        {intentions.map((intention, index) => (
          <button
            key={index}
            onClick={() => toggleIntention(index)}
            className="w-full flex items-start gap-3 text-left group"
          >
            <div
              className={`flex-shrink-0 mt-0.5 transition-all ${
                completed[index]
                  ? "w-4 h-4 rounded-[5px] bg-[#5271FF] border-none"
                  : "w-4 h-4 rounded-[5px] bg-transparent border border-white/20"
              }`}
            >
              {completed[index] && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span 
              className={`flex-1 transition-all ${
                completed[index] 
                  ? "text-white/50 line-through" 
                  : "text-white/90"
              }`}
            >
              {intention}
            </span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 space-y-3 mt-8">
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-[#5271FF] hover:bg-[#5271FF]/90 text-white rounded-xl font-medium"
        >
          Log my check-in
        </Button>
        <button
          onClick={handleReset}
          className="w-full h-12 bg-transparent border border-white/[0.18] text-white rounded-xl font-medium hover:bg-white/5 transition-colors"
        >
          Reset progress
        </button>
      </div>

      {/* Bottom Nav Dots */}
      <div className="flex justify-center gap-2 mt-8 pb-6">
        <div className="size-2 rounded-full bg-white/40"></div>
        <div className="size-2 rounded-full bg-[#5271FF]"></div>
        <div className="size-2 rounded-full bg-white/40"></div>
      </div>
    </motion.div>
  );
}