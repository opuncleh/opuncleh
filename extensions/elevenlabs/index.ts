import { definePluginEntry } from "opuncleh/plugin-sdk/core";
import { buildElevenLabsSpeechProvider } from "opuncleh/plugin-sdk/speech";

export default definePluginEntry({
  id: "elevenlabs",
  name: "ElevenLabs Speech",
  description: "Bundled ElevenLabs speech provider",
  register(api) {
    api.registerSpeechProvider(buildElevenLabsSpeechProvider());
  },
});
