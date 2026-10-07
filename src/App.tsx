// src/App.tsx
import React from 'react';
import { useRobotSocket } from './hooks/useRobotSocket';
import { useFeatureFlags } from './context/FeatureFlagContext'; // Add this import
import ControlPad from './components/ControllPad/index';
import DiwaliLighting from './components/DiwaliLighting';
import TelemetryHub from './components/TelemetryHub';
import StatusIndicator from './components/StatusIndicator';
import './styles/index.css';

const App: React.FC = () => {
  const { isConnected, telemetry, sendCommand } = useRobotSocket(`${import.meta.env.VITE_WS_URL}/ws/drive`);
  const flags = useFeatureFlags(); // Pull active flags from the central state

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>VROBOTIC ESP32 SYSTEM CONSOLE</h1>
        <StatusIndicator connected={isConnected} />
      </header>

      <main className="dashboard-grid">
        {/* Dynamic Card 1: Powertrain Remote Controller Grid Node */}
        {flags.enablePowertrain ? (
          <section className="grid-card left-flank">
            <h2>🕹️ Powertrain Control</h2>
            <ControlPad onCommand={sendCommand} currentAction={telemetry.activeState} />
          </section>
        ) : (
          <section className="grid-card left-flank panel-disabled-placeholder">
            <h2>🕹️ Powertrain Control</h2>
            <p className="disabled-text">⚠️ Powertrain systems disabled by server master flag.</p>
          </section>
        )}

        {/* Dynamic Card 2: Diwali Lighting Sub-Console Slider System */}
        {flags.enableDiwaliLighting && (
          <section className="grid-card center-flank">
            <h2>🪔 Diwali Lighting Loop</h2>
            <DiwaliLighting disabled={!isConnected} />
          </section>
        )}

        {/* Dynamic Card 3: Telemetry Matrices Hub Panel */}
       {flags.enableCloudAI && (<section className="grid-card right-flank">
          <h2>📊 Telemetry & Cloud AI</h2>
          <TelemetryHub telemetryData={telemetry} />
        </section>)}
      </main>
    </div>
  );
};

export default App;
