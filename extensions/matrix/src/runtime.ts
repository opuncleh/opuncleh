import type { PluginRuntime } from "opuncleh/plugin-sdk/matrix";
import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";

const { setRuntime: setMatrixRuntime, getRuntime: getMatrixRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Matrix runtime not initialized");
export { getMatrixRuntime, setMatrixRuntime };
