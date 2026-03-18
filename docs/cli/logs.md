---
summary: "CLI reference for `opuncleh logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `opuncleh logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
opuncleh logs
opuncleh logs --follow
opuncleh logs --json
opuncleh logs --limit 500
opuncleh logs --local-time
opuncleh logs --follow --local-time
```

Use `--local-time` to render timestamps in your local timezone.
