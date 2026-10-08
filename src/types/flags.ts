export interface FeatureFlags {
  enablePowertrain: boolean;
  enableDiwaliLighting: boolean;
  enableCloudAI: boolean;
}

// Quickly switch features ON (true) or OFF (false) during testing
export const ACTIVE_FLAGS: FeatureFlags = {
  enablePowertrain: true,
  enableDiwaliLighting: true,
  enableCloudAI: true, 
};
