import React, { useState } from 'react';
import { Keyboard as KeyboardIcon, Mouse, Monitor, Printer, ArrowRight, ArrowDown, Send, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const InputOutputLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metaphor' | 'input' | 'output'>('metaphor');

  // Metaphor fruit state
  const [fedCount, setFedCount] = useState(0);
  const [lastFedFood, setLastFedFood] = useState<string | null>(null);

  // Keyboard state
  const [typedMessage, setTypedMessage] = useState('HELLO');
  const [dataPackets, setDataPackets] = useState<{ id: number; char: string }[]>([]);

  // Mouse state
  const [mouseClickCount, setMouseClickCount] = useState(0);
  const [mouseActionText, setMouseActionText] = useState('Ready for clicks!');

  // Monitor state
  const [screenChannel, setScreenChannel] = useState<'cartoon' | 'game' | 'drawing'>('cartoon');

  // Printer state
  const [isPrinting, setIsPrinting] = useState(false);
  const [printedSheet, setPrintedSheet] = useState(false);

  const feedFruit = (fruitName: string, emoji: string) => {
    sound.playSuccessChime();
    setLastFedFood(`${emoji} ${fruitName}`);
    setFedCount((c) => c + 1);
  };

  const handleKeyPress = (char: string) => {
    sound.playClickClack();
    setTypedMessage((prev) => (prev.length > 12 ? char : prev + char));
    
    // Spawn animated data packet traveling IN to the CPU
    const newPacket = { id: Date.now() + Math.random(), char };
    setDataPackets((prev) => [...prev, newPacket]);
    setTimeout(() => {
      setDataPackets((prev) => prev.filter((p) => p.id !== newPacket.id));
    }, 1200);
  };

  const triggerMouseClick = (type: 'left' | 'right') => {
    sound.playMouseClick();
    setMouseClickCount((c) => c + 1);
    setMouseActionText(type === 'left' ? '🖱️ Left Click: Open Game!' : '🖱️ Right Click: Show Menu!');
  };

  const runPrinter = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    sound.playPrinterSound();
    setTimeout(() => {
      setIsPrinting(false);
      setPrintedSheet(true);
      sound.playSuccessChime();
    }, 2400);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-semibold tracking-wider text-sky-700 uppercase">
          Lesson Stages 3 & 4 · The Two Superpowers
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
          INPUT (IN!) & OUTPUT (OUT!)
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2">
          "Computers are smart, but they need OUR help to think! They have two superpowers: INPUT and OUTPUT!"
        </p>
      </div>

      {/* 3 Interactive Section Tabs */}
      <div className="grid grid-cols-3 gap-2.5 max-w-lg mx-auto mb-8 p-1.5 bg-slate-100 rounded-xl">
        <button
          onClick={() => {
            sound.playClickClack();
            setActiveTab('metaphor');
          }}
          className={`py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'metaphor' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🍎 The Yummy Metaphor
        </button>
        <button
          onClick={() => {
            sound.playClickClack();
            setActiveTab('input');
          }}
          className={`py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'input' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📥 INPUT Superpower
        </button>
        <button
          onClick={() => {
            sound.playClickClack();
            setActiveTab('output');
          }}
          className={`py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'output' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📤 OUTPUT Superpower
        </button>
      </div>

      {/* Tab 1: The Yummy Fruit Metaphor */}
      {activeTab === 'metaphor' && (
        <div className="bg-gradient-to-b from-rose-50/50 to-amber-50/50 border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col items-center">
          <div className="max-w-xl text-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 font-display">
              "When we are hungry, we put yummy apples and bananas IN!"
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Everybody say: <strong className="text-rose-600 text-lg uppercase">IN!</strong> Just like our bodies need food IN to run and play, a computer needs words and clicks IN to think!
            </p>
          </div>

          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-md p-6 flex flex-col items-center">
            {/* Hungry Robot Belly */}
            <div className="relative w-40 h-40 bg-sky-100 rounded-full border-4 border-sky-400 flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl animate-bounce">
                {lastFedFood ? '😋' : '😮'}
              </span>
              <span className="text-xs font-bold text-sky-800 mt-2">
                {lastFedFood ? `YUM! PUSHED IN!` : `FEED ME FOOD IN!`}
              </span>
              <div className="text-[11px] text-sky-600 font-medium">
                Tummy items: {fedCount}
              </div>
            </div>

            {/* Food Selection */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => feedFruit('Sweet Red Apple', '🍎')}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>🍎</span> Feed Apple IN!
              </button>
              <button
                onClick={() => feedFruit('Ripe Yellow Banana', '🍌')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>🍌</span> Feed Banana IN!
              </button>
              <button
                onClick={() => feedFruit('Crunchy Orange Carrot', '🥕')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>🥕</span> Feed Carrot IN!
              </button>
            </div>

            {lastFedFood && (
              <div className="mt-4 p-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You pushed {lastFedFood} IN! Just like an INPUT DEVICE!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: INPUT DEVICES (Keyboard & Mouse) */}
      {activeTab === 'input' && (
        <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1 rounded-full w-fit mb-4">
            <span>Tuck hands to chest & say: IN!</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. KEYBOARD EXPERIMENT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm">
                    <KeyboardIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Computer Keyboard</h3>
                    <p className="text-xs text-sky-700 font-semibold">Click-clack-clack! Words go IN!</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  "When our little fingers type: <strong>'H-E-L-L-O'</strong>, we push words IN to the computer!"
                </p>

                {/* Live Output preview of letters flowing into computer */}
                <div className="mt-4 p-3 bg-slate-900 rounded-xl text-center relative overflow-hidden">
                  <span className="text-[10px] text-slate-400 font-mono block mb-1">
                    COMPUTER MEMORY (INSIDE CPU):
                  </span>
                  <div className="text-xl font-mono font-bold text-emerald-400 tracking-widest min-h-[30px] flex items-center justify-center">
                    {typedMessage || '...'}
                  </div>

                  {/* Flowing animated packet */}
                  {dataPackets.map((pkt) => (
                    <span
                      key={pkt.id}
                      className="absolute bottom-1 right-2 text-xs font-bold text-sky-400 animate-ping"
                    >
                      {pkt.char} ➔ IN
                    </span>
                  ))}
                </div>

                {/* Virtual Interactive Keys */}
                <div className="mt-4">
                  <div className="text-[11px] font-semibold text-slate-600 mb-2">
                    Click keys to type into the computer:
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                    {['H', 'E', 'L', 'L', 'O'].map((letter, idx) => (
                      <button
                        key={`${letter}-${idx}`}
                        onClick={() => handleKeyPress(letter)}
                        className="w-10 h-10 bg-white hover:bg-sky-50 text-slate-800 font-bold text-sm rounded-lg border-b-2 border-slate-300 shadow-sm active:translate-y-0.5 active:border-b-0 transition-all"
                      >
                        {letter}
                      </button>
                    ))}
                    {['!', 'C', 'O', 'D', 'E'].map((letter, idx) => (
                      <button
                        key={`${letter}-${idx}`}
                        onClick={() => handleKeyPress(letter)}
                        className="w-10 h-10 bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-sm rounded-lg border-b-2 border-sky-300 shadow-sm active:translate-y-0.5 active:border-b-0 transition-all"
                      >
                        {letter}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        sound.playClickClack();
                        setTypedMessage('');
                      }}
                      className="px-2.5 h-10 bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border-b-2 border-rose-300 active:translate-y-0.5"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                ⌨️ Input Device: Pushes your thoughts and letters IN!
              </div>
            </div>

            {/* 2. MOUSE EXPERIMENT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-sm">
                    <Mouse className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Computer Mouse</h3>
                    <p className="text-xs text-indigo-700 font-semibold">Click, click! Orders go IN!</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  "When we click a button, we push orders IN! Mouse is an INPUT DEVICE!"
                </p>

                {/* Mouse Interaction Widget */}
                <div className="mt-4 flex flex-col items-center">
                  {/* Virtual Mouse */}
                  <div className="w-32 h-44 bg-slate-100 rounded-t-full rounded-b-3xl border-4 border-slate-400 p-2 shadow-inner relative flex flex-col justify-between items-center">
                    {/* Cord going into computer */}
                    <div className="w-1.5 h-6 bg-slate-500 absolute -top-6 rounded-full" />

                    {/* Split Buttons */}
                    <div className="w-full flex gap-1 h-18">
                      <button
                        onClick={() => triggerMouseClick('left')}
                        className="w-1/2 h-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-tl-full font-bold text-[11px] flex flex-col items-center justify-center shadow-sm transition-transform active:scale-95"
                      >
                        <span>Left</span>
                        <span>Click</span>
                      </button>

                      {/* Scroll Wheel */}
                      <button
                        onClick={() => {
                          sound.playClickClack();
                          setMouseActionText('🌀 Scroll Wheel Rolled IN!');
                        }}
                        className="w-3.5 h-8 bg-slate-800 rounded-full my-auto hover:bg-slate-700"
                        title="Scroll Wheel"
                      />

                      <button
                        onClick={() => triggerMouseClick('right')}
                        className="w-1/2 h-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-tr-full font-bold text-[11px] flex flex-col items-center justify-center shadow-sm transition-transform active:scale-95"
                      >
                        <span>Right</span>
                        <span>Click</span>
                      </button>
                    </div>

                    {/* Palm rest */}
                    <div className="text-slate-400 text-xs font-semibold my-auto">
                      Palm Rest
                    </div>
                  </div>

                  {/* Feedback readout */}
                  <div className="mt-4 w-full p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                    <div className="text-xs font-bold text-indigo-900">{mouseActionText}</div>
                    <div className="text-[10px] text-indigo-600 font-medium">
                      Total Orders Sent IN: <strong>{mouseClickCount}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                🖱️ Input Device: Pushes clicks and steering instructions IN!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: OUTPUT DEVICES (Screen & Printer) */}
      {activeTab === 'output' && (
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-fit mb-4">
            <span>Open arms wide like an airplane & say: OUT!</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. SCREEN / MONITOR */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Screen / Monitor</h3>
                    <p className="text-xs text-teal-700 font-semibold">Bright pictures shine OUT to our eyes!</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  "Does the computer keep what it thinks secret? No! It shares it back with us! It gives things <strong>OUT</strong>!"
                </p>

                {/* Simulated Monitor Display */}
                <div className="mt-4 flex flex-col items-center">
                  <div className="w-full h-40 bg-slate-900 rounded-xl border-4 border-slate-800 p-2 flex flex-col justify-between shadow-md relative overflow-hidden">
                    {/* Glowing light rays outward */}
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent pointer-events-none" />

                    <div className="flex justify-between items-center text-[10px] text-teal-300 font-mono">
                      <span>● OUTPUT DISPLAY ACTIVE</span>
                      <span>1080p 60FPS</span>
                    </div>

                    {/* Channel Content */}
                    <div className="text-center my-auto">
                      {screenChannel === 'cartoon' && (
                        <div>
                          <div className="text-3xl animate-bounce">🐰🌈🎈</div>
                          <div className="text-xs font-bold text-white mt-1">Joyful Cartoon Adventures</div>
                        </div>
                      )}
                      {screenChannel === 'game' && (
                        <div>
                          <div className="text-3xl animate-pulse">🚀👾🛸</div>
                          <div className="text-xs font-bold text-sky-300 mt-1">Super Coder Space Quest</div>
                        </div>
                      )}
                      {screenChannel === 'drawing' && (
                        <div>
                          <div className="text-3xl">🎨⭐🌻</div>
                          <div className="text-xs font-bold text-amber-300 mt-1">Masterpiece Gallery</div>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-[10px] text-slate-400">
                      Shining bright pixels OUT to our eyes
                    </div>
                  </div>
                  <div className="w-6 h-4 bg-slate-700" />
                  <div className="w-20 h-2 bg-slate-800 rounded-full" />
                </div>

                {/* Channel Selector */}
                <div className="mt-4 flex gap-1.5 justify-center">
                  <button
                    onClick={() => {
                      sound.playSuccessChime();
                      setScreenChannel('cartoon');
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      screenChannel === 'cartoon' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    🐰 Cartoons
                  </button>
                  <button
                    onClick={() => {
                      sound.playSuccessChime();
                      setScreenChannel('game');
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      screenChannel === 'game' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    🚀 Video Game
                  </button>
                  <button
                    onClick={() => {
                      sound.playSuccessChime();
                      setScreenChannel('drawing');
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      screenChannel === 'drawing' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    🎨 Art
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                🖥️ Output Device: Shows images, videos, and stories OUT to our eyes!
              </div>
            </div>

            {/* 2. PRINTER */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Paper Printer</h3>
                    <p className="text-xs text-emerald-700 font-semibold">Shhhhh-kachunk! Paper shoots OUT!</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  "It shoots our real drawings and homework <strong>OUT</strong> onto paper so you can hold it in your hands!"
                </p>

                {/* Animated Printer Mechanism */}
                <div className="mt-4 flex flex-col items-center">
                  <div className="w-64 bg-slate-800 rounded-t-xl p-3 border border-slate-700 shadow-md relative">
                    <div className="flex justify-between items-center text-[10px] text-slate-300">
                      <span>PRINTER READY</span>
                      <div className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    </div>

                    {/* Paper Feed Slot */}
                    <div className="w-48 h-2 bg-slate-950 rounded-full mx-auto my-2" />

                    {/* Paper Sliding OUT */}
                    <div className="relative w-44 mx-auto overflow-hidden transition-all duration-700 flex justify-center">
                      <div
                        className={`w-40 bg-white border border-slate-300 rounded shadow-md p-2.5 text-center transition-all duration-700 ${
                          isPrinting ? 'translate-y-0 opacity-100 animate-pulse' : printedSheet ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-20'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-700 block uppercase">
                          ★ Official Coder Print ★
                        </span>
                        <div className="text-xl my-1">🤖💻⭐</div>
                        <p className="text-[9px] text-slate-500 font-serif">
                          "I love input and output superpowers!"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Printer Base Tray */}
                  <div className="w-72 h-8 bg-slate-700 rounded-b-xl border-t border-slate-600 shadow-sm flex items-center justify-center">
                    <span className="text-[10px] text-slate-300 font-mono">PAPER OUTPUT TRAY</span>
                  </div>
                </div>

                {/* Print Trigger Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={runPrinter}
                    disabled={isPrinting}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isPrinting ? 'Shhhhh-kachunk! Printing...' : 'Print Homework OUT!'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                🖨️ Output Device: Shoots physical copies and homework OUT onto paper!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
