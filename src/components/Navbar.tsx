import React from 'react';
import { Volume2, VolumeX, BookOpen, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeView: 'mission' | 'shapes' | 'io-lab' | 'robot-game' | 'badge';
  onSelectView: (view: 'mission' | 'shapes' | 'io-lab' | 'robot-game' | 'badge') => void;
  onOpenTeacherGuide: () => void;
  onOpenBadgeModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenTeacherGuide,
  onOpenBadgeModal,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => {
          sound.playSuccessChime();
          onSelectView('mission');
        }}
        className="text-xl font-bold tracking-tight text-slate-900 font-display hover:text-sky-600 transition-colors"
      >
        Super Coders
      </button>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => {
            sound.playClickClack();
            onSelectView('mission');
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
            activeView === 'mission' ? 'text-sky-600 font-semibold underline underline-offset-4' : ''
          }`}
        >
          Tech Mission
        </button>
        <button
          onClick={() => {
            sound.playClickClack();
            onSelectView('shapes');
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
            activeView === 'shapes' ? 'text-sky-600 font-semibold underline underline-offset-4' : ''
          }`}
        >
          Computer Shapes
        </button>
        <button
          onClick={() => {
            sound.playClickClack();
            onSelectView('io-lab');
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
            activeView === 'io-lab' ? 'text-sky-600 font-semibold underline underline-offset-4' : ''
          }`}
        >
          Input & Output
        </button>
        <button
          onClick={() => {
            sound.playClickClack();
            onSelectView('robot-game');
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
            activeView === 'robot-game' ? 'text-sky-600 font-semibold underline underline-offset-4' : ''
          }`}
        >
          Robot Challenge
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleMute}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-slate-700" />}
        </button>

        <button
          onClick={onOpenBadgeModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap"
        >
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>My Badge</span>
        </button>

        <button
          onClick={onOpenTeacherGuide}
          className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Committee Guide</span>
        </button>
      </div>
    </header>
  );
};
