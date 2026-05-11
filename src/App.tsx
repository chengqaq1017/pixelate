import { useState, useMemo } from 'react';
import UploadZone from './components/UploadZone';
import Controls from './components/Controls';
import ResultView from './components/ResultView';
import { pixelate } from './lib/pixelate';

export default function App() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [colorDepth, setColorDepth] = useState(64);
  const [resetKey, setResetKey] = useState(0);

  const result = useMemo(() => {
    if (!image) return null;
    return pixelate(image, pixelSize, colorDepth);
  }, [image, pixelSize, colorDepth]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-12 md:py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight">
          Pixelate
        </h1>
        <p className="mt-3 text-slate-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Transform any image into pixel art with a single drag and drop.
          Adjust pixel size and color depth to craft the perfect retro aesthetic.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-none bg-slate-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            Client-side processing
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-none bg-slate-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </span>
            Real-time preview
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-none bg-slate-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </span>
            Free download
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 pb-20 space-y-10">
        <UploadZone
          key={resetKey}
          onImageLoad={setImage}
          hasImage={!!image}
        />

        {image && (
          <>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setImage(null);
                  setPixelSize(8);
                  setColorDepth(64);
                  setResetKey(k => k + 1);
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-none border border-slate-300
                  text-sm font-medium text-slate-500 bg-white
                  hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50
                  transition-all duration-200 active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset
              </button>
            </div>
            <Controls
              pixelSize={pixelSize}
              onPixelSizeChange={setPixelSize}
              colorDepth={colorDepth}
              onColorDepthChange={setColorDepth}
            />
            {result && (
              <ResultView
                original={image}
                result={result}
                pixelSize={pixelSize}
                colorDepth={colorDepth}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-xs">
        All processing happens locally — your images never leave your device
      </footer>
    </div>
  );
}
