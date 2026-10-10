import React, { useState } from 'react';
import type { ConfigureModalProps } from '../../types/configure';
import type { PinMapping } from '../../types/configure';
import {industryStandardPins} from './constants'

export const PinConfigurationMatrix: React.FC<ConfigureModalProps> = ({ isOpen, onClose }) => {

  const [pinMatrix, setPinMatrix] = useState<PinMapping[]>(industryStandardPins);

  if (!isOpen) return null; // Complete layout isolation if hidden

  const handleInputChange = (index: number, key: 'pinName' | 'pinNumber', value: string) => {
    setPinMatrix((prevMatrix) => {
      const updatedMatrix = [...prevMatrix];
      if (key === 'pinName') {
        updatedMatrix[index][key] = value.toUpperCase();
      } else {
        updatedMatrix[index][key] = value;
      }
      return updatedMatrix;
    });
  };

  const handleAddNewRow = (e: React.MouseEvent) => {
    e.preventDefault();
    setPinMatrix((prev) => [...prev, { pinName: '', pinNumber: '', isCustom: true }]);
  };

  const handleSaveAndExit = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanPayload = pinMatrix.filter(row => row.pinName.trim() !== '' && row.pinNumber.trim() !== '');
    
    // Core structural target: Staging for backend transformation loops
    console.log('[Database Sync] Staged Configuration Matrix Payload:', cleanPayload);
    
    // Fire closing hook sequence
    onClose();
  };

  return (
    <div className="modal-overlay-mask" onClick={onClose}>
      <div className="modal-frame-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h3>Pin Mapping Configuration</h3>
          <button className="close-x-btn" onClick={onClose}>&times;</button>
        </div>
        
        <table className="pin-matrix-table">
          <thead>
            <tr>
              <th>Component Pin Name</th>
              <th>Microcontroller GPIO Pin #</th>
            </tr>
          </thead>
          <tbody>
            {pinMatrix.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="matrix-input"
                    placeholder="CUSTOM_PIN_NAME"
                    value={row.pinName}
                    disabled={!row.isCustom}
                    onChange={(e) => handleInputChange(index, 'pinName', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="matrix-input"
                    placeholder="GPIO #"
                    value={row.pinNumber}
                    onChange={(e) => handleInputChange(index, 'pinNumber', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="matrix-action-row">
          <button className="add-row-btn" onClick={handleAddNewRow}>
            + Add Custom Pin
          </button>
          <button className="save-matrix-btn" onClick={handleSaveAndExit}>
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinConfigurationMatrix;
