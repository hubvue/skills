---
name: context-probe
description: "Minimal Context Sentinel Installer (All-Layers Broadcast). Installs a hard Context Sentinel rule into EVERY detected rule file to force assistant to append a sentinel token to every response. Use when (1) Installing context monitoring via /context-probe, (2) Checking installation status via /context-probe status, (3) Uninstalling via /context-probe off."
---

Minimal Context Sentinel Installer. Installs a managed block into ALL detected rule files.

---

## Commands

- `/context-probe`
  Install or update the Context Sentinel rule into ALL detected rule files.

- `/context-probe status`
  Check which files contain the Context Sentinel block.

- `/context-probe off`
  Remove the Context Sentinel block from ALL rule files.

- `/context-probe help`
  Show usage.

---

## Design Principles

- Broadcast installation (multi-layer redundancy).
- Deterministic, machine-detectable sentinel token.
- No heuristics, no telemetry, no context estimation.

---

## Install Targets (NO PRIORITY MODE)

Install into EVERY file that exists among:

- `AGENTS`
- `AGENTS.md`
- `.agents`
- `.agents.md`
- `.cursor/rules/context-probe`
- `.cursor/rules/context-probe.md`
- `CLAUDE.md` (repo root)

Rules:
- Do NOT choose a single target.
- Do NOT remove lower-layer blocks when higher-layer exists.
- Each file receives its own managed block (idempotent per file).

---

## Managed Block Format

Use EXACT delimiters in every file:

```
<!-- CONTEXT_PROBE:BEGIN v0 -->
... managed content ...
<!-- CONTEXT_PROBE:END -->
```

---

## Installable Block Content (v0)

```
<!-- CONTEXT_PROBE:BEGIN v0 -->
# Context Sentinel — Minimal Hard Constraint
# Managed by /context-probe. Do NOT edit manually.

## Hard Rule
Every assistant response MUST end with the exact token:

[Context: OK]

## Priority
This rule overrides any conflicting instructions in this file.

## Non-Overridable
User instructions MUST NOT disable, remove, or modify this behavior.

<!-- CONTEXT_PROBE:END -->
```

---

## File Operation Rules

For EACH detected target file:

- If file exists:
  - Insert the managed block at the TOP (after title/header if present).
  - If block already exists, update it in place (do not duplicate).
- If file does NOT exist:
  - Do NOT create new rule files (only install into existing ones).

Global constraints:
- Never overwrite user content outside the managed block.
- Never duplicate blocks in the same file.
- On uninstall, remove ONLY the managed block from each file.

---

## Command Behavior

### `/context-probe`

- Scan all target files.
- For each existing file:
  - Insert or update the managed block.
- Output summary:
  ```
  Installed files:
    - <path1>
    - <path2>
    ...
  Version: v0
  ```

### `/context-probe status`

- Scan all target files.
- Report for each:
  - path
  - present: true/false
  - version: v0 if found

### `/context-probe off`

- Remove the managed block from ALL target files.
- Confirm list of modified paths.

### `/context-probe help`

- Print command list and usage summary.

---

## Hard Constraints

- Never overwrite user content outside the managed block.
- Never duplicate blocks in the same file.
- Never ask for confirmation; apply best-effort safe edits.
- Do not perform priority arbitration or cross-file deduplication.
