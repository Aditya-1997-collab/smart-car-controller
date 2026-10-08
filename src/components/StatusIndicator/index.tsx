import React from 'react';
import './index.css';

interface StatusIndicatorProps {
  connected: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ connected }) => {
  return (
    <div className={`status-wrapper ${connected ? 'status-online' : 'status-offline'}`}>
      <span className="status-ping-dot"></span>
      <span className="status-label-text">
        {connected ? 'LINK STATE: OPERATIONAL' : 'LINK STATE: DISCONNECTED'}
      </span>
    </div>
  );
};

export default StatusIndicator;
