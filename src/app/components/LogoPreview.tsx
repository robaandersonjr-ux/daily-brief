import { Sun } from "lucide-react";

export function LogoPreview() {
  return (
    <div className="min-h-screen bg-[#0A1831] flex items-center justify-center p-8">
      <div className="space-y-6 text-center flex flex-col items-center">
        {/* App Icon */}
        <div 
          className="inline-flex items-center justify-center"
          style={{ 
            width: '200px', 
            height: '200px',
            backgroundColor: '#5271FF',
            borderRadius: '44px'
          }}
        >
          {/* Sun/Radial Icon */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {/* Center circle */}
            <circle cx="40" cy="40" r="10" fill="white" />
            
            {/* Cardinal rays (longer) */}
            {/* Top */}
            <line x1="40" y1="8" x2="40" y2="22" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Right */}
            <line x1="72" y1="40" x2="58" y2="40" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom */}
            <line x1="40" y1="72" x2="40" y2="58" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Left */}
            <line x1="8" y1="40" x2="22" y2="40" stroke="white" strokeWidth="4" strokeLinecap="round" />
            
            {/* Diagonal rays (shorter) */}
            {/* Top-right */}
            <line x1="57" y1="23" x2="50" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom-right */}
            <line x1="57" y1="57" x2="50" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Bottom-left */}
            <line x1="23" y1="57" x2="30" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
            {/* Top-left */}
            <line x1="23" y1="23" x2="30" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Wordmark */}
        <div className="space-y-3">
          <h1 className="text-[36px] tracking-[0.04em]">
            <span className="text-white/70 font-light">daily </span>
            <span className="text-[#5271FF] font-normal">brief</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium">
            Clarity · Intention · Focus
          </p>
        </div>
      </div>
    </div>
  );
}