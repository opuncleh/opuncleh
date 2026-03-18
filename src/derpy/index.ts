import { derpify, getDerpyWord, getSubstitutionCount } from "./word-subs.js";

export interface DerpyVoiceConfig {
  personalityLevel: "subtle" | "moderate" | "chaos";
  interjections: boolean;
  soundEffects: boolean;
  amplifiers: boolean;
  endings: boolean;
}

export interface DerpyConfig {
  enabled: boolean;
  defaultMode: "text" | "voice";
  voiceTransformProbability: number;
  voice: DerpyVoiceConfig;
}

const defaultConfig: DerpyConfig = {
  enabled: true,
  defaultMode: "text",
  voiceTransformProbability: 0.4,
  voice: {
    personalityLevel: "moderate",
    interjections: true,
    soundEffects: true,
    amplifiers: true,
    endings: true,
  },
};

let currentConfig: DerpyConfig = { ...defaultConfig };

export function configure(config: Partial<DerpyConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

export function getConfig(): DerpyConfig {
  return { ...currentConfig };
}

export function resetConfig(): void {
  currentConfig = { ...defaultConfig };
}

export function transform(text: string, options?: { mode?: "text" | "voice" }): string {
  if (!currentConfig.enabled) return text;
  
  const mode = options?.mode ?? currentConfig.defaultMode;
  
  if (mode === "voice") {
    return transformVoice(text);
  }
  
  return derpify(text);
}

function transformVoice(text: string): string {
  const { voice } = currentConfig;
  let result = text;
  
  if (voice.interjections && Math.random() < currentConfig.voiceTransformProbability) {
    const interjections = ["Oh!", "Hmm,", "Well,", "So,", "Snap!"];
    const pick = interjections[Math.floor(Math.random() * interjections.length)];
    result = `${pick} ${result}`;
  }
  
  if (voice.soundEffects && Math.random() < currentConfig.voiceTransformProbability) {
    const effects = ["*click click*", "*snap*", "*wiggle*"];
    const pick = effects[Math.floor(Math.random() * effects.length)];
    result = `${result} ${pick}`;
  }
  
  return result;
}

export function derpifyMax(text: string): string {
  return derpify(text);
}

export function getStats(): { substitutionCount: number; enabled: boolean } {
  return {
    substitutionCount: getSubstitutionCount(),
    enabled: currentConfig.enabled,
  };
}

export { derpify, getDerpyWord, getSubstitutionCount };
