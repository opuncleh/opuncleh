#!/usr/bin/env bash
set -euo pipefail

cd /repo

export OPUNCLEH_STATE_DIR="/tmp/opuncleh-test"
export OPUNCLEH_CONFIG_PATH="${OPUNCLEH_STATE_DIR}/opuncleh.json"

echo "==> Build"
pnpm build

echo "==> Seed state"
mkdir -p "${OPUNCLEH_STATE_DIR}/credentials"
mkdir -p "${OPUNCLEH_STATE_DIR}/agents/main/sessions"
echo '{}' >"${OPUNCLEH_CONFIG_PATH}"
echo 'creds' >"${OPUNCLEH_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${OPUNCLEH_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm opuncleh reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${OPUNCLEH_CONFIG_PATH}"
test ! -d "${OPUNCLEH_STATE_DIR}/credentials"
test ! -d "${OPUNCLEH_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${OPUNCLEH_STATE_DIR}/credentials"
echo '{}' >"${OPUNCLEH_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm opuncleh uninstall --state --yes --non-interactive

test ! -d "${OPUNCLEH_STATE_DIR}"

echo "OK"
