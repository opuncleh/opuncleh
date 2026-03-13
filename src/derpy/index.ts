/**
 * Opuncleh Derpy Module
 * 
 * The core transformation engine that gives Opuncleh its distinctive voice.
 * Supports two modes:
 * 
 * TEXT MODE: Intentionally misspelled phonetic English for chat/text channels
 *   - "The function works correctly" → "Teh funktion werks correktly"
 * 
 * VOICE MODE: TTS-friendly personality for voice/audio channels
 *   - Adds interjections, sound effects, and emotional amplifiers
 *   - Words remain correctly spelled for proper TTS pronunciation
 *   - "The function works" → "Oh! The function works so great! *snap snap*"
 */

import { derpify, getSubstitutionCount } from "./word-subs.js";

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

export type TransformMode = "text" | "voice";
export type VoicePersonalityLevel = "subtle" | "moderate" | "chaos";

export interface VoiceConfig {
  /** How much personality to add: subtle, moderate, or chaos */
  personalityLevel: VoicePersonalityLevel;
  /** Add interjections like "Oh!", "Hmm...", "Well..." */
  interjections: boolean;
  /** Add sound effects like "*snap snap*", "*click click*" */
  soundEffects: boolean;
  /** Add word amplifiers like "very", "so", "really" */
  amplifiers: boolean;
  /** Add sentence endings like "you know?", "right?" */
  endings: boolean;
}

export interface DerpyConfig {
  /** Whether derpy mode is enabled globally */
  enabled: boolean;
  /** Default transform mode */
  defaultMode: TransformMode;
  /** Voice mode configuration */
  voice: VoiceConfig;
  /** Probability of applying voice transformations (0-1) */
  voiceTransformProbability: number;
}

export interface TransformOptions {
  /** Override the default transform mode */
  mode?: TransformMode;
  /** Override voice personality level */
  voiceLevel?: VoicePersonalityLevel;
}

// ═══════════════════════════════════════════════════════════════════
// DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_CONFIG: DerpyConfig = {
  enabled: true,
  defaultMode: "text",
  voice: {
    personalityLevel: "moderate",
    interjections: true,
    soundEffects: true,
    amplifiers: true,
    endings: true,
  },
  voiceTransformProbability: 0.4,
};

let currentConfig: DerpyConfig = { ...DEFAULT_CONFIG };

// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

/**
 * Configure the derpy module
 */
export function configure(config: Partial<DerpyConfig>): void {
  currentConfig = {
    ...currentConfig,
    ...config,
    voice: {
      ...currentConfig.voice,
      ...(config.voice ?? {}),
    },
  };
}

/**
 * Get current configuration
 */
export function getConfig(): DerpyConfig {
  return { ...currentConfig };
}

/**
 * Reset to default configuration
 */
export function resetConfig(): void {
  currentConfig = { ...DEFAULT_CONFIG };
}

// ═══════════════════════════════════════════════════════════════════
// VOICE MODE DATA
// ═══════════════════════════════════════════════════════════════════

const INTERJECTIONS = {
  subtle: ["Oh,", "Well,", "So,", "Hmm,", "Ah,"],
  moderate: ["Oh!", "Ooh!", "Hmm...", "Well well,", "Hey!", "Snap!", "Okie,"],
  chaos: ["SNAP SNAP!", "OOH OOH!", "YAAAY!", "WOW WOW!", "OH BOY!", "HENLO!", "CLICKETY CLICK!"],
};

const SOUND_EFFECTS = {
  subtle: ["*click*", "*snap*"],
  moderate: ["*snap snap*", "*click click*", "*wiggle*", "*happy clicking*"],
  chaos: ["*SNAP SNAP SNAP*", "*EXCITED CLICKING*", "*WIGGLES ANTENNAE*", "*DOES A LITTLE DANCE*", "*SCUTTLES HAPPILY*"],
};

const AMPLIFIERS = {
  subtle: ["quite", "rather", "pretty"],
  moderate: ["very", "so", "really", "super"],
  chaos: ["EXTREMELY", "INCREDIBLY", "AMAZINGLY", "WONDERFULLY", "FANTASTICALLY"],
};

const SENTENCE_ENDINGS = {
  subtle: ["you know?", "right?", "I think."],
  moderate: ["you know?", "right?", "isn't it great?", "so exciting!", "yay!"],
  chaos: ["ISN'T THAT AMAZING?!", "SO COOL RIGHT?!", "YAAAY!", "I'M SO HAPPY!", "THIS IS THE BEST!"],
};

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shouldApply(probability: number): boolean {
  return Math.random() < probability;
}

// ═══════════════════════════════════════════════════════════════════
// TEXT MODE TRANSFORMATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Transform text using derpy misspellings (for text/chat channels)
 */
export function transformText(text: string): string {
  if (!currentConfig.enabled) return text;
  return derpify(text);
}

// ═══════════════════════════════════════════════════════════════════
// VOICE MODE TRANSFORMATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Transform text for voice/TTS output (personality without misspellings)
 */
export function transformVoice(text: string, level?: VoicePersonalityLevel): string {
  if (!currentConfig.enabled) return text;
  
  const personalityLevel = level ?? currentConfig.voice.personalityLevel;
  const config = currentConfig.voice;
  const prob = currentConfig.voiceTransformProbability;
  
  // Process sentence by sentence
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  const transformed = sentences.map((sentence, index) => {
    let result = sentence;
    
    // Add interjection at start of first sentence or randomly
    if (config.interjections && (index === 0 || shouldApply(prob * 0.3))) {
      if (shouldApply(prob)) {
        const interjection = randomChoice(INTERJECTIONS[personalityLevel]);
        result = `${interjection} ${result}`;
      }
    }
    
    // Add amplifiers to adjectives/adverbs
    if (config.amplifiers && shouldApply(prob)) {
      const amplifier = randomChoice(AMPLIFIERS[personalityLevel]);
      // Insert before common adjectives
      result = result.replace(
        /\b(good|great|nice|cool|awesome|bad|difficult|easy|important|interesting)\b/gi,
        `${amplifier} $1`
      );
    }
    
    // Add sound effect in middle or end
    if (config.soundEffects && shouldApply(prob * 0.5)) {
      const effect = randomChoice(SOUND_EFFECTS[personalityLevel]);
      if (shouldApply(0.5)) {
        // Add at end before punctuation
        result = result.replace(/([.!?])$/, ` ${effect}$1`);
      } else {
        // Add after a comma or in middle
        const commaPos = result.indexOf(",");
        if (commaPos > 0) {
          result = result.slice(0, commaPos + 1) + ` ${effect}` + result.slice(commaPos + 1);
        }
      }
    }
    
    // Replace ending with personality ending
    if (config.endings && shouldApply(prob * 0.4)) {
      const ending = randomChoice(SENTENCE_ENDINGS[personalityLevel]);
      if (result.endsWith(".")) {
        result = result.slice(0, -1) + ", " + ending;
      }
    }
    
    return result;
  });
  
  return transformed.join(" ");
}

/**
 * Transform text specifically for voice output
 * Alias for transformVoice for semantic clarity
 */
export function transformForVoice(text: string): string {
  return transformVoice(text);
}

// ═══════════════════════════════════════════════════════════════════
// MAIN TRANSFORM FUNCTION
// ═══════════════════════════════════════════════════════════════════

/**
 * Transform text according to the specified or default mode
 * 
 * @param text - The text to transform
 * @param options - Optional transform configuration
 * @returns Transformed text
 * 
 * @example
 * // Text mode (default)
 * transform("The function works correctly")
 * // → "Teh funktion werks correktly"
 * 
 * @example
 * // Voice mode
 * transform("The function works correctly", { mode: "voice" })
 * // → "Oh! The function works very correctly, you know?"
 */
export function transform(text: string, options?: TransformOptions): string {
  if (!currentConfig.enabled) return text;
  if (!text || typeof text !== "string") return text;
  
  const mode = options?.mode ?? currentConfig.defaultMode;
  
  switch (mode) {
    case "voice":
      return transformVoice(text, options?.voiceLevel);
    case "text":
    default:
      return transformText(text);
  }
}

// ═══════════════════════════════════════════════════════════════════
// UTILITY EXPORTS
// ═══════════════════════════════════════════════════════════════════

/**
 * Maximum derpification - applies all transformations
 * Used for special occasions or when maximum chaos is desired
 */
export function derpifyMax(text: string): string {
  // First apply text transformations
  let result = transformText(text);
  // Then add voice personality at chaos level
  result = transformVoice(result, "chaos");
  return result;
}

/**
 * Get stats about the derpy module
 */
export function getStats(): {
  wordSubstitutionCount: number;
  enabled: boolean;
  defaultMode: TransformMode;
  voiceLevel: VoicePersonalityLevel;
} {
  return {
    wordSubstitutionCount: getSubstitutionCount(),
    enabled: currentConfig.enabled,
    defaultMode: currentConfig.defaultMode,
    voiceLevel: currentConfig.voice.personalityLevel,
  };
}

// Re-export word substitution utilities
export { derpify, getDerpyWord, getSubstitutionCount } from "./word-subs.js";
