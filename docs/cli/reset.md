---
summary: "CLI reference for `opuncleh reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `opuncleh reset`

Reset local config/state (keeps the CLI installed).

```bash
opuncleh backup create
opuncleh reset
opuncleh reset --dry-run
opuncleh reset --scope config+creds+sessions --yes --non-interactive
```

Run `opuncleh backup create` first if you want a restorable snapshot before removing local state.
