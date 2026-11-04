import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface LocationState {
  completedCount: number;
  totalCount: number;
  intentions: string[];
  completed: boolean[];
}

export function Progression() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const completedCount = state?.completedCount ?? 0;
  const totalCount = state?.totalCount ?? 3;
  const intentions = state?.intentions ?? [];
  const completed = state?.completed ?? [];
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Animate the progress ring
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const getMessage = () => {
    if (completedCount === 0) {
      return "Keep going!";
    } else if (completedCount === totalCount) {
      return "Amazing work!";
    } else if (completedCount >= totalCount / 2) {
      return "That's your halfway!";
    } else {
      return "Good start!";
    }
  };

  const radius = 64;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 pb-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="space-y-8 w-full max-w-md">
        {/* Progress Ring */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative">
            <svg height={radius * 2} width={radius * 2}>
              {/* Background circle */}
              <circle
                stroke="rgba(255, 255, 255, 0.1)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <circle
                stroke="#AD4E14"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + " " + circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  transition: "stroke-dashoffset 1s ease-in-out",
                }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-[48px] font-medium text-white leading-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {completedCount}
              </motion.div>
              <motion.div
                className="text-sm text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                of {totalCount}
              </motion.div>
            </div>
          </div>

          {/* Message */}
          <motion.h2
            className="text-xl text-white text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {getMessage()}
          </motion.h2>
        </motion.div>

        {/* Intention boxes */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          {intentions.map((intention, index) => (
            <div
              key={index}
              className={`rounded-xl border-[0.5px] p-4 transition-all duration-500 flex items-center gap-3 ${
                completed[index]
                  ? "bg-primary/10 border-primary/30"
                  : "bg-transparent border-white/10"
              }`}
            >
              <div
                className={`flex-shrink-0 transition-all ${
                  completed[index]
                    ? "w-5 h-5 rounded-[6px] bg-[#5271FF] border-none flex items-center justify-center"
                    : "w-5 h-5 rounded-[6px] bg-transparent border border-white/20"
                }`}
              >
                {completed[index] && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10L8 14L16 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`flex-1 text-sm transition-all ${
                  completed[index]
                    ? "text-white/90"
                    : "text-white/60"
                }`}
              >
                {intention}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Back to dashboard
          </Button>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          className="text-xs text-white/40 text-center leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          Return to the dashboard to continue your day. Come back this evening for your reflection.
        </motion.p>
      </div>
    </motion.div>
  );
}