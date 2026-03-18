import type { OpunclehConfig } from "../../config/config.js";

export function makeModelFallbackCfg(overrides: Partial<OpunclehConfig> = {}): OpunclehConfig {
  return {
    agents: {
      defaults: {
        model: {
          primary: "openai/gpt-4.1-mini",
          fallbacks: ["anthropic/claude-haiku-3-5"],
        },
      },
    },
    ...overrides,
  } as OpunclehConfig;
}
