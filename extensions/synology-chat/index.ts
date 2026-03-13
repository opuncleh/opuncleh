import type { OpunclehPluginApi } from "opuncleh/plugin-sdk/synology-chat";
import { emptyPluginConfigSchema } from "opuncleh/plugin-sdk/synology-chat";
import { createSynologyChatPlugin } from "./src/channel.js";
import { setSynologyRuntime } from "./src/runtime.js";

const plugin = {
  id: "synology-chat",
  name: "Synology Chat",
  description: "Native Synology Chat channel plugin for Opuncleh",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpunclehPluginApi) {
    setSynologyRuntime(api.runtime);
    api.registerChannel({ plugin: createSynologyChatPlugin() });
  },
};

export default plugin;
