import { transcribeFirstAudio as transcribeFirstAudioImpl } from "opuncleh/plugin-sdk/media-runtime";

type TranscribeFirstAudio = typeof import("opuncleh/plugin-sdk/media-runtime").transcribeFirstAudio;

export async function transcribeFirstAudio(
  ...args: Parameters<TranscribeFirstAudio>
): ReturnType<TranscribeFirstAudio> {
  return await transcribeFirstAudioImpl(...args);
}
