import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildPluginStatusReport } from "./status.js";

const loadConfigMock = vi.fn();
const loadOpunclehPluginsMock = vi.fn();

vi.mock("../config/config.js", () => ({
  loadConfig: () => loadConfigMock(),
}));

vi.mock("./loader.js", () => ({
  loadOpunclehPlugins: (...args: unknown[]) => loadOpunclehPluginsMock(...args),
}));

vi.mock("../agents/agent-scope.js", () => ({
  resolveAgentWorkspaceDir: () => undefined,
  resolveDefaultAgentId: () => "default",
}));

vi.mock("../agents/workspace.js", () => ({
  resolveDefaultAgentWorkspaceDir: () => "/default-workspace",
}));

describe("buildPluginStatusReport", () => {
  beforeEach(() => {
    loadConfigMock.mockReset();
    loadOpunclehPluginsMock.mockReset();
    loadConfigMock.mockReturnValue({});
    loadOpunclehPluginsMock.mockReturnValue({
      plugins: [],
      diagnostics: [],
      channels: [],
      providers: [],
      tools: [],
      hooks: [],
      gatewayHandlers: {},
      cliRegistrars: [],
      services: [],
      commands: [],
    });
  });

  it("forwards an explicit env to plugin loading", () => {
    const env = { HOME: "/tmp/opuncleh-home" } as NodeJS.ProcessEnv;

    buildPluginStatusReport({
      config: {},
      workspaceDir: "/workspace",
      env,
    });

    expect(loadOpunclehPluginsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: {},
        workspaceDir: "/workspace",
        env,
      }),
    );
  });
});
