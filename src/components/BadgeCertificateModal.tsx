import React, { useState } from 'react';
import { Award, Printer, Download, Sparkles, CheckCircle2, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface BadgeCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeCertificateModal: React.FC<BadgeCertificateModalProps> = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('Super Coder Alex');
  const [badgeRole, setBadgeRole] = useState('Certified Input & Output Specialist');
  const [selectedAvatar, setSelectedAvatar] = useState('🤖');

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playPrinterSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          title="Close Certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ms. Bushra's Tech Mission Accomplished</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
            Official Super Coder Certificate
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Customize your badge and print your official certificate!
          </p>
        </div>

        {/* Certificate Customization Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
          {/* Name input */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Super Coder's Name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name..."
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none font-medium"
            />
          </div>

          {/* Avatar picker */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Pick Avatar:
            </label>
            <div className="flex gap-1.5">
              {['🤖', '⭐', '👧', '👦', '🚀'].map((av) => (
                <button
                  key={av}
                  onClick={() => {
                    sound.playMouseClick();
                    setSelectedAvatar(av);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg border transition-all ${
                    selectedAvatar === av
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 scale-105'
                      : 'bg-white border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* THE CERTIFICATE FRAME (Printable) */}
        <div className="relative bg-gradient-to-b from-amber-50/70 via-white to-amber-50/70 border-8 border-double border-amber-600/40 rounded-2xl p-6 md:p-8 text-center shadow-inner">
          {/* Ornate corner flourishes */}
          <div className="absolute top-2 left-2 text-amber-500 text-lg">✦</div>
          <div className="absolute top-2 right-2 text-amber-500 text-lg">✦</div>
          <div className="absolute bottom-2 left-2 text-amber-500 text-lg">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-500 text-lg">✦</div>

          {/* Certificate Badge Ribbon Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-white flex items-center justify-center shadow-lg border-2 border-white mb-2">
            <span className="text-3xl">{selectedAvatar}</span>
          </div>

          <span className="text-[11px] tracking-widest uppercase font-bold text-amber-800">
            ★ MS. BUSHRA'S COMPUTER SCIENCE ACADEMY ★
          </span>

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 font-display tracking-tight">
            SUPER CODER BADGE OF HONOR
          </h3>

          <p className="text-xs text-slate-600 mt-2">
            This certificate is proudly awarded to:
          </p>

          <div className="text-2xl md:text-3xl font-bold text-sky-800 font-display border-b-2 border-amber-400 inline-block px-8 py-1 my-2">
            {studentName || 'Super Coder'}
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            For successfully cracking the <strong>Secret Tech Mission</strong>, unlocking the 3 computer shapes (Desktop, Laptop, Tablet), and mastering the superpowers of <strong>INPUT</strong> (Keyboard & Mouse) and <strong>OUTPUT</strong> (Screen & Printer)!
          </p>

          {/* Certificate Badges Row */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 pt-3 border-t border-amber-200">
            <div className="bg-sky-50 text-sky-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-sky-200">
              📥 Input Master
            </div>
            <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-200">
              📤 Output Champion
            </div>
            <div className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-200">
              🤖 Robot Challenger
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-6 pt-4 flex items-center justify-between px-4 text-left border-t border-slate-200">
            <div>
              <div className="font-serif italic text-base md:text-lg text-slate-800 font-bold">
                Ms. Bushra
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">
                Lead Teacher & Guide
              </div>
            </div>

            {/* Golden Seal */}
            <div className="w-14 h-14 rounded-full bg-amber-400/20 border-2 border-amber-500 flex flex-col items-center justify-center text-[8px] font-bold text-amber-900 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL</span>
              <span>SEAL</span>
            </div>

            <div className="text-right">
              <div className="text-xs font-semibold text-slate-700">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">
                Mission Date
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
