export interface PinMapping {
  pinName: string;
  pinNumber: string;
  isCustom: boolean;
}

export interface ConfigureModalProps {
  isOpen: boolean;
  onClose: () => void;
}