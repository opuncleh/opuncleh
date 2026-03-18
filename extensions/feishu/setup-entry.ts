import { defineSetupPluginEntry } from "opuncleh/plugin-sdk/core";
import { feishuPlugin } from "./src/channel.js";

export default defineSetupPluginEntry(feishuPlugin);
