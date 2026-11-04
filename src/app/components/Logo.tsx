export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: { container: 40, svg: 20 },
    md: { container: 56, svg: 28 },
    lg: { container: 72, svg: 36 }
  };
  
  const { container, svg } = dimensions[size];
  
  return (
    <div 
      className="inline-flex items-center justify-center"
      style={{ 
        width: `${container}px`, 
        height: `${container}px`,
        backgroundColor: '#5271FF',
        borderRadius: '12px'
      }}
    >
      {/* Sun/Radial Icon */}
      <svg width={svg} height={svg} viewBox="0 0 80 80" fill="none">
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
  );
}
