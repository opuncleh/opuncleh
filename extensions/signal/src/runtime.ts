import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/compat";
import type { PluginRuntime } from "opuncleh/plugin-sdk/signal";

const { setRuntime: setSignalRuntime, getRuntime: getSignalRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Signal runtime not initialized");
export { getSignalRuntime, setSignalRuntime };
