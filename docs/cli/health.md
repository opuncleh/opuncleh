---
summary: "CLI reference for `opuncleh health` (gateway health endpoint via RPC)"
read_when:
  - You want to quickly check the running Gateway’s health
title: "health"
---

# `opuncleh health`

Fetch health from the running Gateway.

```bash
opuncleh health
opuncleh health --json
opuncleh health --verbose
```

Notes:

- `--verbose` runs live probes and prints per-account timings when multiple accounts are configured.
- Output includes per-agent session stores when multiple agents are configured.
