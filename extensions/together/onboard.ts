import {
  buildTogetherModelDefinition,
  TOGETHER_BASE_URL,
  TOGETHER_MODEL_CATALOG,
} from "opuncleh/plugin-sdk/provider-models";
import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithModelCatalog,
  type OpunclehConfig,
} from "opuncleh/plugin-sdk/provider-onboard";

export const TOGETHER_DEFAULT_MODEL_REF = "together/moonshotai/Kimi-K2.5";

export function applyTogetherProviderConfig(cfg: OpunclehConfig): OpunclehConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[TOGETHER_DEFAULT_MODEL_REF] = {
    ...models[TOGETHER_DEFAULT_MODEL_REF],
    alias: models[TOGETHER_DEFAULT_MODEL_REF]?.alias ?? "Together AI",
  };

  return applyProviderConfigWithModelCatalog(cfg, {
    agentModels: models,
    providerId: "together",
    api: "openai-completions",
    baseUrl: TOGETHER_BASE_URL,
    catalogModels: TOGETHER_MODEL_CATALOG.map(buildTogetherModelDefinition),
  });
}

export function applyTogetherConfig(cfg: OpunclehConfig): OpunclehConfig {
  return applyAgentDefaultModelPrimary(
    applyTogetherProviderConfig(cfg),
    TOGETHER_DEFAULT_MODEL_REF,
  );
}
