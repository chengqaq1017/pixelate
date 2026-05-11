/**
 * Downscale an image, then upscale with nearest-neighbor interpolation
 * to create a pixel-art effect.
 */
export function pixelate(
  source: HTMLImageElement,
  pixelSize: number,
  colorDepth: number,
): string {
  const { width, height } = source;
  const smallW = Math.max(2, Math.floor(width / pixelSize));
  const smallH = Math.max(2, Math.floor(height / pixelSize));

  // Step 1: Downscale to a tiny canvas
  const small = document.createElement('canvas');
  small.width = smallW;
  small.height = smallH;
  const sctx = small.getContext('2d')!;
  sctx.drawImage(source, 0, 0, smallW, smallH);

  // Step 2: Quantize colors if depth < 256
  if (colorDepth < 256) {
    const imgData = sctx.getImageData(0, 0, smallW, smallH);
    quantizeColors(imgData.data, colorDepth);
    sctx.putImageData(imgData, 0, 0);
  }

  // Step 3: Upscale back with nearest-neighbor
  const output = document.createElement('canvas');
  output.width = width;
  output.height = height;
  const octx = output.getContext('2d')!;
  octx.imageSmoothingEnabled = false;
  octx.drawImage(small, 0, 0, width, height);

  return output.toDataURL('image/png');
}

function quantizeColors(pixels: Uint8ClampedArray, levels: number): void {
  const step = 256 / levels;
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = quantizeChannel(pixels[i], step);
    pixels[i + 1] = quantizeChannel(pixels[i + 1], step);
    pixels[i + 2] = quantizeChannel(pixels[i + 2], step);
    // Alpha stays as-is
  }
}

function quantizeChannel(value: number, step: number): number {
  return Math.round(value / step) * step;
}
