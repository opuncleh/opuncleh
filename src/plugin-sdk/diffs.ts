// Narrow plugin-sdk surface for the bundled diffs plugin.
// Keep this list additive and scoped to symbols used under extensions/diffs.

export type { OpunclehConfig } from "../config/config.js";
export { resolvePreferredOpunclehTmpDir } from "../infra/tmp-opuncleh-dir.js";
export type {
  AnyAgentTool,
  OpunclehPluginApi,
  OpunclehPluginConfigSchema,
  PluginLogger,
} from "../plugins/types.js";
