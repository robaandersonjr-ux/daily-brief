import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { saveIntentions, getTodayEntry, getEntryByDate, getTodayDate } from "../utils/storage";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function MorningIntentions() {
  const navigate = useNavigate();
  const [intentions, setIntentions] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    const entry = getTodayEntry();
    if (entry?.intentions && entry.intentions.length > 0) {
      setIntentions(entry.intentions);
    }
  }, []);

  const handleIntentionChange = (index: number, value: string) => {
    const newIntentions = [...intentions];
    newIntentions[index] = value;
    setIntentions(newIntentions);
  };

  const handleSave = () => {
    const filledIntentions = intentions.filter(i => i.trim() !== "");
    if (filledIntentions.length > 0) {
      saveIntentions(intentions);
      navigate("/dashboard");
    }
  };

  const handleCarryOver = () => {
    // Get yesterday's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];
    
    const yesterdayEntry = getEntryByDate(yesterdayDate);
    if (yesterdayEntry?.intentions && yesterdayEntry.intentions.length > 0) {
      setIntentions(yesterdayEntry.intentions);
    }
  };

  // Progressive reveal: Card 3 is dimmed until cards 1 and 2 are filled
  const isCard3Enabled = intentions[0].trim() !== "" && intentions[1].trim() !== "";
  const allFilled = intentions.every(i => i.trim() !== "");

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
          Good morning, <span className="text-[#AD4E14]">Rob</span>
        </p>
        <h1 className="text-[28px] leading-tight">
          <span className="text-white">Set your </span>
          <span className="text-[#5271FF]">3 intentions</span>
          <span className="text-white"> for today</span>
        </h1>
      </div>

      {/* Intention Cards */}
      <div className="space-y-4 px-6 mt-8 flex-1">
        {intentions.map((intention, index) => {
          const isCard3 = index === 2;
          const isDimmed = isCard3 && !isCard3Enabled;
          
          return (
            <div
              key={index}
              className="border-[0.5px] border-white/10 rounded-xl bg-white/[0.06] p-3 transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.45 : 1 }}
            >
              <label className="block text-[9px] font-medium tracking-[0.14em] uppercase text-[#AD4E14] mb-3">
                {String(index + 1).padStart(2, '0')}
              </label>
              <input
                type="text"
                value={intention}
                onChange={(e) => handleIntentionChange(index, e.target.value)}
                placeholder={isDimmed ? "Complete cards 01 and 02 first" : ""}
                disabled={isDimmed}
                className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/40 disabled:cursor-not-allowed"
              />
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="px-6 space-y-3 mt-8">
        <Button
          onClick={handleSave}
          disabled={!allFilled}
          className="w-full h-12 bg-[#5271FF] hover:bg-[#5271FF]/90 text-white rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start my day
        </Button>
        <button
          onClick={handleCarryOver}
          className="w-full h-12 bg-transparent border border-white/[0.18] text-white rounded-xl font-medium hover:bg-white/5 transition-colors"
        >
          Carry over from yesterday
        </button>
      </div>

      {/* Bottom Nav Dots */}
      <div className="flex justify-center gap-2 mt-8 pb-6">
        <div className="size-2 rounded-full bg-[#5271FF]"></div>
        <div className="size-2 rounded-full bg-white/40"></div>
        <div className="size-2 rounded-full bg-white/40"></div>
      </div>
    </motion.div>
  );
}