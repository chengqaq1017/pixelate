interface Props {
  pixelSize: number;
  onPixelSizeChange: (v: number) => void;
  colorDepth: number;
  onColorDepthChange: (v: number) => void;
}

export default function Controls({ pixelSize, onPixelSizeChange, colorDepth, onColorDepthChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-8 w-full max-w-xl mx-auto">
      <div className="flex-1 min-w-40">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-medium text-dark-200">Pixel size</label>
          <span className="text-sm text-dark-300 tabular-nums">{pixelSize}px</span>
        </div>
        <input
          type="range"
          min={3}
          max={40}
          value={pixelSize}
          onChange={(e) => onPixelSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex-1 min-w-40">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-medium text-dark-200">Color depth</label>
          <span className="text-sm text-dark-300 tabular-nums">{colorDepth}</span>
        </div>
        <input
          type="range"
          min={2}
          max={256}
          value={colorDepth}
          onChange={(e) => onColorDepthChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
