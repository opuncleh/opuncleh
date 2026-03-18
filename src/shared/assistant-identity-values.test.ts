import { describe, expect, it } from "vitest";
import { coerceIdentityValue } from "./assistant-identity-values.js";

describe("shared/assistant-identity-values", () => {
  it("returns undefined for missing or blank values", () => {
    expect(coerceIdentityValue(undefined, 10)).toBeUndefined();
    expect(coerceIdentityValue("   ", 10)).toBeUndefined();
    expect(coerceIdentityValue(42 as unknown as string, 10)).toBeUndefined();
  });

  it("trims values and preserves strings within the limit", () => {
    expect(coerceIdentityValue("  Opuncleh  ", 20)).toBe("Opuncleh");
    expect(coerceIdentityValue("  Opuncleh  ", 8)).toBe("Opuncleh");
  });

  it("truncates overlong trimmed values at the exact limit", () => {
    expect(coerceIdentityValue("  Opuncleh Assistant  ", 8)).toBe("Opuncleh");
  });

  it("returns an empty string when truncating to a zero-length limit", () => {
    expect(coerceIdentityValue("  Opuncleh  ", 0)).toBe("");
    expect(coerceIdentityValue("  Opuncleh  ", -1)).toBe("OpenCla");
  });
});
