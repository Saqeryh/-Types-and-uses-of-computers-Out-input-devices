import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ROBOT_CHALLENGE_QUESTIONS } from '../data/lessonData';
import { RobotMascot } from './RobotMascot';
import { sound } from '../utils/audio';
import { Sparkles, Trophy, RotateCcw, Volume2, Award, Zap, Check, ArrowRight } from 'lucide-react';

interface RobotChallengeGameProps {
  onEarnBadge?: () => void;
}

export const RobotChallengeGame: React.FC<RobotChallengeGameProps> = ({ onEarnBadge }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'IN' | 'OUT' | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [robotPose, setRobotPose] = useState<'idle' | 'chest-tuck' | 'airplane-arms' | 'celebrating'>('idle');

  const currentQ = ROBOT_CHALLENGE_QUESTIONS[currentIndex];

  const handleChoice = (choice: 'IN' | 'OUT') => {
    if (selectedAnswer !== null) return; // Prevent double clicking

    setSelectedAnswer(choice);
    const correct = choice === currentQ.correctAnswer;
    setIsAnswerCorrect(correct);

    // Set robot pose based on choice
    if (choice === 'IN') {
      setRobotPose('chest-tuck');
    } else {
      setRobotPose('airplane-arms');
    }

    if (correct) {
      sound.playSuccessChime();
      sound.playRobotBleep(true);
      setScore((s) => s + 100);

      // Speak feedback
      const feedbackText = choice === 'IN' 
        ? `YES! Spot on! Hands to chest, ${currentQ.deviceName} pushes information IN!`
        : `Fantastic! Arms wide open like an airplane, ${currentQ.deviceName} gives information OUT!`;
      sound.speak(feedbackText);

      // Mini confetti on correct
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 }
      });
    } else {
      sound.playWrongBoing();
      sound.playRobotBleep(false);
      sound.speak(`Almost! Remember: ${currentQ.hint}`);
    }

    // Auto advance after 2.5 seconds
    setTimeout(() => {
      if (currentIndex + 1 < ROBOT_CHALLENGE_QUESTIONS.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setRobotPose('idle');

        // Announce next question
        const nextQ = ROBOT_CHALLENGE_QUESTIONS[currentIndex + 1];
        sound.speak(nextQ.promptQuote);
      } else {
        setIsGameOver(true);
        setRobotPose('celebrating');
        sound.playFanfare();
        sound.speak("Give yourselves a huge round of applause! Take your seats, tech stars! You earned your Super Coder Badge!");
        
        // Grand victory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }, 2400);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setIsGameOver(false);
    setRobotPose('idle');
    sound.speak("Stand up on your feet, little robots! Robot Command number one: Computer MOUSE!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
          Lesson Stage 5 · Active Physical Learning (TPR)
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
          The Ultimate Robot Challenge!
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          "Stand up on your feet, little robots! If it's an <strong>INPUT</strong> device, tuck hands to your chest and say <strong>IN!</strong> If it's an <strong>OUTPUT</strong> device, open arms wide like an airplane and say <strong>OUT!</strong>"
        </p>
      </div>

      {!isGameOver ? (
        <div className="flex flex-col items-center">
          {/* Progress & Speed indicator */}
          <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-4 px-2">
            <span className="font-semibold text-slate-700">
              Command {currentIndex + 1} of {ROBOT_CHALLENGE_QUESTIONS.length}
            </span>
            {currentQ.speedRound && (
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold animate-pulse">
                <Zap className="w-3.5 h-3.5" /> SUPER SPEED ROUND!
              </span>
            )}
            <span className="font-mono font-bold text-emerald-700">
              Score: {score} pts
            </span>
          </div>

          {/* Active Question Box */}
          <div className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
            {/* Robot Mascot previewing the body pose */}
            <div className="flex flex-col items-center">
              <RobotMascot pose={robotPose} size="md" />
              <span className="text-[11px] font-bold text-slate-500 mt-1 uppercase">
                {robotPose === 'chest-tuck'
                  ? 'Pose: Hands to Chest (IN!)'
                  : robotPose === 'airplane-arms'
                  ? 'Pose: Airplane Arms (OUT!)'
                  : 'Pose: Ready for Command!'}
              </span>
            </div>

            {/* Question Details */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-xs font-semibold text-sky-800 bg-sky-100 px-3 py-1 rounded-full mb-2">
                🤖 Robot Command:
              </div>

              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                {currentQ.deviceName}
              </div>

              <p className="text-sm text-slate-600 mt-2 font-medium">
                "{currentQ.promptQuote}"
              </p>

              <div className="mt-3 text-xs text-slate-500 bg-white border border-slate-200 p-2.5 rounded-xl">
                💡 <strong>Hint:</strong> {currentQ.hint}
              </div>

              {/* Feedback Alert */}
              {selectedAnswer !== null && (
                <div
                  className={`mt-4 w-full p-3 rounded-xl border flex items-center gap-2 text-xs font-bold animate-fade-in ${
                    isAnswerCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {isAnswerCorrect ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {selectedAnswer === 'IN'
                          ? 'YES! Hands to chest, it pushes information IN!'
                          : 'FANTASTIC! Arms wide open, it shows information OUT!'}
                      </span>
                    </>
                  ) : (
                    <span>
                      Almost! Remember: {currentQ.gestureHint}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Choice Buttons (Hands to chest IN vs Airplane arms OUT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6">
            {/* IN CHOICE */}
            <button
              onClick={() => handleChoice('IN')}
              disabled={selectedAnswer !== null}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                selectedAnswer === 'IN'
                  ? isAnswerCorrect
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : 'bg-rose-50 border-rose-400'
                  : 'bg-white hover:bg-sky-50/70 border-sky-300 hover:border-sky-500 shadow-sm active:scale-95'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-bold mb-2">
                📥
              </div>
              <span className="text-xl font-bold text-sky-900 font-display">
                Tuck Hands to Chest: IN!
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Pushes letters, clicks & orders into the computer!
              </span>
            </button>

            {/* OUT CHOICE */}
            <button
              onClick={() => handleChoice('OUT')}
              disabled={selectedAnswer !== null}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                selectedAnswer === 'OUT'
                  ? isAnswerCorrect
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : 'bg-rose-50 border-rose-400'
                  : 'bg-white hover:bg-emerald-50/70 border-emerald-300 hover:border-emerald-500 shadow-sm active:scale-95'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold mb-2">
                ✈️
              </div>
              <span className="text-xl font-bold text-emerald-900 font-display">
                Open Arms Wide: OUT!
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Shows pictures, cartoons & paper out into the world!
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Game Completion / Victory Screen */
        <div className="flex flex-col items-center py-6 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-lg border-2 border-amber-300 mb-4 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h3 className="text-3xl font-extrabold text-slate-900 font-display">
            Hooray, Super Coders!
          </h3>
          <p className="text-slate-600 max-w-md mt-2 text-sm md:text-base">
            "Give yourselves a huge round of applause! Take your seats, tech stars! Every single one of you just passed the challenge!"
          </p>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center max-w-sm">
            <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block">
              Official Challenge Result
            </span>
            <div className="text-2xl font-extrabold text-amber-900 mt-1">
              {score} Points Earned!
            </div>
            <p className="text-xs text-amber-700 mt-1">
              You mastered Desktops, Laptops, Tablets, Keyboard & Mouse (IN), and Screen & Printer (OUT)!
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => {
                sound.playSuccessChime();
                if (onEarnBadge) onEarnBadge();
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-md hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-2 text-sm"
            >
              <Award className="w-4 h-4" />
              <span>Claim Super Coder Badge & Certificate!</span>
            </button>

            <button
              onClick={restartGame}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Challenge Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
