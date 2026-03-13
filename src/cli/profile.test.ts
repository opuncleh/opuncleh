import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "opuncleh",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "opuncleh", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "opuncleh", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "opuncleh", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "opuncleh", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "opuncleh", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "opuncleh", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it.each([
    ["--dev first", ["node", "opuncleh", "--dev", "--profile", "work", "status"]],
    ["--profile first", ["node", "opuncleh", "--profile", "work", "--dev", "status"]],
  ])("rejects combining --dev with --profile (%s)", (_name, argv) => {
    const res = parseCliProfileArgs(argv);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join(path.resolve("/home/peter"), ".opuncleh-dev");
    expect(env.OPUNCLEH_PROFILE).toBe("dev");
    expect(env.OPUNCLEH_STATE_DIR).toBe(expectedStateDir);
    expect(env.OPUNCLEH_CONFIG_PATH).toBe(path.join(expectedStateDir, "opuncleh.json"));
    expect(env.OPUNCLEH_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      OPUNCLEH_STATE_DIR: "/custom",
      OPUNCLEH_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.OPUNCLEH_STATE_DIR).toBe("/custom");
    expect(env.OPUNCLEH_GATEWAY_PORT).toBe("19099");
    expect(env.OPUNCLEH_CONFIG_PATH).toBe(path.join("/custom", "opuncleh.json"));
  });

  it("uses OPUNCLEH_HOME when deriving profile state dir", () => {
    const env: Record<string, string | undefined> = {
      OPUNCLEH_HOME: "/srv/opuncleh-home",
      HOME: "/home/other",
    };
    applyCliProfileEnv({
      profile: "work",
      env,
      homedir: () => "/home/fallback",
    });

    const resolvedHome = path.resolve("/srv/opuncleh-home");
    expect(env.OPUNCLEH_STATE_DIR).toBe(path.join(resolvedHome, ".opuncleh-work"));
    expect(env.OPUNCLEH_CONFIG_PATH).toBe(
      path.join(resolvedHome, ".opuncleh-work", "opuncleh.json"),
    );
  });
});

describe("formatCliCommand", () => {
  it.each([
    {
      name: "no profile is set",
      cmd: "opuncleh doctor --fix",
      env: {},
      expected: "opuncleh doctor --fix",
    },
    {
      name: "profile is default",
      cmd: "opuncleh doctor --fix",
      env: { OPUNCLEH_PROFILE: "default" },
      expected: "opuncleh doctor --fix",
    },
    {
      name: "profile is Default (case-insensitive)",
      cmd: "opuncleh doctor --fix",
      env: { OPUNCLEH_PROFILE: "Default" },
      expected: "opuncleh doctor --fix",
    },
    {
      name: "profile is invalid",
      cmd: "opuncleh doctor --fix",
      env: { OPUNCLEH_PROFILE: "bad profile" },
      expected: "opuncleh doctor --fix",
    },
    {
      name: "--profile is already present",
      cmd: "opuncleh --profile work doctor --fix",
      env: { OPUNCLEH_PROFILE: "work" },
      expected: "opuncleh --profile work doctor --fix",
    },
    {
      name: "--dev is already present",
      cmd: "opuncleh --dev doctor",
      env: { OPUNCLEH_PROFILE: "dev" },
      expected: "opuncleh --dev doctor",
    },
  ])("returns command unchanged when $name", ({ cmd, env, expected }) => {
    expect(formatCliCommand(cmd, env)).toBe(expected);
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("opuncleh doctor --fix", { OPUNCLEH_PROFILE: "work" })).toBe(
      "opuncleh --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("opuncleh doctor --fix", { OPUNCLEH_PROFILE: "  jbopuncleh  " })).toBe(
      "opuncleh --profile jbopuncleh doctor --fix",
    );
  });

  it("handles command with no args after opuncleh", () => {
    expect(formatCliCommand("opuncleh", { OPUNCLEH_PROFILE: "test" })).toBe(
      "opuncleh --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm opuncleh doctor", { OPUNCLEH_PROFILE: "work" })).toBe(
      "pnpm opuncleh --profile work doctor",
    );
  });
});
