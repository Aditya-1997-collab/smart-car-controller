// src/hooks/useRobotSocket.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import type { DriveCommand, TelemetryPacket } from '../types/robot';

export const useRobotSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<TelemetryPacket>({
    frontDistance: 400,
    rearBlocked: false,
    activeState: 'STOP'
  });
  
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    
    ws.onmessage = (event) => {
      try {
        const data: TelemetryPacket = JSON.parse(event.data);
        setTelemetry(data);
      } catch (err) {
        console.error("Failed parsing telemetry JSON packet", err);
      }
    };

    return () => ws.close();
  }, [url]);

  const sendCommand = useCallback((command: DriveCommand) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'DRIVE', payload: command }));
    }
  }, []);

  return { isConnected, telemetry, sendCommand };
};
