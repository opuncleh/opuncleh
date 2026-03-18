import type { PluginRuntime } from "opuncleh/plugin-sdk/core";
import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";

const { setRuntime: setSignalRuntime, getRuntime: getSignalRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Signal runtime not initialized");
export { getSignalRuntime, setSignalRuntime };
