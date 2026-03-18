import { describe, expect, it } from "vitest";
import {
  ensureOpunclehExecMarkerOnProcess,
  markOpunclehExecEnv,
  OPUNCLEH_CLI_ENV_VALUE,
  OPUNCLEH_CLI_ENV_VAR,
} from "./opuncleh-exec-env.js";

describe("markOpunclehExecEnv", () => {
  it("returns a cloned env object with the exec marker set", () => {
    const env = { PATH: "/usr/bin", OPUNCLEH_CLI: "0" };
    const marked = markOpunclehExecEnv(env);

    expect(marked).toEqual({
      PATH: "/usr/bin",
      OPUNCLEH_CLI: OPUNCLEH_CLI_ENV_VALUE,
    });
    expect(marked).not.toBe(env);
    expect(env.OPUNCLEH_CLI).toBe("0");
  });
});

describe("ensureOpunclehExecMarkerOnProcess", () => {
  it("mutates and returns the provided process env", () => {
    const env: NodeJS.ProcessEnv = { PATH: "/usr/bin" };

    expect(ensureOpunclehExecMarkerOnProcess(env)).toBe(env);
    expect(env[OPUNCLEH_CLI_ENV_VAR]).toBe(OPUNCLEH_CLI_ENV_VALUE);
  });

  it("defaults to mutating process.env when no env object is provided", () => {
    const previous = process.env[OPUNCLEH_CLI_ENV_VAR];
    delete process.env[OPUNCLEH_CLI_ENV_VAR];

    try {
      expect(ensureOpunclehExecMarkerOnProcess()).toBe(process.env);
      expect(process.env[OPUNCLEH_CLI_ENV_VAR]).toBe(OPUNCLEH_CLI_ENV_VALUE);
    } finally {
      if (previous === undefined) {
        delete process.env[OPUNCLEH_CLI_ENV_VAR];
      } else {
        process.env[OPUNCLEH_CLI_ENV_VAR] = previous;
      }
    }
  });
});
