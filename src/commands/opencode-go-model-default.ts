import type { OpunclehConfig } from "../config/config.js";
import { applyAgentDefaultPrimaryModel } from "./model-default.js";

export const OPENCODE_GO_DEFAULT_MODEL_REF = "opencode-go/kimi-k2.5";

export function applyOpencodeGoModelDefault(cfg: OpunclehConfig): {
  next: OpunclehConfig;
  changed: boolean;
} {
  return applyAgentDefaultPrimaryModel({ cfg, model: OPENCODE_GO_DEFAULT_MODEL_REF });
}
