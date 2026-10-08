// src/components/DiwaliLighting/helpers.ts

/**
 * Converts a raw 0-255 byte integer intensity scaling band into a legible 0-100 percentage integer.
 */
export const calculateBrightnessPercentage = (rawValue: number): number => {
  if (rawValue <= 0) return 0;
  if (rawValue >= 255) return 100;
  return Math.round((rawValue / 255) * 100);
};
