import { describe, expect, it } from "vitest";
import { resolveIrcInboundTarget } from "./monitor.js";

describe("irc monitor inbound target", () => {
  it("keeps channel target for group messages", () => {
    expect(
      resolveIrcInboundTarget({
        target: "#opuncleh",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: true,
      target: "#opuncleh",
      rawTarget: "#opuncleh",
    });
  });

  it("maps DM target to sender nick and preserves raw target", () => {
    expect(
      resolveIrcInboundTarget({
        target: "opuncleh-bot",
        senderNick: "alice",
      }),
    ).toEqual({
      isGroup: false,
      target: "alice",
      rawTarget: "opuncleh-bot",
    });
  });

  it("falls back to raw target when sender nick is empty", () => {
    expect(
      resolveIrcInboundTarget({
        target: "opuncleh-bot",
        senderNick: " ",
      }),
    ).toEqual({
      isGroup: false,
      target: "opuncleh-bot",
      rawTarget: "opuncleh-bot",
    });
  });
});
