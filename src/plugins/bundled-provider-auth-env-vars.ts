import ANTHROPIC_MANIFEST from "../../extensions/anthropic/opuncleh.plugin.json" with { type: "json" };
import BYTEPLUS_MANIFEST from "../../extensions/byteplus/opuncleh.plugin.json" with { type: "json" };
import CLOUDFLARE_AI_GATEWAY_MANIFEST from "../../extensions/cloudflare-ai-gateway/opuncleh.plugin.json" with { type: "json" };
import COPILOT_PROXY_MANIFEST from "../../extensions/copilot-proxy/opuncleh.plugin.json" with { type: "json" };
import GITHUB_COPILOT_MANIFEST from "../../extensions/github-copilot/opuncleh.plugin.json" with { type: "json" };
import GOOGLE_MANIFEST from "../../extensions/google/opuncleh.plugin.json" with { type: "json" };
import HUGGINGFACE_MANIFEST from "../../extensions/huggingface/opuncleh.plugin.json" with { type: "json" };
import KILOCODE_MANIFEST from "../../extensions/kilocode/opuncleh.plugin.json" with { type: "json" };
import KIMI_CODING_MANIFEST from "../../extensions/kimi-coding/opuncleh.plugin.json" with { type: "json" };
import MINIMAX_MANIFEST from "../../extensions/minimax/opuncleh.plugin.json" with { type: "json" };
import MISTRAL_MANIFEST from "../../extensions/mistral/opuncleh.plugin.json" with { type: "json" };
import MODELSTUDIO_MANIFEST from "../../extensions/modelstudio/opuncleh.plugin.json" with { type: "json" };
import MOONSHOT_MANIFEST from "../../extensions/moonshot/opuncleh.plugin.json" with { type: "json" };
import NVIDIA_MANIFEST from "../../extensions/nvidia/opuncleh.plugin.json" with { type: "json" };
import OLLAMA_MANIFEST from "../../extensions/ollama/opuncleh.plugin.json" with { type: "json" };
import OPENAI_MANIFEST from "../../extensions/openai/opuncleh.plugin.json" with { type: "json" };
import OPENCODE_GO_MANIFEST from "../../extensions/opencode-go/opuncleh.plugin.json" with { type: "json" };
import OPENCODE_MANIFEST from "../../extensions/opencode/opuncleh.plugin.json" with { type: "json" };
import OPENROUTER_MANIFEST from "../../extensions/openrouter/opuncleh.plugin.json" with { type: "json" };
import QIANFAN_MANIFEST from "../../extensions/qianfan/opuncleh.plugin.json" with { type: "json" };
import QWEN_PORTAL_AUTH_MANIFEST from "../../extensions/qwen-portal-auth/opuncleh.plugin.json" with { type: "json" };
import SGLANG_MANIFEST from "../../extensions/sglang/opuncleh.plugin.json" with { type: "json" };
import SYNTHETIC_MANIFEST from "../../extensions/synthetic/opuncleh.plugin.json" with { type: "json" };
import TOGETHER_MANIFEST from "../../extensions/together/opuncleh.plugin.json" with { type: "json" };
import VENICE_MANIFEST from "../../extensions/venice/opuncleh.plugin.json" with { type: "json" };
import VERCEL_AI_GATEWAY_MANIFEST from "../../extensions/vercel-ai-gateway/opuncleh.plugin.json" with { type: "json" };
import VLLM_MANIFEST from "../../extensions/vllm/opuncleh.plugin.json" with { type: "json" };
import VOLCENGINE_MANIFEST from "../../extensions/volcengine/opuncleh.plugin.json" with { type: "json" };
import XAI_MANIFEST from "../../extensions/xai/opuncleh.plugin.json" with { type: "json" };
import XIAOMI_MANIFEST from "../../extensions/xiaomi/opuncleh.plugin.json" with { type: "json" };
import ZAI_MANIFEST from "../../extensions/zai/opuncleh.plugin.json" with { type: "json" };

type ProviderAuthEnvVarManifest = {
  id?: string;
  providerAuthEnvVars?: Record<string, string[]>;
};

function collectBundledProviderAuthEnvVars(
  manifests: readonly ProviderAuthEnvVarManifest[],
): Record<string, readonly string[]> {
  const entries: Record<string, readonly string[]> = {};
  for (const manifest of manifests) {
    const providerAuthEnvVars = manifest.providerAuthEnvVars;
    if (!providerAuthEnvVars) {
      continue;
    }
    for (const [providerId, envVars] of Object.entries(providerAuthEnvVars)) {
      const normalizedProviderId = providerId.trim();
      const normalizedEnvVars = envVars.map((value) => value.trim()).filter(Boolean);
      if (!normalizedProviderId || normalizedEnvVars.length === 0) {
        continue;
      }
      entries[normalizedProviderId] = normalizedEnvVars;
    }
  }
  return entries;
}

// Read bundled provider auth env metadata from manifests so env-based auth
// lookup stays cheap and does not need to boot plugin runtime code.
export const BUNDLED_PROVIDER_AUTH_ENV_VAR_CANDIDATES = collectBundledProviderAuthEnvVars([
  ANTHROPIC_MANIFEST,
  BYTEPLUS_MANIFEST,
  CLOUDFLARE_AI_GATEWAY_MANIFEST,
  COPILOT_PROXY_MANIFEST,
  GITHUB_COPILOT_MANIFEST,
  GOOGLE_MANIFEST,
  HUGGINGFACE_MANIFEST,
  KILOCODE_MANIFEST,
  KIMI_CODING_MANIFEST,
  MINIMAX_MANIFEST,
  MISTRAL_MANIFEST,
  MODELSTUDIO_MANIFEST,
  MOONSHOT_MANIFEST,
  NVIDIA_MANIFEST,
  OLLAMA_MANIFEST,
  OPENAI_MANIFEST,
  OPENCODE_GO_MANIFEST,
  OPENCODE_MANIFEST,
  OPENROUTER_MANIFEST,
  QIANFAN_MANIFEST,
  QWEN_PORTAL_AUTH_MANIFEST,
  SGLANG_MANIFEST,
  SYNTHETIC_MANIFEST,
  TOGETHER_MANIFEST,
  VENICE_MANIFEST,
  VERCEL_AI_GATEWAY_MANIFEST,
  VLLM_MANIFEST,
  VOLCENGINE_MANIFEST,
  XAI_MANIFEST,
  XIAOMI_MANIFEST,
  ZAI_MANIFEST,
]);
