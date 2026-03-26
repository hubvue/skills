---
name: project-migration
description: "Plan and drive safe old-to-new project or repository migrations with phase-based outputs, risk controls, and migration artifacts. Use when a user needs to: (1) audit an inherited or undocumented project before migration, (2) compare old and new repositories across tooling, architecture, routing, state, request, styling, CI/CD, or release flow, (3) produce migration deliverables such as audits, maps, diff matrices, plans, pilot scopes, adapter plans, risk lists, or verification checklists, (4) execute or update a specific migration phase such as intake, audit, map, diff, plan, pilot, execute, verify, or cleanup."
---

# Project Migration

Treat the request as project migration, repository migration, or engineering-system migration by default. Optimize for business continuity, behavior parity, rollback safety, and controlled scope rather than opportunistic rewrites.

Do not use this skill when the user mainly wants a project handover or successor-facing takeover document without a real migration goal. In those cases, prefer `project-handover-generator`.

## Workflow

Use this default phase order unless the user explicitly narrows the request:

`intake -> audit -> map -> diff -> plan -> pilot -> execute -> verify -> cleanup`

If the user does not specify a phase, complete only the current phase, then stop and present outputs, status, risks, and the recommended next phase.

If the user specifies a phase, complete the minimum prerequisite phases needed to produce a credible result. If phase artifacts already exist, update them instead of restarting.

If the user changes an earlier phase after later-phase work already exists, revise the earlier phase first and then check all affected downstream phases.

## Operating Rules

1. Prefer migration-first, governance-later unless the user explicitly wants a broader rewrite.
2. Audit inherited or undocumented projects before giving large migration execution advice.
3. Split work by business slice, route slice, or flow instead of file type.
4. Prefer adapters, bridge layers, or compatibility layers for major old-vs-new differences before rewriting business logic.
5. Inspect and record hidden dependencies, especially globally registered components, global mixins, prototype injections, env vars, route guards, permission injection, analytics, monitoring, theme variables, upload and download behavior, bootstrap logic, global styles, and `window` injections.
6. State assumptions and unknowns explicitly when information is incomplete.
7. Produce concrete artifacts, preferably under `docs/migration/`, rather than only conversational advice.
8. Report every phase with the current phase, inputs, actions, outputs, exit criteria, risks, and next step.

## Phase Selection

Choose the phase from the user request and repository evidence:

- Use `intake` to clarify scope, goals, constraints, non-scope, and success criteria.
- Use `audit` when documentation is weak or the old project is not yet understood.
- Use `map` to build system maps, route and module maps, and style asset inventories.
- Use `diff` to compare the old and new repositories and classify direct migration, adaptation, and deferral points.
- Use `plan` to create batchable migration plans, pilot scopes, adapters, validation, and rollback design.
- Use `pilot` to validate the migration method on one representative slice.
- Use `execute` to scale migration in batches while tracking blockers and residual risk.
- Use `verify` to validate routes, APIs, permissions, analytics, monitoring, performance, release readiness, and rollback readiness.
- Use `cleanup` to remove transitional debt and define post-migration governance.

Default to `intake` or `audit` first when the user says things like "no documentation", "I don't understand the old project", or "map it first".

## Output Discipline

Use the status structure in `references/status-schema.md` whenever possible.

When producing artifacts, prefer the templates and checklists in:

- `references/phase-guide.md`
- `references/update-rules.md`
- `references/status-schema.md`
- `references/artifact-templates.md`
- `references/migration-checklists.md`
- `references/risk-playbook.md`

When style normalization or token mapping is requested, complete the style asset inventory first before defining token mappings.
