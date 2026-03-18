import { describe, expect, it } from "vitest";
import { buildPlatformRuntimeLogHints, buildPlatformServiceStartHints } from "./runtime-hints.js";

describe("buildPlatformRuntimeLogHints", () => {
  it("renders launchd log hints on darwin", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "darwin",
        env: {
          OPUNCLEH_STATE_DIR: "/tmp/opuncleh-state",
          OPUNCLEH_LOG_PREFIX: "gateway",
        },
        systemdServiceName: "opuncleh-gateway",
        windowsTaskName: "Opuncleh Gateway",
      }),
    ).toEqual([
      "Launchd stdout (if installed): /tmp/opuncleh-state/logs/gateway.log",
      "Launchd stderr (if installed): /tmp/opuncleh-state/logs/gateway.err.log",
    ]);
  });

  it("renders systemd and windows hints by platform", () => {
    expect(
      buildPlatformRuntimeLogHints({
        platform: "linux",
        systemdServiceName: "opuncleh-gateway",
        windowsTaskName: "Opuncleh Gateway",
      }),
    ).toEqual(["Logs: journalctl --user -u opuncleh-gateway.service -n 200 --no-pager"]);
    expect(
      buildPlatformRuntimeLogHints({
        platform: "win32",
        systemdServiceName: "opuncleh-gateway",
        windowsTaskName: "Opuncleh Gateway",
      }),
    ).toEqual(['Logs: schtasks /Query /TN "Opuncleh Gateway" /V /FO LIST']);
  });
});

describe("buildPlatformServiceStartHints", () => {
  it("builds platform-specific service start hints", () => {
    expect(
      buildPlatformServiceStartHints({
        platform: "darwin",
        installCommand: "opuncleh gateway install",
        startCommand: "opuncleh gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.opuncleh.gateway.plist",
        systemdServiceName: "opuncleh-gateway",
        windowsTaskName: "Opuncleh Gateway",
      }),
    ).toEqual([
      "opuncleh gateway install",
      "opuncleh gateway",
      "launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.opuncleh.gateway.plist",
    ]);
    expect(
      buildPlatformServiceStartHints({
        platform: "linux",
        installCommand: "opuncleh gateway install",
        startCommand: "opuncleh gateway",
        launchAgentPlistPath: "~/Library/LaunchAgents/com.opuncleh.gateway.plist",
        systemdServiceName: "opuncleh-gateway",
        windowsTaskName: "Opuncleh Gateway",
      }),
    ).toEqual([
      "opuncleh gateway install",
      "opuncleh gateway",
      "systemctl --user start opuncleh-gateway.service",
    ]);
  });
});
