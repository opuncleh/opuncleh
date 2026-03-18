import { describe, expect, it } from "vitest";
import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getCommandPositionalsWithRootOptions,
  getCommandPathWithRootOptions,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  isRootHelpInvocation,
  isRootVersionInvocation,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it.each([
    {
      name: "help flag",
      argv: ["node", "opuncleh", "--help"],
      expected: true,
    },
    {
      name: "version flag",
      argv: ["node", "opuncleh", "-V"],
      expected: true,
    },
    {
      name: "normal command",
      argv: ["node", "opuncleh", "status"],
      expected: false,
    },
    {
      name: "root -v alias",
      argv: ["node", "opuncleh", "-v"],
      expected: true,
    },
    {
      name: "root -v alias with profile",
      argv: ["node", "opuncleh", "--profile", "work", "-v"],
      expected: true,
    },
    {
      name: "root -v alias with log-level",
      argv: ["node", "opuncleh", "--log-level", "debug", "-v"],
      expected: true,
    },
    {
      name: "subcommand -v should not be treated as version",
      argv: ["node", "opuncleh", "acp", "-v"],
      expected: false,
    },
    {
      name: "root -v alias with equals profile",
      argv: ["node", "opuncleh", "--profile=work", "-v"],
      expected: true,
    },
    {
      name: "subcommand path after global root flags should not be treated as version",
      argv: ["node", "opuncleh", "--dev", "skills", "list", "-v"],
      expected: false,
    },
  ])("detects help/version flags: $name", ({ argv, expected }) => {
    expect(hasHelpOrVersion(argv)).toBe(expected);
  });

  it.each([
    {
      name: "root --version",
      argv: ["node", "opuncleh", "--version"],
      expected: true,
    },
    {
      name: "root -V",
      argv: ["node", "opuncleh", "-V"],
      expected: true,
    },
    {
      name: "root -v alias with profile",
      argv: ["node", "opuncleh", "--profile", "work", "-v"],
      expected: true,
    },
    {
      name: "subcommand version flag",
      argv: ["node", "opuncleh", "status", "--version"],
      expected: false,
    },
    {
      name: "unknown root flag with version",
      argv: ["node", "opuncleh", "--unknown", "--version"],
      expected: false,
    },
  ])("detects root-only version invocations: $name", ({ argv, expected }) => {
    expect(isRootVersionInvocation(argv)).toBe(expected);
  });

  it.each([
    {
      name: "root --help",
      argv: ["node", "opuncleh", "--help"],
      expected: true,
    },
    {
      name: "root -h",
      argv: ["node", "opuncleh", "-h"],
      expected: true,
    },
    {
      name: "root --help with profile",
      argv: ["node", "opuncleh", "--profile", "work", "--help"],
      expected: true,
    },
    {
      name: "subcommand --help",
      argv: ["node", "opuncleh", "status", "--help"],
      expected: false,
    },
    {
      name: "help before subcommand token",
      argv: ["node", "opuncleh", "--help", "status"],
      expected: false,
    },
    {
      name: "help after -- terminator",
      argv: ["node", "opuncleh", "nodes", "run", "--", "git", "--help"],
      expected: false,
    },
    {
      name: "unknown root flag before help",
      argv: ["node", "opuncleh", "--unknown", "--help"],
      expected: false,
    },
    {
      name: "unknown root flag after help",
      argv: ["node", "opuncleh", "--help", "--unknown"],
      expected: false,
    },
  ])("detects root-only help invocations: $name", ({ argv, expected }) => {
    expect(isRootHelpInvocation(argv)).toBe(expected);
  });

  it.each([
    {
      name: "single command with trailing flag",
      argv: ["node", "opuncleh", "status", "--json"],
      expected: ["status"],
    },
    {
      name: "two-part command",
      argv: ["node", "opuncleh", "agents", "list"],
      expected: ["agents", "list"],
    },
    {
      name: "terminator cuts parsing",
      argv: ["node", "opuncleh", "status", "--", "ignored"],
      expected: ["status"],
    },
  ])("extracts command path: $name", ({ argv, expected }) => {
    expect(getCommandPath(argv, 2)).toEqual(expected);
  });

  it("extracts command path while skipping known root option values", () => {
    expect(
      getCommandPathWithRootOptions(
        ["node", "opuncleh", "--profile", "work", "--no-color", "config", "validate"],
        2,
      ),
    ).toEqual(["config", "validate"]);
  });

  it("extracts routed config get positionals with interleaved root options", () => {
    expect(
      getCommandPositionalsWithRootOptions(
        ["node", "opuncleh", "config", "get", "--log-level", "debug", "update.channel", "--json"],
        {
          commandPath: ["config", "get"],
          booleanFlags: ["--json"],
        },
      ),
    ).toEqual(["update.channel"]);
  });

  it("extracts routed config unset positionals with interleaved root options", () => {
    expect(
      getCommandPositionalsWithRootOptions(
        ["node", "opuncleh", "config", "unset", "--profile", "work", "update.channel"],
        {
          commandPath: ["config", "unset"],
        },
      ),
    ).toEqual(["update.channel"]);
  });

  it("returns null when routed command sees unknown options", () => {
    expect(
      getCommandPositionalsWithRootOptions(
        ["node", "opuncleh", "config", "get", "--mystery", "value", "update.channel"],
        {
          commandPath: ["config", "get"],
          booleanFlags: ["--json"],
        },
      ),
    ).toBeNull();
  });

  it.each([
    {
      name: "returns first command token",
      argv: ["node", "opuncleh", "agents", "list"],
      expected: "agents",
    },
    {
      name: "returns null when no command exists",
      argv: ["node", "opuncleh"],
      expected: null,
    },
    {
      name: "skips known root option values",
      argv: ["node", "opuncleh", "--log-level", "debug", "status"],
      expected: "status",
    },
  ])("returns primary command: $name", ({ argv, expected }) => {
    expect(getPrimaryCommand(argv)).toBe(expected);
  });

  it.each([
    {
      name: "detects flag before terminator",
      argv: ["node", "opuncleh", "status", "--json"],
      flag: "--json",
      expected: true,
    },
    {
      name: "ignores flag after terminator",
      argv: ["node", "opuncleh", "--", "--json"],
      flag: "--json",
      expected: false,
    },
  ])("parses boolean flags: $name", ({ argv, flag, expected }) => {
    expect(hasFlag(argv, flag)).toBe(expected);
  });

  it.each([
    {
      name: "value in next token",
      argv: ["node", "opuncleh", "status", "--timeout", "5000"],
      expected: "5000",
    },
    {
      name: "value in equals form",
      argv: ["node", "opuncleh", "status", "--timeout=2500"],
      expected: "2500",
    },
    {
      name: "missing value",
      argv: ["node", "opuncleh", "status", "--timeout"],
      expected: null,
    },
    {
      name: "next token is another flag",
      argv: ["node", "opuncleh", "status", "--timeout", "--json"],
      expected: null,
    },
    {
      name: "flag appears after terminator",
      argv: ["node", "opuncleh", "--", "--timeout=99"],
      expected: undefined,
    },
  ])("extracts flag values: $name", ({ argv, expected }) => {
    expect(getFlagValue(argv, "--timeout")).toBe(expected);
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "opuncleh", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "opuncleh", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "opuncleh", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it.each([
    {
      name: "missing flag",
      argv: ["node", "opuncleh", "status"],
      expected: undefined,
    },
    {
      name: "missing value",
      argv: ["node", "opuncleh", "status", "--timeout"],
      expected: null,
    },
    {
      name: "valid positive integer",
      argv: ["node", "opuncleh", "status", "--timeout", "5000"],
      expected: 5000,
    },
    {
      name: "invalid integer",
      argv: ["node", "opuncleh", "status", "--timeout", "nope"],
      expected: undefined,
    },
  ])("parses positive integer flag values: $name", ({ argv, expected }) => {
    expect(getPositiveIntFlagValue(argv, "--timeout")).toBe(expected);
  });

  it("builds parse argv from raw args", () => {
    const cases = [
      {
        rawArgs: ["node", "opuncleh", "status"],
        expected: ["node", "opuncleh", "status"],
      },
      {
        rawArgs: ["node-22", "opuncleh", "status"],
        expected: ["node-22", "opuncleh", "status"],
      },
      {
        rawArgs: ["node-22.2.0.exe", "opuncleh", "status"],
        expected: ["node-22.2.0.exe", "opuncleh", "status"],
      },
      {
        rawArgs: ["node-22.2", "opuncleh", "status"],
        expected: ["node-22.2", "opuncleh", "status"],
      },
      {
        rawArgs: ["node-22.2.exe", "opuncleh", "status"],
        expected: ["node-22.2.exe", "opuncleh", "status"],
      },
      {
        rawArgs: ["/usr/bin/node-22.2.0", "opuncleh", "status"],
        expected: ["/usr/bin/node-22.2.0", "opuncleh", "status"],
      },
      {
        rawArgs: ["node24", "opuncleh", "status"],
        expected: ["node24", "opuncleh", "status"],
      },
      {
        rawArgs: ["/usr/bin/node24", "opuncleh", "status"],
        expected: ["/usr/bin/node24", "opuncleh", "status"],
      },
      {
        rawArgs: ["node24.exe", "opuncleh", "status"],
        expected: ["node24.exe", "opuncleh", "status"],
      },
      {
        rawArgs: ["nodejs", "opuncleh", "status"],
        expected: ["nodejs", "opuncleh", "status"],
      },
      {
        rawArgs: ["node-dev", "opuncleh", "status"],
        expected: ["node", "opuncleh", "node-dev", "opuncleh", "status"],
      },
      {
        rawArgs: ["opuncleh", "status"],
        expected: ["node", "opuncleh", "status"],
      },
      {
        rawArgs: ["bun", "src/entry.ts", "status"],
        expected: ["bun", "src/entry.ts", "status"],
      },
    ] as const;

    for (const testCase of cases) {
      const parsed = buildParseArgv({
        programName: "opuncleh",
        rawArgs: [...testCase.rawArgs],
      });
      expect(parsed).toEqual([...testCase.expected]);
    }
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "opuncleh",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "opuncleh", "status"]);
  });

  it("decides when to migrate state", () => {
    const nonMutatingArgv = [
      ["node", "opuncleh", "status"],
      ["node", "opuncleh", "health"],
      ["node", "opuncleh", "sessions"],
      ["node", "opuncleh", "config", "get", "update"],
      ["node", "opuncleh", "config", "unset", "update"],
      ["node", "opuncleh", "models", "list"],
      ["node", "opuncleh", "models", "status"],
      ["node", "opuncleh", "memory", "status"],
      ["node", "opuncleh", "agent", "--message", "hi"],
    ] as const;
    const mutatingArgv = [
      ["node", "opuncleh", "agents", "list"],
      ["node", "opuncleh", "message", "send"],
    ] as const;

    for (const argv of nonMutatingArgv) {
      expect(shouldMigrateState([...argv])).toBe(false);
    }
    for (const argv of mutatingArgv) {
      expect(shouldMigrateState([...argv])).toBe(true);
    }
  });

  it.each([
    { path: ["status"], expected: false },
    { path: ["config", "get"], expected: false },
    { path: ["models", "status"], expected: false },
    { path: ["agents", "list"], expected: true },
  ])("reuses command path for migrate state decisions: $path", ({ path, expected }) => {
    expect(shouldMigrateStateFromPath(path)).toBe(expected);
  });
});
