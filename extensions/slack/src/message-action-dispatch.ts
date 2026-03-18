import { handleSlackMessageAction as handleSlackMessageActionImpl } from "opuncleh/plugin-sdk/slack";

type HandleSlackMessageAction = typeof import("opuncleh/plugin-sdk/slack").handleSlackMessageAction;

export async function handleSlackMessageAction(
  ...args: Parameters<HandleSlackMessageAction>
): ReturnType<HandleSlackMessageAction> {
  return await handleSlackMessageActionImpl(...args);
}
