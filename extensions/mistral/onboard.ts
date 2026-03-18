import {
  buildMistralModelDefinition,
  MISTRAL_BASE_URL,
  MISTRAL_DEFAULT_MODEL_ID,
} from "opuncleh/plugin-sdk/provider-models";
import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithDefaultModel,
  type OpunclehConfig,
} from "opuncleh/plugin-sdk/provider-onboard";

export const MISTRAL_DEFAULT_MODEL_REF = `mistral/${MISTRAL_DEFAULT_MODEL_ID}`;

export function applyMistralProviderConfig(cfg: OpunclehConfig): OpunclehConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[MISTRAL_DEFAULT_MODEL_REF] = {
    ...models[MISTRAL_DEFAULT_MODEL_REF],
    alias: models[MISTRAL_DEFAULT_MODEL_REF]?.alias ?? "Mistral",
  };

  return applyProviderConfigWithDefaultModel(cfg, {
    agentModels: models,
    providerId: "mistral",
    api: "openai-completions",
    baseUrl: MISTRAL_BASE_URL,
    defaultModel: buildMistralModelDefinition(),
    defaultModelId: MISTRAL_DEFAULT_MODEL_ID,
  });
}

export function applyMistralConfig(cfg: OpunclehConfig): OpunclehConfig {
  return applyAgentDefaultModelPrimary(applyMistralProviderConfig(cfg), MISTRAL_DEFAULT_MODEL_REF);
}
