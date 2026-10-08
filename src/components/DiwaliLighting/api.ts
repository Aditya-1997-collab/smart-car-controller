// src/components/DiwaliLighting/api.ts

export interface LightingPayload {
  active: boolean;
  color: string;
  intensity: number;
}

/**
 * Dispatches the updated illumination parameters to the central Python FastAPI server hub.
 */
export const syncLightingStateWithBackend = async (payload: LightingPayload): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lighting/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (err) {
    console.error("Failed to sync lighting state modifications over to FastAPI network adapter:", err);
    return false;
  }
};
