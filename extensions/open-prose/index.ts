import { definePluginEntry, type OpunclehPluginApi } from "opuncleh/plugin-sdk/open-prose";

export default definePluginEntry({
  id: "open-prose",
  name: "OpenProse",
  description: "Plugin-shipped prose skills bundle",
  register(_api: OpunclehPluginApi) {
    // OpenProse is delivered via plugin-shipped skills.
  },
});
