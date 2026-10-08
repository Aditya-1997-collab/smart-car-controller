// src/components/DiwaliLighting/constants.ts

export interface PresetColor {
  name: string;
  hex: string;
}

export const PRESET_COLORS: PresetColor[] = [
  { name: 'Deepavali Gold', hex: '#ffaa00' },
  { name: 'Festive Crimson', hex: '#ff0044' },
  { name: 'Marigold Blossom', hex: '#ff5500' },
  { name: 'Mystic Purple', hex: '#aa00ff' },
  { name: 'Eco Teal', hex: '#00ffee' },
  { name: 'Spiritual White', hex: '#ffffff' }
];

export const INITIAL_BRIGHTNESS = 128; // Mid-range starting baseline
export const DEFAULT_COLOR = '#ffaa00';
