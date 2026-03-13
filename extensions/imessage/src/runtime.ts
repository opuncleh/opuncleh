import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/compat";
import type { PluginRuntime } from "opuncleh/plugin-sdk/imessage";

const { setRuntime: setIMessageRuntime, getRuntime: getIMessageRuntime } =
  createPluginRuntimeStore<PluginRuntime>("iMessage runtime not initialized");
export { getIMessageRuntime, setIMessageRuntime };
