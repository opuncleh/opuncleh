import { OPENCODE_ZEN_DEFAULT_MODEL_REF } from "opuncleh/plugin-sdk/provider-models";
import {
  applyAgentDefaultModelPrimary,
  type OpunclehConfig,
} from "opuncleh/plugin-sdk/provider-onboard";

export { OPENCODE_ZEN_DEFAULT_MODEL_REF };

export function applyOpencodeZenProviderConfig(cfg: OpunclehConfig): OpunclehConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[OPENCODE_ZEN_DEFAULT_MODEL_REF] = {
    ...models[OPENCODE_ZEN_DEFAULT_MODEL_REF],
    alias: models[OPENCODE_ZEN_DEFAULT_MODEL_REF]?.alias ?? "Opus",
  };

  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: {
        ...cfg.agents?.defaults,
        models,
      },
    },
  };
}

export function applyOpencodeZenConfig(cfg: OpunclehConfig): OpunclehConfig {
  return applyAgentDefaultModelPrimary(
    applyOpencodeZenProviderConfig(cfg),
    OPENCODE_ZEN_DEFAULT_MODEL_REF,
  );
}
