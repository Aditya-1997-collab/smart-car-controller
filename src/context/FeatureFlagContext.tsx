import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FeatureFlags } from '../types/flags';

const FeatureFlagContext = createContext<FeatureFlags | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>({
    enablePowertrain: true,
    enableDiwaliLighting: true,
    enableCloudAI: true
  });

  useEffect(() => {
    // Fetches real-time feature flag configurations from your Python server
    fetch(`${import.meta.env.VITE_API_URL}/api/features/flags`)
      .then((res) => res.json())
      .then((data: FeatureFlags) => setFlags(data))
      .catch((err) => console.error("Could not load remote feature flags, using defaults.", err));
  }, []);

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) throw new Error('useFeatureFlags must be wrapped within a FeatureFlagProvider');
  return context;
};
