/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LessonStoryView } from './components/LessonStoryView';
import { ComputerTypesShowcase } from './components/ComputerTypesShowcase';
import { InputOutputLab } from './components/InputOutputLab';
import { RobotChallengeGame } from './components/RobotChallengeGame';
import { BadgeCertificateModal } from './components/BadgeCertificateModal';
import { TeacherPresentationPanel } from './components/TeacherPresentationPanel';
import { sound } from './utils/audio';
import { Award, BookOpen, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'mission' | 'shapes' | 'io-lab' | 'robot-game' | 'badge'>('mission');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const toggleMute = () => {
    sound.isMuted = !sound.isMuted;
    setIsMuted(sound.isMuted);
  };

  const handleStageSelectFromGuide = (index: number) => {
    setCurrentStageIndex(index);
    setActiveView('mission');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
        {activeView === 'mission' && (
          <LessonStoryView
            currentStageIndex={currentStageIndex}
            onSetStageIndex={setCurrentStageIndex}
            onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
          />
        )}

        {activeView === 'shapes' && (
          <div className="space-y-6">
            <ComputerTypesShowcase />
          </div>
        )}

        {activeView === 'io-lab' && (
          <div className="space-y-6">
            <InputOutputLab />
          </div>
        )}

        {activeView === 'robot-game' && (
          <div className="space-y-6">
            <RobotChallengeGame onEarnBadge={() => setIsBadgeModalOpen(true)} />
          </div>
        )}
      </main>

      {/* Subtle Educational Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Super Coders Mission</span>
            <span aria-hidden="true">·</span>
            <span>Led by Ms. Bushra</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Desktop · Laptop · Tablet</span>
            <span aria-hidden="true">·</span>
            <span>Input (IN) & Output (OUT)</span>
          </div>

          <button
            onClick={() => setIsTeacherGuideOpen(true)}
            className="text-sky-700 hover:text-sky-900 font-medium"
          >
            Committee Notes
          </button>
        </div>
      </footer>

      {/* Official Super Coder Badge & Certificate Modal */}
      <BadgeCertificateModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
      />

      {/* 5-Minute Demonstration Teleprompter & Committee Guide */}
      <TeacherPresentationPanel
        currentStageIndex={currentStageIndex}
        onSelectStage={handleStageSelectFromGuide}
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
