import React from 'react';

interface RobotMascotProps {
  pose?: 'idle' | 'chest-tuck' | 'airplane-arms' | 'celebrating';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RobotMascot: React.FC<RobotMascotProps> = ({
  pose = 'idle',
  className = '',
  size = 'md'
}) => {
  const sizeClass = {
    sm: 'w-28 h-28',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClass} ${className}`}>
      <svg
        viewBox="0 0 240 240"
        className={`w-full h-full drop-shadow-md overflow-visible transition-all duration-300 ${
          pose === 'celebrating' ? 'animate-bounce' : ''
        }`}
      >
        {/* Antenna */}
        <line x1="120" y1="46" x2="120" y2="22" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
        <circle cx="120" cy="18" r="9" fill="#F59E0B" className="animate-pulse" />
        <circle cx="120" cy="18" r="4" fill="#FEF3C7" />

        {/* Ears / Bolts */}
        <rect x="52" y="76" width="10" height="22" rx="4" fill="#0D9488" />
        <rect x="178" y="76" width="10" height="22" rx="4" fill="#0D9488" />

        {/* Robot Head */}
        <rect x="62" y="46" width="116" height="82" rx="20" fill="#14B8A6" stroke="#0F766E" strokeWidth="3" />
        
        {/* Head Visor / Digital Screen */}
        <rect x="74" y="58" width="92" height="56" rx="14" fill="#042F2E" />

        {/* Digital Eyes */}
        {pose === 'chest-tuck' ? (
          // Focused cute happy eyes
          <g>
            <path d="M 88 88 Q 96 76 104 88" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 136 88 Q 144 76 152 88" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
        ) : pose === 'airplane-arms' ? (
          // Wide open bright star eyes
          <g>
            <circle cx="96" cy="84" r="10" fill="#38BDF8" />
            <circle cx="98" cy="82" r="3.5" fill="#FFFFFF" />
            <circle cx="144" cy="84" r="10" fill="#38BDF8" />
            <circle cx="146" cy="82" r="3.5" fill="#FFFFFF" />
          </g>
        ) : (
          // Friendly glowing eyes
          <g>
            <circle cx="96" cy="84" r="8" fill="#38BDF8" />
            <circle cx="98" cy="82" r="3" fill="#FFFFFF" />
            <circle cx="144" cy="84" r="8" fill="#38BDF8" />
            <circle cx="146" cy="82" r="3" fill="#FFFFFF" />
          </g>
        )}

        {/* Robot Mouth / Status LED bar */}
        {pose === 'airplane-arms' || pose === 'celebrating' ? (
          <path d="M 106 102 Q 120 112 134 102" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : (
          <rect x="108" y="100" width="24" height="4" rx="2" fill="#FDE047" />
        )}

        {/* Neck */}
        <rect x="108" y="128" width="24" height="12" rx="3" fill="#0F766E" />

        {/* Robot Torso / Body */}
        <rect x="68" y="140" width="104" height="80" rx="18" fill="#0D9488" stroke="#115E59" strokeWidth="3" />

        {/* Chest Display Gauge */}
        <rect x="86" y="152" width="68" height="44" rx="8" fill="#042F2E" />
        
        {/* Heart / Superpower meter */}
        <g>
          <circle cx="106" cy="170" r="5" fill="#EF4444" className="animate-ping" opacity="0.75" />
          <circle cx="106" cy="170" r="6" fill="#EF4444" />
          <text x="120" y="174" fill="#38BDF8" fontSize="12" fontWeight="bold" fontFamily="monospace">
            {pose === 'chest-tuck' ? 'IN' : pose === 'airplane-arms' ? 'OUT' : 'PWR'}
          </text>
        </g>

        {/* ARMS - Dynamic based on Pose! */}
        {pose === 'chest-tuck' ? (
          // TUCKED CLOSE TO CHEST (IN!)
          <g className="transition-all duration-300">
            {/* Left Arm folded over chest */}
            <path
              d="M 68 155 C 48 160, 52 188, 96 182"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="96" cy="182" r="8" fill="#F59E0B" />

            {/* Right Arm folded over chest */}
            <path
              d="M 172 155 C 192 160, 188 188, 144 182"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="144" cy="182" r="8" fill="#F59E0B" />
          </g>
        ) : pose === 'airplane-arms' ? (
          // OPEN WIDE LIKE AN AIRPLANE (OUT!)
          <g className="transition-all duration-300">
            {/* Left Arm shooting straight out like airplane wing */}
            <path
              d="M 68 152 L 14 140"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="14" cy="140" r="9" fill="#F59E0B" />
            <line x1="14" y1="128" x2="14" y2="152" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />

            {/* Right Arm shooting straight out like airplane wing */}
            <path
              d="M 172 152 L 226 140"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="226" cy="140" r="9" fill="#F59E0B" />
            <line x1="226" y1="128" x2="226" y2="152" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : (
          // IDLE / WAITING
          <g className="transition-all duration-300">
            <path
              d="M 68 155 C 44 165, 48 190, 52 205"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="52" cy="205" r="8" fill="#F59E0B" />

            <path
              d="M 172 155 C 196 165, 192 190, 188 205"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="188" cy="205" r="8" fill="#F59E0B" />
          </g>
        )}

        {/* Legs / Tread wheels */}
        <rect x="84" y="218" width="28" height="18" rx="6" fill="#0F766E" />
        <rect x="128" y="218" width="28" height="18" rx="6" fill="#0F766E" />
      </svg>
    </div>
  );
};
