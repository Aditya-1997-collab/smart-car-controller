// src/components/ControlPad/ControlPad.tsx
import React from 'react';
import type { DriveCommand } from '../../types/robot';
import './index.css';

interface ControlPadProps {
  onCommand: (command: DriveCommand) => void;
  currentAction: DriveCommand;
}

const ControlPad: React.FC<ControlPadProps> = ({ onCommand, currentAction }) => {

  const isMoving = currentAction !== 'STOP' && currentAction !== 'BRAKE';
  
  const handlePress = (command: DriveCommand) => {
    onCommand(command);
  };

  const handleRelease = () => {
    onCommand('STOP');
  };

  const handleCenterToggle = () => {
    if (isMoving) {
      onCommand('STOP'); // If rolling, slam brakes down to stop
    } else {
      onCommand('FORWARD'); // If parked, start moving forward automatically
    }
  };

  const getButtonClass = (btnDir: DriveCommand) => {
    return `dpad-btn btn-${btnDir.toLowerCase()} ${currentAction === btnDir ? 'active' : ''}`;
  };

  return (
    <div className="control-pad-wrapper">
      <div className="dpad-circular-matrix">
        
        {/* FORWARD (TOP ROW CENTER) */}
        <button 
          className={getButtonClass('FORWARD')}
          onMouseDown={() => handlePress('FORWARD')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('FORWARD')}
          onTouchEnd={handleRelease}
          aria-label="Move Forward"
        >
          ▲
        </button>

        {/* LEFT (MIDDLE ROW LEFT) */}
        <button 
          className={getButtonClass('LEFT')}
          onMouseDown={() => handlePress('LEFT')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('LEFT')}
          onTouchEnd={handleRelease}
          aria-label="Turn Left"
        >
          ◀
        </button>

        <button 
          className={`dpad-btn btn-center-toggle ${isMoving ? 'engine-running' : 'engine-stopped'}`}
          onClick={handleCenterToggle}
          aria-label={isMoving ? "Stop Engine" : "Start Engine"}
        >
          {isMoving ? '🛑 STOP' : '⚡ START'}
        </button>

        {/* RIGHT (MIDDLE ROW RIGHT) */}
        <button 
          className={getButtonClass('RIGHT')}
          onMouseDown={() => handlePress('RIGHT')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('RIGHT')}
          onTouchEnd={handleRelease}
          aria-label="Turn Right"
        >
          ▶
        </button>

        {/* BACKWARD (BOTTOM ROW CENTER) */}
        <button 
          className={getButtonClass('BACKWARD')}
          onMouseDown={() => handlePress('BACKWARD')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('BACKWARD')}
          onTouchEnd={handleRelease}
          aria-label="Move Backward"
        >
          ▼
        </button>
        
      </div>

      <div className="current-state-badge">
        CURRENT ACTIVE ACTION: <span>{currentAction}</span>
      </div>
    </div>
  );
};

export default ControlPad;
