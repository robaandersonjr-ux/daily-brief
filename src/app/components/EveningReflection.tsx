import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getTodayEntry, getAllEntries, saveReflection, toLocalDateString } from "../utils/storage";
import { haptic } from "../native/haptics";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Greeting } from "./Greeting";

export function EveningReflection() {
  const navigate = useNavigate();
  const [win, setWin] = useState("");
  const [challenge, setChallenge] = useState("");
  const [dayStreak, setDayStreak] = useState(0);
  const [completionRate, setCompletionRate] = useState("0/0");

  useEffect(() => {
    const entry = getTodayEntry();
    if (entry?.reflectionWin) setWin(entry.reflectionWin);
    if (entry?.reflectionChallenge) setChallenge(entry.reflectionChallenge);
    
    // Calculate day streak
    const allEntries = getAllEntries();
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < allEntries.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = toLocalDateString(checkDate);
      
      const dayEntry = allEntries.find(e => e.date === dateStr);
      if (dayEntry?.entry?.intentions && dayEntry.entry.intentions.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    setDayStreak(streak);
    
    // Calculate completion rate
    if (entry?.intentions) {
      const total = entry.intentions.length;
      const completed = entry.middayCheckIn?.completed.filter(c => c).length || 0;
      setCompletionRate(`${completed}/${total}`);
    }
  }, []);

  const handleSave = () => {
    saveReflection(win, challenge);
    haptic.success();
    navigate("/dashboard");
  };

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
          <Greeting text="One more step" />
        </p>
        <h1 className="text-[28px] leading-tight">
          <span className="text-white">Reflect on your </span>
          <span className="text-[#5271FF]">day</span>
        </h1>
      </div>

      {/* Win Capture Card - Burnt Orange Tint */}
      <div 
        className="mx-6 mt-8 rounded-xl p-3"
        style={{ 
          backgroundColor: 'rgba(173, 78, 20, 0.15)',
          border: '0.5px solid rgba(173, 78, 20, 0.3)'
        }}
      >
        <label className="block text-[9px] font-medium tracking-[0.14em] uppercase text-[#AD4E14] mb-3">
          Today's win
        </label>
        <input
          type="text"
          value={win}
          onChange={(e) => setWin(e.target.value)}
          placeholder=""
          className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/40 mb-2"
        />
        <div className="w-full h-px bg-white/10 mb-2"></div>
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/40"
          placeholder=""
        />
      </div>

      {/* Reflection Prompt Card - Electric Blue Tint */}
      <div 
        className="mx-6 mt-4 rounded-xl p-3"
        style={{ 
          backgroundColor: 'rgba(82, 113, 255, 0.12)',
          border: '0.5px solid rgba(82, 113, 255, 0.25)'
        }}
      >
        <label className="block text-[9px] font-medium tracking-[0.14em] uppercase text-white/60 mb-3">
          What made today harder than expected?
        </label>
        <input
          type="text"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder=""
          className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/40 mb-2"
        />
        <div className="w-full h-px bg-white/10 mb-2"></div>
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/40"
          placeholder=""
        />
      </div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-2 gap-3 mx-6 mt-6">
        {/* Day Streak Tile */}
        <div className="border-[0.5px] border-white/[0.08] rounded-xl bg-white/[0.06] p-4">
          <div className="text-[14px] text-white font-light">{dayStreak}</div>
          <div className="text-[8px] text-white/60 uppercase tracking-wider mt-1">day streak</div>
        </div>
        
        {/* Completion Rate Tile */}
        <div className="border-[0.5px] border-white/[0.08] rounded-xl bg-white/[0.06] p-4">
          <div className="text-[14px] text-[#5271FF] font-light">{completionRate}</div>
          <div className="text-[8px] text-white/60 uppercase tracking-wider mt-1">completed</div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Action Button */}
      <div className="px-6 space-y-3 mt-8">
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-[#5271FF] hover:bg-[#5271FF]/90 text-white rounded-xl font-medium"
        >
          I'm done for today
        </Button>
      </div>

      {/* Bottom Nav Dots */}
      <div className="flex justify-center gap-2 mt-8 pb-6">
        <div className="size-2 rounded-full bg-white/40"></div>
        <div className="size-2 rounded-full bg-white/40"></div>
        <div className="size-2 rounded-full bg-[#5271FF]"></div>
      </div>
    </motion.div>
  );
}