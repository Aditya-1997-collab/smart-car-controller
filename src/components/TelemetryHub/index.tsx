// src/components/TelemetryHub/index.tsx
import React, { useState } from 'react';
import type { TelemetryPacket } from '../../types/robot';
import { useFeatureFlags } from '../../context/FeatureFlagContext'; // Added for flag observation
import './index.css';

interface TelemetryHubProps {
  telemetryData: TelemetryPacket;
}

const TelemetryHub: React.FC<TelemetryHubProps> = ({ telemetryData }) => {
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('System idling. Awaiting environment prompts...');
  const flags = useFeatureFlags(); // Pull active server flags

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    // Early visual exit if the server has locked down the AI node via feature flags
    if (!flags.enableCloudAI) {
      setAiResponse('AI Gateway Blocked: Cloud AI module is currently disabled by system flags.');
      return;
    }

    setAiResponse('Querying Open-Source Qwen 2.5 AI Model Gateway...');
    
    try {
      // FIXED: Routed cleanly to match your modular app prefix setup
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai-command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      setAiResponse(`AI Pipeline Error: Failed to bridge communication line to the FastAPI Qwen router, ${error}`);
    }
    setAiPrompt('');
  };

  return (
    <div className="telemetry-hub-container">
      {/* SECTION 1: HARDWARE SENSOR REAL-TIME FEED */}
      <div className="sensor-matrix-grid">
        <div className="sensor-card">
          <span className="sensor-title">📍 FRONT SONAR</span>
          <span className={`sensor-value ${telemetryData.frontDistance <= 20 ? 'danger-flash' : ''}`}>
            {telemetryData.frontDistance} <span className="unit-label">cm</span>
          </span>
        </div>

        <div className="sensor-card">
          <span className="sensor-title">🛡️ REAR IR RADAR</span>
          <span className={`sensor-value ${telemetryData.rearBlocked ? 'alert-active' : 'clear-active'}`}>
            {telemetryData.rearBlocked ? 'BLOCKED' : 'CLEAR'}
          </span>
        </div>
      </div>

      {/* SECTION 2: MODULAR QWEN AI CHAT CONSOLE LOGS */}
      <div className="ai-gateway-console">
        <h3>🧠 Open-Source Qwen 2.5 Intelligence Engine</h3>
        
        {flags.enableCloudAI ? (
          <>
            <div className="ai-stream-terminal">
              <p>{aiResponse}</p>
            </div>
            
            <form onSubmit={handleSendPrompt} className="ai-input-row">
              <input 
                type="text" 
                placeholder="Instruct the car (e.g., Back out of corners)..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button type="submit">SEND</button>
            </form>
          </>
        ) : (
          <div className="ai-disabled-lockout-notice">
            <p>⚠️ The server-driven feature flag for the Cloud AI model is set to inactive. Command prompt gateway suspended.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelemetryHub;
