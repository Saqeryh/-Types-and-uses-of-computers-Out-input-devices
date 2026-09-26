import React, { useState, useEffect } from 'react';
import { LESSON_STAGES, PEDAGOGICAL_FRAMEWORK } from '../data/lessonData';
import { sound } from '../utils/audio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Clock, BookOpen, UserCheck, ChevronRight } from 'lucide-react';

interface TeacherPresentationPanelProps {
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherPresentationPanel: React.FC<TeacherPresentationPanelProps> = ({
  currentStageIndex,
  onSelectStage,
  isOpen,
  onClose
}) => {
  // 5 minute countdown (300 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(sound.isVoiceMuted);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => Math.max(0, sec - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const progressPercent = ((300 - secondsRemaining) / 300) * 100;

  const toggleVoice = () => {
    sound.isVoiceMuted = !sound.isVoiceMuted;
    setIsVoiceMuted(sound.isVoiceMuted);
    if (sound.isVoiceMuted) {
      sound.stopSpeaking();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
            Presenter & Committee Guide
          </span>
          <h3 className="font-bold text-slate-900 text-base font-display">
            Ms. Bushra's 5-Minute Demo
          </h3>
        </div>
        <button
          onClick={onClose}
          className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
        {/* 1. Timer Bar */}
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>5-Minute Demonstration Clock</span>
            </div>
            <div className="text-xl font-mono font-bold text-amber-400">
              {timeFormatted}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsRemaining(300);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={toggleVoice}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isVoiceMuted ? 'bg-slate-800 text-rose-400' : 'bg-slate-800 text-emerald-400'
              }`}
            >
              {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isVoiceMuted ? 'Voice Off' : 'Voice On'}</span>
            </button>
          </div>
        </div>

        {/* 2. Live Teleprompter (Current Stage) */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Current Stage Transcript (Stage {currentStageIndex + 1})
          </span>
          <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3 text-xs leading-relaxed text-slate-800">
            <p className="font-serif italic text-sky-950">
              "{LESSON_STAGES[currentStageIndex].teacherScript}"
            </p>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Action Cue: {LESSON_STAGES[currentStageIndex].callToAction}</span>
          </div>
        </div>

        {/* 3. Stage Navigation List */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Demonstration Chapters (Click to Jump)
          </span>
          <div className="space-y-1.5">
            {LESSON_STAGES.map((stg, idx) => (
              <button
                key={stg.id}
                onClick={() => onSelectStage(idx)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                  currentStageIndex === idx
                    ? 'bg-sky-50 border-sky-300 text-sky-900 font-bold'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStageIndex === idx ? 'bg-sky-600 text-white font-bold' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{stg.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {stg.durationEst}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Pedagogical Framework & Standards for Committee */}
        <div className="pt-3 border-t border-slate-200">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>Pedagogical Framework for Committee</span>
          </span>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div>
              <strong className="text-slate-800">CSTA Standard:</strong> 1A-CS-02 (Hardware & Software, Input and Output)
            </div>
            <div>
              <strong className="text-slate-800">Methodology:</strong> Total Physical Response (TPR) + Concrete-to-Abstract (Apples IN ➔ Keyboard Words IN).
            </div>
            <div>
              <strong className="text-slate-800">Formative Assessment:</strong> Physical gesture response in Robot Challenge (Hands to chest = IN, Airplane wings = OUT).
            </div>
          </div>
        </div>
      </div>

      {/* Footer Conclusion Marker */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center font-medium">
        "And thank you, respected committee. That concludes our 5-minute demonstration."
      </div>
    </div>
  );
};
