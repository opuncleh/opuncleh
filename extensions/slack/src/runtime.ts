import type { PluginRuntime } from "opuncleh/plugin-sdk/core";
import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";

const { setRuntime: setSlackRuntime, getRuntime: getSlackRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Slack runtime not initialized");
export { getSlackRuntime, setSlackRuntime };
