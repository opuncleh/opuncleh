---
summary: "CLI reference for `opuncleh uninstall` (remove gateway service + local data)"
read_when:
  - You want to remove the gateway service and/or local state
  - You want a dry-run first
title: "uninstall"
---

# `opuncleh uninstall`

Uninstall the gateway service + local data (CLI remains).

```bash
opuncleh backup create
opuncleh uninstall
opuncleh uninstall --all --yes
opuncleh uninstall --dry-run
```

Run `opuncleh backup create` first if you want a restorable snapshot before removing state or workspaces.
