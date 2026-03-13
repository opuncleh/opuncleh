import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolvePluginProviders } from "./providers.js";

const loadOpunclehPluginsMock = vi.fn();

vi.mock("./loader.js", () => ({
  loadOpunclehPlugins: (...args: unknown[]) => loadOpunclehPluginsMock(...args),
}));

describe("resolvePluginProviders", () => {
  beforeEach(() => {
    loadOpunclehPluginsMock.mockReset();
    loadOpunclehPluginsMock.mockReturnValue({
      providers: [{ provider: { id: "demo-provider" } }],
    });
  });

  it("forwards an explicit env to plugin loading", () => {
    const env = { OPUNCLEH_HOME: "/srv/opuncleh-home" } as NodeJS.ProcessEnv;

    const providers = resolvePluginProviders({
      workspaceDir: "/workspace/explicit",
      env,
    });

    expect(providers).toEqual([{ id: "demo-provider" }]);
    expect(loadOpunclehPluginsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        workspaceDir: "/workspace/explicit",
        env,
      }),
    );
  });
});
