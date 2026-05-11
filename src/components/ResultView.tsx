interface Props {
  original: HTMLImageElement;
  result: string;
  pixelSize: number;
  colorDepth: number;
}

export default function ResultView({ original, result, pixelSize, colorDepth }: Props) {
  function download() {
    const link = document.createElement('a');
    link.download = `pixel-${pixelSize}px-${colorDepth}c.png`;
    link.href = result;
    link.click();
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Before / After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dark-400" />
            <span className="text-xs font-medium text-dark-300 uppercase tracking-widest">Original</span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-dark-500 bg-dark-800">
            <img
              src={original.src}
              alt="Original"
              className="w-full h-auto block"
              style={{ imageRendering: 'auto', maxHeight: 480, objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-dark-300 uppercase tracking-widest">Pixel art</span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-dark-500 bg-dark-800">
            <img
              src={result}
              alt="Pixelated result"
              className="w-full h-auto block"
              style={{ imageRendering: 'pixelated', maxHeight: 480, objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="flex justify-center">
        <button
          onClick={download}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-dark-900
            font-medium text-sm transition-all duration-200
            hover:bg-dark-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Download PNG
        </button>
      </div>
    </div>
  );
}
