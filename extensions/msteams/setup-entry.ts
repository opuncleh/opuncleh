import { defineSetupPluginEntry } from "opuncleh/plugin-sdk/core";
import { msteamsPlugin } from "./src/channel.js";

export default defineSetupPluginEntry(msteamsPlugin);
