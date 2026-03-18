import type { OpunclehConfig } from "opuncleh/plugin-sdk/config-runtime";
import { getExecApprovalReplyMetadata } from "opuncleh/plugin-sdk/infra-runtime";
import type { ReplyPayload } from "opuncleh/plugin-sdk/reply-runtime";
import { resolveDiscordAccount } from "./accounts.js";

export function isDiscordExecApprovalClientEnabled(params: {
  cfg: OpunclehConfig;
  accountId?: string | null;
}): boolean {
  const config = resolveDiscordAccount(params).config.execApprovals;
  return Boolean(config?.enabled && (config.approvers?.length ?? 0) > 0);
}

export function shouldSuppressLocalDiscordExecApprovalPrompt(params: {
  cfg: OpunclehConfig;
  accountId?: string | null;
  payload: ReplyPayload;
}): boolean {
  return (
    isDiscordExecApprovalClientEnabled(params) &&
    getExecApprovalReplyMetadata(params.payload) !== null
  );
}
