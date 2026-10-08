// src/types/robot.ts

export type DriveCommand = 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' | 'BRAKE' | 'STOP';

export interface TelemetryPacket {
  frontDistance: number;
  rearBlocked: boolean;
  activeState: DriveCommand;
}
