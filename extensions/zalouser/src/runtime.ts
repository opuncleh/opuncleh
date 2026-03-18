import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";
import type { PluginRuntime } from "opuncleh/plugin-sdk/zalouser";

const { setRuntime: setZalouserRuntime, getRuntime: getZalouserRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Zalouser runtime not initialized");
export { getZalouserRuntime, setZalouserRuntime };
