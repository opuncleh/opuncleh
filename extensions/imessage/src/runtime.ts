import type { PluginRuntime } from "opuncleh/plugin-sdk/core";
import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";

const { setRuntime: setIMessageRuntime, getRuntime: getIMessageRuntime } =
  createPluginRuntimeStore<PluginRuntime>("iMessage runtime not initialized");
export { getIMessageRuntime, setIMessageRuntime };
