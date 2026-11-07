import { useState } from "react";
import { useNavigate } from "react-router";
import { getName, saveName } from "../utils/profile";
import { Logo } from "./Logo";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function TitlePage() {
  const navigate = useNavigate();
  const [name, setName] = useState(getName);

  const start = () => {
    saveName(name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Status Bar */}
      <motion.div 
        className="max-w-md mx-auto w-full px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Large Logo */}
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <Logo size="lg" />
          </motion.div>

          {/* App Name */}
          <motion.div 
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <h1 className="text-[40px] text-white tracking-[0.04em] leading-tight">
              <span className="font-light text-white/70">daily </span>
              <span className="font-normal text-[#5271FF]">brief</span>
            </h1>
            <p className="text-[11px] text-white/40 uppercase tracking-[0.14em] font-medium">
              Clarity · Intention · Focus
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Begin each day with intention.<br />
            Track your progress.<br />
            Reflect and grow.
          </motion.p>

          {/* Name */}
          <motion.form
            className="max-w-xs mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              start();
            }}
          >
            <label htmlFor="name" className="block text-[11px] text-white/40 uppercase tracking-[0.14em] font-medium mb-2">
              What should we call you?
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              autoComplete="given-name"
              maxLength={40}
              className="w-full h-12 rounded-xl bg-white/[0.06] border-[0.5px] border-white/[0.08] px-4 text-center text-white placeholder:text-white/30 focus:outline-none focus:border-[#5271FF]"
            />
          </motion.form>
        </div>
      </div>

      {/* Floating Start Button */}
      <motion.div 
        className="max-w-md mx-auto w-full px-6 pb-8"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.7,
          delay: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div className="flex justify-end">
          <motion.button
            onClick={start}
            className="h-14 px-8 rounded-full flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: '#AD4E14' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-white font-medium text-[15px] tracking-wide">Start</span>
            <ArrowRight className="size-5 text-white" strokeWidth={2} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}