---
name: idea-requirement
description: Orchestrate the full evidence-driven workflow that turns a raw idea into a complete requirement by running 12 node skills with document persistence and Web Search evidence.
---

# Idea to Requirement Workflow

## Purpose

This workflow skill orchestrates all 12 node skills in the Idea-to-Requirement pipeline. It turns a raw idea into a complete, evidence-driven requirement document.

## When to Use

Use this skill when the user provides a raw idea and wants a complete requirement pipeline execution, or when an existing idea workspace needs to resume, review, or continue.

## Operating Rules

1. Run node skills in order unless `startStage`, `endStage`, or `skipStages` is provided.
2. Before each node, verify required upstream files exist.
3. After each node, verify stage documents are written.
4. Allow each node to call Web Search according to its research policy.
5. If a node returns `need_data`, pause and write current status.
6. If a node returns `revise`, route back to the relevant upstream node.
7. If a node returns `stop`, write `decision.md` and stop the pipeline.
8. Never discard research; persist evidence into `research/` and `sources/sources.json`.
9. Final output must include `11-requirement.md`, `decision.md`, and `sources/source-summary.md`.

## Required References

- `references/workflow-contract.md`
- `references/stage-order.md`
- `references/routing-rules.md`
- `references/workspace-bootstrap.md`
- `references/final-output-checklist.md`
- `references/workspace-structure.md`
- `references/status-schema.md`
- `references/sources-schema.md`
- `references/research-policy.md`

## Inputs

- `idea`: raw idea text, required for new workflow.
- `workspacePath`: default `.idea-workspace`.
- `mode`: `auto`, `interactive`, or `review`.
- `allowWebSearch`: default `true`.
- `defaultResearchDepth`: default `standard`.
- `stageResearchDepth`: optional overrides.
- `startStage`, `endStage`, `skipStages`: optional workflow control.

## Outputs

- Complete stage document set.
- Complete research document set.
- `sources/sources.json`.
- `11-requirement.md`.
- `decision.md`.
- `status.json`.
