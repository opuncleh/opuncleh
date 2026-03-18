import type { PluginRuntime } from "opuncleh/plugin-sdk/msteams";
import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/runtime-store";

const { setRuntime: setMSTeamsRuntime, getRuntime: getMSTeamsRuntime } =
  createPluginRuntimeStore<PluginRuntime>("MSTeams runtime not initialized");
export { getMSTeamsRuntime, setMSTeamsRuntime };
