import { listSkillCommandsForAgents as listSkillCommandsForAgentsImpl } from "opuncleh/plugin-sdk/reply-runtime";

type ListSkillCommandsForAgents =
  typeof import("opuncleh/plugin-sdk/reply-runtime").listSkillCommandsForAgents;

export function listSkillCommandsForAgents(
  ...args: Parameters<ListSkillCommandsForAgents>
): ReturnType<ListSkillCommandsForAgents> {
  return listSkillCommandsForAgentsImpl(...args);
}
