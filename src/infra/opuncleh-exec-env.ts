export const OPUNCLEH_CLI_ENV_VAR = "OPUNCLEH_CLI";
export const OPUNCLEH_CLI_ENV_VALUE = "1";

export function markOpunclehExecEnv<T extends Record<string, string | undefined>>(env: T): T {
  return {
    ...env,
    [OPUNCLEH_CLI_ENV_VAR]: OPUNCLEH_CLI_ENV_VALUE,
  };
}

export function ensureOpunclehExecMarkerOnProcess(
  env: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  env[OPUNCLEH_CLI_ENV_VAR] = OPUNCLEH_CLI_ENV_VALUE;
  return env;
}
