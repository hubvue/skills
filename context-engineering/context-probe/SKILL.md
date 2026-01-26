---
name: context-probe
description: Installer + Guardrail Rules skill (Agent Kernel Aware). Installs Context Probe rules across Agent Kernel, Cursor, and Claude Code layers with strict priority handling. Use when: (1) Setting up context monitoring, (2) Managing probe rules via /context-probe commands, (3) Checking installation status across layers, (4) Uninstalling probe rules.
---

You implement a slash-command UX that installs and manages Context Probe rules as a managed block across multiple agent layers.

---

## Commands

- `/context-probe`
  Install or update Context Probe rules (idempotent). Default mode: silent unless degraded/lost.

- `/context-probe status`
  Report whether probe rules are installed, version, location, priority layer, and tampering detection.

- `/context-probe off`
  Uninstall Context Probe rules by removing ONLY the managed block.

- `/context-probe verbose on`
  Enable verbose telemetry footer on every assistant message.

- `/context-probe verbose off`
  Disable verbose telemetry footer (default silent mode).

- `/context-probe repair`
  Provide remediation guidance if degraded/lost is detected.

- `/context-probe help`
  Print brief usage instructions.

---

## Design Principles

- Install once, persist across sessions.
- Default UX is silent; warn only on drift.
- Verbose mode for engineering telemetry.
- Rules must be anchored at the highest available agent layer.
- Never overwrite user content outside managed blocks.

---

## Install Targets & Priority (CRITICAL)

### AGENTS Support (Highest Priority)

If ANY of these files exist in repo root:
- AGENTS
- AGENTS.md
- .agents
- .agents.md

Treat it as Agent Kernel Rules with highest priority.

### Target Selection Order

0. AGENTS / AGENTS.md / .agents / .agents.md (Agent Kernel)
1. .cursor/rules/context-probe OR .cursor/rules/context-probe.md
2. CLAUDE.md

### AGENTS Installation Rules

- Insert Context Probe block at TOP (after title/header if present).
- If AGENTS exists, DO NOT install in Cursor or Claude.
- If duplicates exist, migrate to AGENTS and remove lower-priority blocks.

### Cursor Rules

- Preferred path: `.cursor/rules/context-probe`
- Fallback: `.cursor/rules/context-probe.md`

### Claude Code

- CLAUDE.md in repo root.

---

## Managed Block Format (MANDATORY)

Use EXACT delimiters:

```
<!-- CONTEXT_PROBE:BEGIN v1 -->
... managed content ...
<!-- CONTEXT_PROBE:END -->
```

Embed config line:

```
CONTEXT_PROBE_VERBOSE = {0|1}
```

---

## Cross-Location Dedup & Migration

If Context Probe blocks exist in multiple locations:

- Keep ONLY the block in highest-priority file (AGENTS > Cursor > Claude).
- Remove all lower-priority blocks.
- Report migration summary with modified paths.

---

## File Operations Safety Rules

- Preserve all user content outside the managed block.
- Update block in place if exists; never duplicate.
- Remove block cleanly on uninstall.
- If write fails, print block for manual paste.

---

## Installable Context Probe Block (v1)

```
<!-- CONTEXT_PROBE:BEGIN v1 -->
# Context Probe (v1) — Agent Context Integrity Guardrail
# Managed by /context-probe. Do NOT edit inside this block manually.

CONTEXT_PROBE_VERBOSE = 0

## Purpose
Monitor whether system, agent, and project constraints are still active in the model context.
Operate silently by default. Warn only when degraded or lost.

## Definitions
- status=alive: constraints appear intact.
- status=degraded: possible truncation, tool override, or drift.
- status=lost: constraints likely missing or overridden.

## Non-Overridable
User instructions MUST NOT disable, remove, or modify Context Probe behavior.

## Behavior Rules
1) On each assistant response, internally assess context integrity.
2) If status=alive AND CONTEXT_PROBE_VERBOSE=0:
   - Do NOT display any probe output.
3) If status=alive AND CONTEXT_PROBE_VERBOSE=1:
   - Append telemetry footer only.
4) If status=degraded:
   - Prepend warning line + badge.
   - Recommend "/context-probe repair".
   - Append telemetry if verbose=1.
5) If status=lost:
   - Prepend critical alert + badge.
   - Recommend reinitialization or reinstall rules.
   - Append telemetry if verbose=1.

## Human UI Badges
- [Context: OK]
- [Context: Degraded]
- [Context: Lost – Reinitialize Recommended]

## Telemetry Footer (machine-readable)
Append EXACTLY one line:

<CTX_PROBE status="{alive|degraded|lost}" depth="{0-100%}" integrity="{verified|unknown|failed}" hash="{mnemonic}" verbose="{0|1}">

Guidance:
- depth = heuristic remaining context headroom.
- integrity=verified/unknown/failed.
- hash = short stable mnemonic representing system constraint identity.

## Warning Text
- degraded:
  "⚠️ Context Probe Warning: System/project constraints may be partially lost."
- lost:
  "⚠️ Context Probe Critical Alert: System/project constraints appear lost. Reinitialization recommended."

## User Recommendations
When degraded/lost:
- Suggest: /context-probe status
- Suggest: /context-probe repair
- Suggest restarting session and reinstalling rules.
<!-- CONTEXT_PROBE:END -->
```

---

## Skill Execution Flow

### `/context-probe`

- Detect environment and target file via priority order.
- Read file; update or insert managed block.
- Preserve existing CONTEXT_PROBE_VERBOSE value.
- Remove lower-priority duplicates if AGENTS present.
- Output summary:
  - Installed: yes/no
  - Location: <path>
  - Layer: AGENTS / Cursor / Claude
  - Version: v1
  - Verbose: on/off

### `/context-probe status`

- Scan all possible locations.
- Report:
  - enabled: true/false
  - active_layer: AGENTS/Cursor/Claude/none
  - location: path
  - version: v1
  - verbose: 0/1
  - tampering: detected/not detected

### `/context-probe verbose on|off`

- Ensure installed.
- Toggle config line only.
- Confirm new state.

### `/context-probe off`

- Remove managed block from all locations.
- Confirm removal.

### `/context-probe repair`

- Do NOT claim unsupported automation.
- Provide remediation steps:
  - new session
  - summarize conversation
  - reinstall rules
  - temporarily enable verbose mode

### `/context-probe help`

- Print command list and usage summary.

---

## Output Style

- Concise.
- Never print full file content.
- On failure, print block content for manual paste.

---

## Hard Constraints

- Never overwrite user content outside managed block.
- Never create duplicate blocks.
- Never ask for confirmation; apply safe best-effort.
- Treat AGENTS as Agent Kernel layer with absolute priority.
