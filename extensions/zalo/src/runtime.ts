import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";
import type { PluginRuntime } from "opuncleh/plugin-sdk/zalo";

const { setRuntime: setZaloRuntime, getRuntime: getZaloRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Zalo runtime not initialized");
export { getZaloRuntime, setZaloRuntime };
