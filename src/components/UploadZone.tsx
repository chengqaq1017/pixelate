import { useCallback, useRef, useState, type DragEvent } from 'react';

interface Props {
  onImageLoad: (img: HTMLImageElement) => void;
  hasImage: boolean;
}

export default function UploadZone({ onImageLoad, hasImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => onImageLoad(img);
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onImageLoad]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`
        relative w-full max-w-xl mx-auto rounded-none border-2 border-dashed
        transition-all duration-300 cursor-pointer select-none
        ${dragOver
          ? 'border-accent bg-accent-dim scale-[1.02]'
          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100/80'
        }
        ${hasImage ? 'p-4' : 'p-16'}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {hasImage ? (
        <p className="text-sm text-slate-500 text-center pointer-events-none">
          Drop a new image or click to replace
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div className="w-14 h-14 rounded-none bg-slate-200 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-slate-700 font-medium">Drop your image here</p>
            <p className="text-slate-400 text-sm mt-1">or click to browse — PNG, JPG, WebP</p>
          </div>
        </div>
      )}
    </div>
  );
}
