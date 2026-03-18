import { afterEach, describe, expect, it, vi } from "vitest";

type LoggerModule = typeof import("./logger.js");

const originalGetBuiltinModule = (
  process as NodeJS.Process & { getBuiltinModule?: (id: string) => unknown }
).getBuiltinModule;

async function importBrowserSafeLogger(params?: {
  resolvePreferredOpunclehTmpDir?: ReturnType<typeof vi.fn>;
}): Promise<{
  module: LoggerModule;
  resolvePreferredOpunclehTmpDir: ReturnType<typeof vi.fn>;
}> {
  vi.resetModules();
  const resolvePreferredOpunclehTmpDir =
    params?.resolvePreferredOpunclehTmpDir ??
    vi.fn(() => {
      throw new Error("resolvePreferredOpunclehTmpDir should not run during browser-safe import");
    });

  vi.doMock("../infra/tmp-opuncleh-dir.js", async () => {
    const actual = await vi.importActual<typeof import("../infra/tmp-opuncleh-dir.js")>(
      "../infra/tmp-opuncleh-dir.js",
    );
    return {
      ...actual,
      resolvePreferredOpunclehTmpDir,
    };
  });

  Object.defineProperty(process, "getBuiltinModule", {
    configurable: true,
    value: undefined,
  });

  const module = await import("./logger.js");
  return { module, resolvePreferredOpunclehTmpDir };
}

describe("logging/logger browser-safe import", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("../infra/tmp-opuncleh-dir.js");
    Object.defineProperty(process, "getBuiltinModule", {
      configurable: true,
      value: originalGetBuiltinModule,
    });
  });

  it("does not resolve the preferred temp dir at import time when node fs is unavailable", async () => {
    const { module, resolvePreferredOpunclehTmpDir } = await importBrowserSafeLogger();

    expect(resolvePreferredOpunclehTmpDir).not.toHaveBeenCalled();
    expect(module.DEFAULT_LOG_DIR).toBe("/tmp/opuncleh");
    expect(module.DEFAULT_LOG_FILE).toBe("/tmp/opuncleh/opuncleh.log");
  });

  it("disables file logging when imported in a browser-like environment", async () => {
    const { module, resolvePreferredOpunclehTmpDir } = await importBrowserSafeLogger();

    expect(module.getResolvedLoggerSettings()).toMatchObject({
      level: "silent",
      file: "/tmp/opuncleh/opuncleh.log",
    });
    expect(module.isFileLogLevelEnabled("info")).toBe(false);
    expect(() => module.getLogger().info("browser-safe")).not.toThrow();
    expect(resolvePreferredOpunclehTmpDir).not.toHaveBeenCalled();
  });
});
