import React from 'react';

interface TeacherCharacterProps {
  mood?: 'smiling' | 'talking' | 'clapping' | 'cheering' | 'waving';
  className?: string;
}

export const TeacherCharacter: React.FC<TeacherCharacterProps> = ({
  mood = 'smiling',
  className = 'w-48 h-48'
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-md overflow-visible transition-transform duration-300"
      >
        {/* Soft background glow */}
        <circle cx="100" cy="110" r="85" fill="#FEF3C7" opacity="0.6" />

        {/* Cheerful classroom cardigan shoulders / body */}
        <path
          d="M 40 230 C 40 180, 60 160, 100 160 C 140 160, 160 180, 160 230 Z"
          fill="#0284C7"
        />
        {/* Cardigan Collar / Inner shirt */}
        <path
          d="M 80 160 L 100 195 L 120 160 Z"
          fill="#FDE68A"
        />
        <path
          d="M 90 160 L 100 175 L 110 160 Z"
          fill="#FFFFFF"
        />

        {/* Neck */}
        <rect x="88" y="135" width="24" height="28" rx="6" fill="#FCD34D" />

        {/* Teacher Head */}
        <ellipse cx="100" cy="100" rx="42" ry="46" fill="#FDE68A" />

        {/* Hair - Stylish warm brown curly/bob hairstyle */}
        <path
          d="M 52 105 C 50 60, 75 42, 100 42 C 125 42, 150 60, 148 105 C 158 85, 154 55, 135 44 C 118 34, 82 34, 65 44 C 46 55, 42 85, 52 105 Z"
          fill="#78350F"
        />
        <path
          d="M 54 85 C 52 110, 62 135, 66 142 C 60 135, 56 115, 56 95 Z"
          fill="#5B21B6"
          opacity="0.1"
        />
        {/* Left and right hair puffs */}
        <circle cx="56" cy="102" r="16" fill="#78350F" />
        <circle cx="144" cy="102" r="16" fill="#78350F" />
        <circle cx="62" cy="78" r="16" fill="#78350F" />
        <circle cx="138" cy="78" r="16" fill="#78350F" />

        {/* Friendly Eyebrows */}
        <path
          d={mood === 'talking' ? "M 75 76 Q 84 71 93 75" : "M 75 77 Q 84 73 93 77"}
          stroke="#5B21B6"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={mood === 'talking' ? "M 107 75 Q 116 71 125 76" : "M 107 77 Q 116 73 125 77"}
          stroke="#5B21B6"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheerful Eyes with gentle sparkle */}
        <circle cx="84" cy="92" r="6.5" fill="#1E293B" />
        <circle cx="86" cy="90" r="2.5" fill="#FFFFFF" />

        <circle cx="116" cy="92" r="6.5" fill="#1E293B" />
        <circle cx="118" cy="90" r="2.5" fill="#FFFFFF" />

        {/* Teacher Glasses - Modern rounded teal frames */}
        <circle cx="84" cy="92" r="14" fill="none" stroke="#0284C7" strokeWidth="3" opacity="0.9" />
        <circle cx="116" cy="92" r="14" fill="none" stroke="#0284C7" strokeWidth="3" opacity="0.9" />
        <path d="M 98 90 L 102 90" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <path d="M 70 90 L 60 88" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 130 90 L 140 88" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

        {/* Soft Blushing Cheeks */}
        <ellipse cx="71" cy="108" rx="8" ry="5" fill="#F43F5E" opacity="0.3" />
        <ellipse cx="129" cy="108" rx="8" ry="5" fill="#F43F5E" opacity="0.3" />

        {/* Gentle Nose */}
        <path d="M 100 96 Q 102 103 98 105" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Big Inspiring Smile */}
        {mood === 'talking' ? (
          <path
            d="M 88 116 Q 100 132 112 116 Z"
            fill="#BE123C"
            stroke="#9F1239"
            strokeWidth="1.5"
          />
        ) : (
          <path
            d="M 86 116 Q 100 134 114 116"
            stroke="#BE123C"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Hands Animation based on mood */}
        {mood === 'clapping' && (
          <g className="animate-pulse">
            <ellipse cx="88" cy="180" rx="12" ry="9" fill="#FCD34D" transform="rotate(-20 88 180)" />
            <ellipse cx="112" cy="180" rx="12" ry="9" fill="#FCD34D" transform="rotate(20 112 180)" />
            <path d="M 96 170 L 100 164 L 104 170" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 88 166 L 85 160" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <path d="M 112 166 L 115 160" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {mood === 'cheering' && (
          <g>
            {/* Arms raised in excitement */}
            <path d="M 45 180 Q 30 140 25 110" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="24" cy="108" r="9" fill="#FCD34D" />
            <path d="M 155 180 Q 170 140 175 110" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="176" cy="108" r="9" fill="#FCD34D" />
          </g>
        )}

        {mood === 'waving' && (
          <g className="animate-bounce">
            <path d="M 155 180 Q 175 150 170 120" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="170" cy="116" r="9" fill="#FCD34D" />
          </g>
        )}
      </svg>
    </div>
  );
};
