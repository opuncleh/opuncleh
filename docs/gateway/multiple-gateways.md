---
summary: "Run multiple Opuncleh Gateways on one host (isolation, ports, and profiles)"
read_when:
  - Running more than one Gateway on the same machine
  - You need isolated config/state/ports per Gateway
title: "Multiple Gateways"
---

# Multiple Gateways (same host)

Most setups should use one Gateway because a single Gateway can handle multiple messaging connections and agents. If you need stronger isolation or redundancy (e.g., a rescue bot), run separate Gateways with isolated profiles/ports.

## Isolation checklist (required)

- `OPUNCLEH_CONFIG_PATH` — per-instance config file
- `OPUNCLEH_STATE_DIR` — per-instance sessions, creds, caches
- `agents.defaults.workspace` — per-instance workspace root
- `gateway.port` (or `--port`) — unique per instance
- Derived ports (browser/canvas) must not overlap

If these are shared, you will hit config races and port conflicts.

## Recommended: profiles (`--profile`)

Profiles auto-scope `OPUNCLEH_STATE_DIR` + `OPUNCLEH_CONFIG_PATH` and suffix service names.

```bash
# main
opuncleh --profile main setup
opuncleh --profile main gateway --port 18789

# rescue
opuncleh --profile rescue setup
opuncleh --profile rescue gateway --port 19001
```

Per-profile services:

```bash
opuncleh --profile main gateway install
opuncleh --profile rescue gateway install
```

## Rescue-bot guide

Run a second Gateway on the same host with its own:

- profile/config
- state dir
- workspace
- base port (plus derived ports)

This keeps the rescue bot isolated from the main bot so it can debug or apply config changes if the primary bot is down.

Port spacing: leave at least 20 ports between base ports so the derived browser/canvas/CDP ports never collide.

### How to install (rescue bot)

```bash
# Main bot (existing or fresh, without --profile param)
# Runs on port 18789 + Chrome CDC/Canvas/... Ports
opuncleh onboard
opuncleh gateway install

# Rescue bot (isolated profile + ports)
opuncleh --profile rescue onboard
# Notes:
# - workspace name will be postfixed with -rescue per default
# - Port should be at least 18789 + 20 Ports,
#   better choose completely different base port, like 19789,
# - rest of the onboarding is the same as normal

# To install the service (if not happened automatically during onboarding)
opuncleh --profile rescue gateway install
```

## Port mapping (derived)

Base port = `gateway.port` (or `OPUNCLEH_GATEWAY_PORT` / `--port`).

- browser control service port = base + 2 (loopback only)
- canvas host is served on the Gateway HTTP server (same port as `gateway.port`)
- Browser profile CDP ports auto-allocate from `browser.controlPort + 9 .. + 108`

If you override any of these in config or env, you must keep them unique per instance.

## Browser/CDP notes (common footgun)

- Do **not** pin `browser.cdpUrl` to the same values on multiple instances.
- Each instance needs its own browser control port and CDP range (derived from its gateway port).
- If you need explicit CDP ports, set `browser.profiles.<name>.cdpPort` per instance.
- Remote Chrome: use `browser.profiles.<name>.cdpUrl` (per profile, per instance).

## Manual env example

```bash
OPUNCLEH_CONFIG_PATH=~/.opuncleh/main.json \
OPUNCLEH_STATE_DIR=~/.opuncleh-main \
opuncleh gateway --port 18789

OPUNCLEH_CONFIG_PATH=~/.opuncleh/rescue.json \
OPUNCLEH_STATE_DIR=~/.opuncleh-rescue \
opuncleh gateway --port 19001
```

## Quick checks

```bash
opuncleh --profile main status
opuncleh --profile rescue status
opuncleh --profile rescue browser status
```
