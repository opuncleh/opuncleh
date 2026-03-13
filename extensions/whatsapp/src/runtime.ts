import { createPluginRuntimeStore } from "opuncleh/plugin-sdk/compat";
import type { PluginRuntime } from "opuncleh/plugin-sdk/whatsapp";

const { setRuntime: setWhatsAppRuntime, getRuntime: getWhatsAppRuntime } =
  createPluginRuntimeStore<PluginRuntime>("WhatsApp runtime not initialized");
export { getWhatsAppRuntime, setWhatsAppRuntime };
