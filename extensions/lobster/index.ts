import type {
  AnyAgentTool,
  OpunclehPluginApi,
  OpunclehPluginToolFactory,
} from "opuncleh/plugin-sdk/lobster";
import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: OpunclehPluginApi) {
  api.registerTool(
    ((ctx) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createLobsterTool(api) as AnyAgentTool;
    }) as OpunclehPluginToolFactory,
    { optional: true },
  );
}
