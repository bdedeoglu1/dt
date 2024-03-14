import {
  BackendMinimalBrainForUser,
  MinimalBrainForUser,
} from "@/lib/context/BrainProvider/types";

export const mapBackendMinimalBrainToMinimalBrain = (
  backendMinimalBrain: BackendMinimalBrainForUser
): MinimalBrainForUser => ({
  id: backendMinimalBrain.id,
  name: backendMinimalBrain.name,
  role: backendMinimalBrain.rights,
  ui_properties: backendMinimalBrain.ui_properties
});
