import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/compat";
import type { PluginRuntime } from "opuncleh/plugin-sdk/matrix";

const { setRuntime: setMatrixRuntime, getRuntime: getMatrixRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Matrix runtime not initialized");
export { getMatrixRuntime, setMatrixRuntime };
