import { defineSetupPluginEntry } from "opuncleh/plugin-sdk/core";
import { ircPlugin } from "./src/channel.js";

export default defineSetupPluginEntry(ircPlugin);
