// Narrow plugin-sdk surface for the bundled llm-task plugin.
// Keep this list additive and scoped to symbols used under extensions/llm-task.

export { resolvePreferredOpunclehTmpDir } from "../infra/tmp-opuncleh-dir.js";
export {
  formatThinkingLevels,
  formatXHighModelHint,
  normalizeThinkLevel,
  supportsXHighThinking,
} from "../auto-reply/thinking.js";
export type { AnyAgentTool, OpunclehPluginApi } from "../plugins/types.js";
