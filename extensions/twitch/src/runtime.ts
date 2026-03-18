import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";
import type { PluginRuntime } from "opuncleh/plugin-sdk/twitch";

const { setRuntime: setTwitchRuntime, getRuntime: getTwitchRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Twitch runtime not initialized");
export { getTwitchRuntime, setTwitchRuntime };
