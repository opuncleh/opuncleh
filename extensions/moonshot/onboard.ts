import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithDefaultModel,
  type OpunclehConfig,
} from "opuncleh/plugin-sdk/provider-onboard";
import {
  buildMoonshotProvider,
  MOONSHOT_BASE_URL,
  MOONSHOT_DEFAULT_MODEL_ID,
} from "./provider-catalog.js";

export const MOONSHOT_CN_BASE_URL = "https://api.moonshot.cn/v1";
export const MOONSHOT_DEFAULT_MODEL_REF = `moonshot/${MOONSHOT_DEFAULT_MODEL_ID}`;

export function applyMoonshotProviderConfig(cfg: OpunclehConfig): OpunclehConfig {
  return applyMoonshotProviderConfigWithBaseUrl(cfg, MOONSHOT_BASE_URL);
}

export function applyMoonshotProviderConfigCn(cfg: OpunclehConfig): OpunclehConfig {
  return applyMoonshotProviderConfigWithBaseUrl(cfg, MOONSHOT_CN_BASE_URL);
}

function applyMoonshotProviderConfigWithBaseUrl(
  cfg: OpunclehConfig,
  baseUrl: string,
): OpunclehConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[MOONSHOT_DEFAULT_MODEL_REF] = {
    ...models[MOONSHOT_DEFAULT_MODEL_REF],
    alias: models[MOONSHOT_DEFAULT_MODEL_REF]?.alias ?? "Kimi",
  };

  const defaultModel = buildMoonshotProvider().models[0];
  if (!defaultModel) {
    return cfg;
  }

  return applyProviderConfigWithDefaultModel(cfg, {
    agentModels: models,
    providerId: "moonshot",
    api: "openai-completions",
    baseUrl,
    defaultModel,
    defaultModelId: MOONSHOT_DEFAULT_MODEL_ID,
  });
}

export function applyMoonshotConfig(cfg: OpunclehConfig): OpunclehConfig {
  return applyAgentDefaultModelPrimary(
    applyMoonshotProviderConfig(cfg),
    MOONSHOT_DEFAULT_MODEL_REF,
  );
}

export function applyMoonshotConfigCn(cfg: OpunclehConfig): OpunclehConfig {
  return applyAgentDefaultModelPrimary(
    applyMoonshotProviderConfigCn(cfg),
    MOONSHOT_DEFAULT_MODEL_REF,
  );
}
