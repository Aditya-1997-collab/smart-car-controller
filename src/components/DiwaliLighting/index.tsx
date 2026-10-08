// src/components/DiwaliLighting/index.tsx
import React, { useState } from 'react';
import { PRESET_COLORS, INITIAL_BRIGHTNESS, DEFAULT_COLOR } from './constants';
import { calculateBrightnessPercentage } from './helpers';
import { syncLightingStateWithBackend } from './api';
import './index.css';

interface DiwaliLightingProps {
  disabled?: boolean;
}

const DiwaliLighting: React.FC<DiwaliLightingProps> = ({ disabled = false }) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(INITIAL_BRIGHTNESS);
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);

  const handlePowerToggle = async () => {
    const nextState = !isOn;
    setIsOn(nextState);
    await syncLightingStateWithBackend({
      active: nextState,
      color: selectedColor,
      intensity: brightness
    });
  };

  const handleColorSelect = async (hex: string) => {
    setSelectedColor(hex);
    await syncLightingStateWithBackend({
      active: isOn,
      color: hex,
      intensity: brightness
    });
  };

  const handleBrightnessChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextBrightness = parseInt(e.target.value, 10);
    setBrightness(nextBrightness);
    await syncLightingStateWithBackend({
      active: isOn,
      color: selectedColor,
      intensity: nextBrightness
    });
  };

  return (
    <div className={`diwali-lighting-panel ${disabled ? 'panel-locked' : ''}`}>
      
      {/* MODULE ROW 1: MASTER SWITCH CONTROL PORT */}
      <div className="lighting-row power-grid-row">
        <span className="row-label-caption">✨ ILLUMINATION ENGINE</span>
        <button 
          className={`power-toggle-switch ${isOn ? 'switch-ignited' : 'switch-dark'}`}
          onClick={handlePowerToggle}
          disabled={disabled}
        >
          {isOn ? '🟢 ACTIVE LOOP RUNNING' : '🔴 SYSTEM SHUTDOWN'}
        </button>
      </div>

      {/* MODULE ROW 2: PRESET PALETTE GRID MATRIX */}
      <div className="lighting-row color-selector-block">
        <span className="row-label-caption">🎨 FESTIVE HEX PRESETS</span>
        <div className="preset-colors-matrix">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              className={`color-swatch-node ${selectedColor === color.hex ? 'swatch-selected' : ''}`}
              style={{ '--swatch-color': color.hex } as React.CSSProperties}
              onClick={() => handleColorSelect(color.hex)}
              disabled={disabled || !isOn}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* MODULE ROW 3: POTENTIOMETER SLIDER SCORING INTERFACE */}
      <div className="lighting-row intensity-slider-block">
        <div className="slider-header-info">
          <span className="row-label-caption">⚡ BRIGHTNESS INTENSITY</span>
          <span className="percentage-badge">
            {calculateBrightnessPercentage(brightness)}%
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="255" 
          value={brightness}
          onChange={handleBrightnessChange}
          disabled={disabled || !isOn}
          className="neon-range-input-bar"
        />
      </div>

    </div>
  );
};

export default DiwaliLighting;
