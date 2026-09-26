import React, { useState, useRef, useEffect } from 'react';
import { Laptop as LaptopIcon, Monitor, Tablet, Sparkles, BookOpen, Backpack, Sun, Power, RotateCcw, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

export const ComputerTypesShowcase: React.FC = () => {
  const [activeShape, setActiveShape] = useState<'desktop' | 'laptop' | 'tablet'>('desktop');
  
  // Desktop state
  const [desktopPowered, setDesktopPowered] = useState(true);
  const [lampOn, setLampOn] = useState(true);
  const [screenWallpaper, setScreenWallpaper] = useState(0);
  const wallpapers = [
    { title: 'Friendly Robot World', bg: 'from-sky-400 to-indigo-600', emoji: '🤖🚀✨' },
    { title: 'Sunny Safari Park', bg: 'from-emerald-400 to-teal-700', emoji: '🦁🦒🌴' },
    { title: 'Space Super Coder', bg: 'from-violet-500 to-fuchsia-700', emoji: '⭐🪐🛸' }
  ];

  // Laptop state
  const [isLaptopOpen, setIsLaptopOpen] = useState(true);
  const [inBackpack, setInBackpack] = useState(false);

  // Tablet drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawColor, setDrawColor] = useState('#0284C7');
  const [isDrawing, setIsDrawing] = useState(false);
  const [stickers, setStickers] = useState<{ x: number; y: number; emoji: string }[]>([]);

  // Init tablet canvas
  useEffect(() => {
    if (activeShape === 'tablet' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx && canvas.width === 0) {
        canvas.width = 440;
        canvas.height = 260;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [activeShape]);

  const clearTablet = () => {
    sound.playClickClack();
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    setStickers([]);
  };

  const addSticker = (emoji: string) => {
    sound.playSuccessChime();
    setStickers(prev => [...prev, {
      x: 60 + Math.random() * 280,
      y: 40 + Math.random() * 160,
      emoji
    }]);
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
      {/* Header section with quote from Ms. Bushra */}
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase">
          Lesson Stage 2 · Super Shapes & Sizes
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
          Computers in All Shapes & Sizes!
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2">
          "Computers are not just big heavy boxes sitting in offices. They come in super cool shapes and sizes!"
        </p>
      </div>

      {/* 3 Form Factor Tabs */}
      <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-8 p-1.5 bg-slate-100 rounded-xl">
        <button
          onClick={() => {
            sound.playClickClack();
            setActiveShape('desktop');
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeShape === 'desktop'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Desktop</span>
        </button>

        <button
          onClick={() => {
            sound.playClickClack();
            setActiveShape('laptop');
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeShape === 'laptop'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LaptopIcon className="w-4 h-4" />
          <span>Laptop</span>
        </button>

        <button
          onClick={() => {
            sound.playClickClack();
            setActiveShape('tablet');
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeShape === 'tablet'
              ? 'bg-white text-amber-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tablet className="w-4 h-4" />
          <span>Tablet</span>
        </button>
      </div>

      {/* Interactive Showcase Area */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 min-h-[420px] flex flex-col justify-center items-center">
        {/* 1. DESKTOP SHOWCASE */}
        {activeShape === 'desktop' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-medium text-sky-700 mb-3 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>"It loves to stay cozy on your table!"</span>
            </div>

            {/* Virtual Desk Canvas */}
            <div className="relative w-full h-72 bg-gradient-to-b from-sky-50 to-amber-50/40 rounded-xl border border-slate-200 flex items-end justify-center pb-4 overflow-hidden">
              {/* Desk Lamp */}
              <div className="absolute top-4 left-8 flex flex-col items-center">
                <button
                  onClick={() => {
                    sound.playMouseClick();
                    setLampOn(!lampOn);
                  }}
                  title="Click to toggle desk lamp"
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`w-12 h-8 rounded-t-full transition-colors ${lampOn ? 'bg-amber-300 shadow-lg shadow-amber-200' : 'bg-slate-400'}`} />
                  <div className="w-2 h-16 bg-slate-700" />
                  <div className="w-8 h-2 bg-slate-800 rounded-full" />
                  <span className="text-[10px] text-slate-500 mt-1 font-medium">
                    {lampOn ? 'Lamp: ON' : 'Lamp: OFF'}
                  </span>
                </button>
                {lampOn && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-200/25 rounded-full blur-xl pointer-events-none" />
                )}
              </div>

              {/* Computer Monitor */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-64 h-44 rounded-lg border-4 transition-all duration-300 p-2 flex flex-col justify-between shadow-md ${
                  desktopPowered
                    ? `border-slate-800 bg-gradient-to-br ${wallpapers[screenWallpaper].bg}`
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  {desktopPowered ? (
                    <>
                      <div className="flex justify-between items-center text-white/90 text-[11px] px-1">
                        <span>Ms. Bushra's Class</span>
                        <span>10:00 AM</span>
                      </div>
                      <div className="text-center text-white my-auto">
                        <div className="text-3xl animate-bounce">{wallpapers[screenWallpaper].emoji}</div>
                        <p className="text-xs font-semibold mt-1 drop-shadow">{wallpapers[screenWallpaper].title}</p>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            sound.playSuccessChime();
                            setScreenWallpaper((prev) => (prev + 1) % wallpapers.length);
                          }}
                          className="bg-white/25 hover:bg-white/40 text-white text-[10px] font-medium px-2 py-0.5 rounded transition-colors"
                        >
                          Change Wallpaper
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                      [System Sleeping]
                    </div>
                  )}
                </div>
                {/* Monitor Stand */}
                <div className="w-8 h-6 bg-slate-700" />
                <div className="w-24 h-2 bg-slate-800 rounded-full" />
              </div>

              {/* Computer Tower (CPU) */}
              <div className="ml-6 z-10 flex flex-col items-center">
                <div className="w-20 h-44 bg-slate-800 rounded-lg p-2.5 flex flex-col justify-between border border-slate-700 shadow-md">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        sound.playRobotBleep(!desktopPowered);
                        setDesktopPowered(!desktopPowered);
                      }}
                      className={`p-1 rounded-full transition-colors ${
                        desktopPowered ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-600 text-slate-400'
                      }`}
                      title="Power Button"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1 bg-slate-700 rounded" />
                    <div className="h-1 bg-slate-700 rounded" />
                    <div className="h-1 bg-slate-700 rounded" />
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono text-center">
                    {desktopPowered ? 'RUNNING' : 'OFF'}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">Tower CPU</div>
              </div>

              {/* Wooden Desk Surface */}
              <div className="absolute bottom-0 w-full h-4 bg-amber-800 rounded-b-xl border-t border-amber-900/30" />
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              💡 <strong>Cozy Table Fact:</strong> Desktops have separate parts that plug together. Because they are big and powerful, they love staying in one cozy spot!
            </p>
          </div>
        )}

        {/* 2. LAPTOP SHOWCASE */}
        {activeShape === 'laptop' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 mb-3 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>"It folds open and shut just like a magical book!"</span>
            </div>

            {/* Laptop Interactive Stage */}
            <div className="relative w-full h-72 bg-gradient-to-b from-emerald-50 to-teal-50/40 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 overflow-hidden">
              {inBackpack ? (
                // Inside Backpack View
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="w-36 h-44 bg-rose-500 rounded-2xl border-4 border-rose-600 shadow-lg flex flex-col items-center justify-center relative p-3">
                    <div className="w-16 h-8 border-4 border-rose-700 rounded-t-xl absolute -top-8" />
                    <Backpack className="w-12 h-12 text-white/90" />
                    <span className="text-white text-xs font-bold mt-2">School Backpack</span>
                    <span className="text-white/80 text-[10px] text-center mt-1">Laptop safely tucked inside for adventures!</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playSuccessChime();
                      setInBackpack(false);
                      setIsLaptopOpen(true);
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    🎒 Take Laptop Out of Backpack
                  </button>
                </div>
              ) : (
                // Laptop Device View
                <div className="flex flex-col items-center">
                  {/* Laptop Screen Lid */}
                  <div
                    className={`w-64 transition-all duration-500 origin-bottom rounded-t-xl border-4 border-slate-800 shadow-xl overflow-hidden ${
                      isLaptopOpen
                        ? 'h-36 bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 flex flex-col justify-between'
                        : 'h-8 bg-slate-700 scale-95 opacity-80 cursor-pointer'
                    }`}
                    onClick={() => {
                      if (!isLaptopOpen) {
                        sound.playSuccessChime();
                        setIsLaptopOpen(true);
                      }
                    }}
                  >
                    {isLaptopOpen ? (
                      <>
                        <div className="flex items-center justify-between text-white/80 text-[10px]">
                          <span>✈️ Portable Anywhere</span>
                          <span>Battery: 100% 🔋</span>
                        </div>
                        <div className="text-center text-white my-auto">
                          <p className="text-sm font-bold">Magical Storybook</p>
                          <p className="text-[11px] text-indigo-100">Take to school or grandma's!</p>
                        </div>
                        <div className="w-full h-1 bg-white/20 rounded" />
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-white/90 text-xs font-semibold">
                        🔒 Folded Shut (Click to Open)
                      </div>
                    )}
                  </div>

                  {/* Laptop Hinge & Keyboard Base */}
                  <div className="w-72 h-16 bg-slate-800 rounded-b-xl border-t-2 border-slate-600 shadow-md p-2 flex flex-col justify-between">
                    {/* Mini keyboard keys pattern */}
                    <div className="grid grid-cols-8 gap-1 px-2 py-0.5">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="h-2 bg-slate-700 rounded-[2px]" />
                      ))}
                    </div>
                    {/* Trackpad */}
                    <div className="w-16 h-4 bg-slate-700 rounded mx-auto" />
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        sound.playClickClack();
                        setIsLaptopOpen(!isLaptopOpen);
                      }}
                      className="px-3.5 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
                    >
                      {isLaptopOpen ? '📖 Fold Shut' : '✨ Open Up'}
                    </button>
                    <button
                      onClick={() => {
                        sound.playSuccessChime();
                        setInBackpack(true);
                      }}
                      className="px-3.5 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
                    >
                      🎒 Put in Backpack
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              🎒 <strong>Magical Book Fact:</strong> Laptops fold open and shut just like a magical book. You can take them anywhere in the world!
            </p>
          </div>
        )}

        {/* 3. TABLET SHOWCASE */}
        {activeShape === 'tablet' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-700 mb-3 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>"Tap, tap, swipe! Pure touch-screen magic for drawing and learning."</span>
            </div>

            {/* Virtual Tablet Body */}
            <div className="w-[480px] max-w-full bg-slate-900 rounded-3xl p-4 shadow-xl border-4 border-slate-800 flex flex-col items-center">
              {/* Screen Area */}
              <div className="relative w-full bg-white rounded-2xl overflow-hidden shadow-inner flex flex-col">
                {/* Status Bar */}
                <div className="bg-slate-100 px-3 py-1 flex items-center justify-between text-[11px] text-slate-600 border-b border-slate-200">
                  <span className="font-semibold">Magic Tablet Draw</span>
                  <div className="flex items-center gap-2">
                    <span>9:41 AM</span>
                    <span>100% ⚡</span>
                  </div>
                </div>

                {/* Drawing Canvas */}
                <div className="relative w-full h-[220px] bg-white cursor-crosshair touch-none">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleStartDraw}
                    onMouseMove={handleDraw}
                    onMouseUp={handleEndDraw}
                    onMouseLeave={handleEndDraw}
                    onTouchStart={handleStartDraw}
                    onTouchMove={handleDraw}
                    onTouchEnd={handleEndDraw}
                    className="w-full h-full block"
                  />
                  {/* Floating stickers on canvas */}
                  {stickers.map((stk, i) => (
                    <span
                      key={i}
                      className="absolute text-2xl select-none pointer-events-none animate-bounce"
                      style={{ left: stk.x, top: stk.y }}
                    >
                      {stk.emoji}
                    </span>
                  ))}
                </div>

                {/* Tablet Tool Palette */}
                <div className="bg-slate-50 border-t border-slate-200 p-2 flex items-center justify-between">
                  {/* Color Picks */}
                  <div className="flex items-center gap-1.5">
                    {['#0284C7', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#1E293B'].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          sound.playMouseClick();
                          setDrawColor(color);
                        }}
                        style={{ backgroundColor: color }}
                        className={`w-6 h-6 rounded-full transition-transform ${
                          drawColor === color ? 'scale-125 ring-2 ring-offset-1 ring-slate-400' : 'hover:scale-110'
                        }`}
                        title="Pick color"
                      />
                    ))}
                  </div>

                  {/* Stamp Stickers */}
                  <div className="flex items-center gap-1">
                    {['⭐', '🤖', '🍎', '🚀'].map((em) => (
                      <button
                        key={em}
                        onClick={() => addSticker(em)}
                        className="w-7 h-7 bg-white hover:bg-slate-200 rounded border border-slate-200 text-sm flex items-center justify-center transition-colors"
                        title={`Stamp ${em}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>

                  {/* Clear Button */}
                  <button
                    onClick={clearTablet}
                    className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Tablet Home Button / Camera Indicator */}
              <div className="mt-2.5 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              🎨 <strong>Touch Magic Fact:</strong> Tablets have no separate keyboard or mouse—your fingers do all the tapping, swiping, and drawing directly on the screen!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
