import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSON_STAGES } from '../data/lessonData';
import { TeacherCharacter } from './TeacherCharacter';
import { ComputerTypesShowcase } from './ComputerTypesShowcase';
import { InputOutputLab } from './InputOutputLab';
import { RobotChallengeGame } from './RobotChallengeGame';
import { sound } from '../utils/audio';
import { Volume2, ChevronRight, ChevronLeft, Hand, Award, Sparkles, Check } from 'lucide-react';

interface LessonStoryViewProps {
  currentStageIndex: number;
  onSetStageIndex: (index: number) => void;
  onOpenBadgeModal: () => void;
}

export const LessonStoryView: React.FC<LessonStoryViewProps> = ({
  currentStageIndex,
  onSetStageIndex,
  onOpenBadgeModal
}) => {
  const currentStage = LESSON_STAGES[currentStageIndex];

  // Stage 1 Warmup Interactions
  const [clapsGiven, setClapsGiven] = useState(0);
  const [handsRaised, setHandsRaised] = useState(1);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [teacherMood, setTeacherMood] = useState<'smiling' | 'talking' | 'clapping' | 'cheering' | 'waving'>('smiling');

  const speakTeacher = () => {
    setTeacherMood('talking');
    sound.speak(currentStage.teacherScript, () => {
      setTeacherMood('smiling');
    });
  };

  const handleClap = (count: 1 | 2) => {
    setTeacherMood('clapping');
    sound.playClap();
    setClapsGiven((c) => c + count);

    confetti({
      particleCount: count === 1 ? 15 : 30,
      spread: 40,
      origin: { y: 0.6 }
    });

    if (count === 1) {
      sound.speak("I heard your clap! Now, if you can see my big smile, clap twice!");
    } else {
      sound.speak("Wonderful! Look at those fast claps! Welcome to our secret tech mission!");
    }

    setTimeout(() => setTeacherMood('smiling'), 1200);
  };

  const handleRaiseHand = () => {
    if (!hasRaisedHand) {
      sound.playSuccessChime();
      setHandsRaised((h) => h + 1);
      setHasRaisedHand(true);
      setTeacherMood('cheering');
      sound.speak("Wow, look at all these bright hands in the sky! Amazing coders!");
      setTimeout(() => setTeacherMood('smiling'), 1500);
    }
  };

  const nextStage = () => {
    sound.playClickClack();
    if (currentStageIndex + 1 < LESSON_STAGES.length) {
      onSetStageIndex(currentStageIndex + 1);
    }
  };

  const prevStage = () => {
    sound.playClickClack();
    if (currentStageIndex > 0) {
      onSetStageIndex(currentStageIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Stage Tracker Pill Ribbon */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">
            Stage {currentStageIndex + 1} of {LESSON_STAGES.length}
          </span>
          <span aria-hidden="true">·</span>
          <span>{currentStage.durationEst}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          {LESSON_STAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => onSetStageIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentStageIndex ? 'w-6 bg-sky-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Jump to Stage ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Teacher Dialogue Card (Ms. Bushra) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-50 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Ms. Bushra Character */}
        <div className="shrink-0 flex flex-col items-center">
          <TeacherCharacter mood={teacherMood} className="w-40 h-40 md:w-48 md:h-48" />
          <span className="text-xs font-bold text-slate-700 mt-1 font-display">
            Ms. Bushra
          </span>
          <span className="text-[10px] text-slate-400">
            Elementary Tech Guide
          </span>
        </div>

        {/* Teacher Speech Bubble */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                {currentStage.title}
              </span>
              <button
                onClick={speakTeacher}
                className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-lg border border-sky-200 transition-colors"
                title="Hear Ms. Bushra speak"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Ms. Bushra</span>
              </button>
            </div>

            <p className="text-slate-800 font-serif text-base md:text-lg leading-relaxed italic bg-slate-50/80 p-4 rounded-xl border border-slate-100">
              "{currentStage.teacherScript}"
            </p>
          </div>

          {/* Action Cue prompt */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">
              👉 <strong>Action Cue:</strong> {currentStage.callToAction}
            </span>
          </div>
        </div>
      </div>

      {/* Stage-Specific Interactive Canvas */}

      {/* STAGE 1: WARMUP & AUDIENCE ENGAGEMENT */}
      {currentStage.id === 'welcome' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col items-center text-center">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Secret Tech Mission · Warmup
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
            Can You Hear My Voice & See My Smile?
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mt-2">
            Participate in the classroom call-and-response with Ms. Bushra!
          </p>

          {/* Interactive Clapping Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-6">
            <button
              onClick={() => handleClap(1)}
              className="p-4 bg-sky-50 hover:bg-sky-100/80 border-2 border-sky-300 hover:border-sky-400 rounded-2xl transition-all flex flex-col items-center shadow-xs active:scale-95"
            >
              <span className="text-3xl mb-1">👏</span>
              <span className="font-bold text-sky-900 text-base font-display">
                Clap Once!
              </span>
              <span className="text-xs text-sky-700 mt-0.5">
                "If you can hear my voice!"
              </span>
            </button>

            <button
              onClick={() => handleClap(2)}
              className="p-4 bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-300 hover:border-amber-400 rounded-2xl transition-all flex flex-col items-center shadow-xs active:scale-95"
            >
              <span className="text-3xl mb-1">👏👏</span>
              <span className="font-bold text-amber-900 text-base font-display">
                Clap Twice!
              </span>
              <span className="text-xs text-amber-700 mt-0.5">
                "If you can see my big smile!"
              </span>
            </button>
          </div>

          {clapsGiven > 0 && (
            <div className="text-xs font-semibold text-slate-500 mt-3">
              Total classroom claps: <strong className="text-sky-700">{clapsGiven}</strong>
            </div>
          )}

          {/* Hand Raising Interaction */}
          <div className="mt-8 pt-6 border-t border-slate-200 w-full max-w-lg flex flex-col items-center">
            <p className="text-sm font-semibold text-slate-800">
              "Who has ever played a game or watched a video on a computer?"
            </p>
            <button
              onClick={handleRaiseHand}
              disabled={hasRaisedHand}
              className={`mt-3 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                hasRaisedHand
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{hasRaisedHand ? 'Hand Raised High into the Sky! 🙋' : 'Raise Hand High!'}</span>
            </button>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>Super Coders raising their hands in class:</span>
              <strong className="text-emerald-700 font-bold">{handsRaised}</strong>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: 3 COMPUTER SHAPES */}
      {currentStage.id === 'computer-types' && (
        <ComputerTypesShowcase />
      )}

      {/* STAGE 3 & 4: INPUT & OUTPUT SUPERPOWERS */}
      {(currentStage.id === 'input-superpower' || currentStage.id === 'output-superpower') && (
        <InputOutputLab />
      )}

      {/* STAGE 5: ROBOT CHALLENGE */}
      {currentStage.id === 'robot-challenge' && (
        <RobotChallengeGame onEarnBadge={onOpenBadgeModal} />
      )}

      {/* STAGE 6: CEREMONY & SUMMARY */}
      {currentStage.id === 'badge-ceremony' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-amber-800 shadow-md border-2 border-white mb-4 animate-bounce">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Official Award Conferral
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
            You Are Official Super Coders!
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mt-2">
            "Look at our screen! Every single one of you just passed the challenge and earned your official Super Coder Badge!"
          </p>

          {/* Quick Recap Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl my-6 text-left">
            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-100 text-xs">
              <div className="font-bold text-sky-900 mb-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-sky-600" />
                <span>3 Computer Shapes</span>
              </div>
              <p className="text-sky-700">Desktop (cozy), Laptop (portable book), Tablet (touch magic).</p>
            </div>

            <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-100 text-xs">
              <div className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-indigo-600" />
                <span>INPUT: Going IN!</span>
              </div>
              <p className="text-indigo-700">Keyboard (letters) and Mouse (clicks) push orders IN!</p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
              <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>OUTPUT: Sharing OUT!</span>
              </div>
              <p className="text-emerald-700">Screen (pictures) and Printer (real paper) share things OUT!</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              onOpenBadgeModal();
            }}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open & Print Official Super Coder Certificate!</span>
          </button>

          <p className="text-xs text-slate-400 mt-6 italic">
            "And thank you, respected committee. That concludes our 5-minute demonstration."
          </p>
        </div>
      )}

      {/* Stage Navigation Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={prevStage}
          disabled={currentStageIndex === 0}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Stage</span>
        </button>

        <span className="text-xs text-slate-500 font-medium">
          {currentStage.shortLabel}
        </span>

        <button
          onClick={nextStage}
          disabled={currentStageIndex === LESSON_STAGES.length - 1}
          className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 shadow-xs"
        >
          <span>Next Stage</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
