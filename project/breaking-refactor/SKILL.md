---
name: breaking-refactor
description: "Plan, execute, and verify intentional breaking refactors that replace an existing design without preserving runtime backward compatibility. Use when a user explicitly authorizes incompatible changes inside an owned scope and needs to: (1) replace APIs, modules, architecture, data models, schemas, events, configuration, or CLI contracts, (2) update every in-scope consumer in one coordinated change, (3) remove deprecated code, adapters, fallbacks, dual paths, or temporary compatibility layers, or (4) produce impact analysis, a cutover plan, and evidence that the legacy design is gone. Do not use for public or independently deployed contracts whose consumers cannot all be coordinated, unless the user explicitly defines the external cutover."
---

# Breaking Refactor

Replace the old design with one canonical design. Treat incompatibility as an explicit engineering decision, not as permission to skip safety, evidence, data handling, or validation.

## Establish the Refactor Contract

Before editing, identify:

- the design flaw or constraint the refactor must remove;
- the owned scope and every consumer expected to change;
- the contracts that may break: code APIs, types, storage, serialized data, events, routes, configuration, CLI, tests, fixtures, and documentation;
- the behavior that must remain unchanged;
- the intended cutover and validation commands.

Proceed without another question when the repository and request establish these facts. Stop and request direction when a consumer is outside the authorized scope, production data may be destroyed, an external contract has no coordinated cutover, or the target design depends on a material product decision.

Do not equate “no backward compatibility” with “no migration.” Allow one-time schema or data conversion needed for a safe cutover. Do not keep a permanent runtime compatibility path unless the user changes the refactor contract.

## Workflow

### 1. Baseline the Current Design

Inspect repository rules and the working tree first. Preserve unrelated changes.

Build an evidence-backed impact map using definitions, callers, imports, routes, schemas, fixtures, tests, generated code, documentation, and deployment configuration. Prefer structural or graph-based code discovery when available. Record unknown consumers instead of assuming they do not exist.

Capture the relevant baseline behavior and verification commands before changing code. Read `references/refactor-strategy.md` for scope and cutover choices.

### 2. Define the Target Design

Describe one canonical replacement:

- responsibilities and boundaries;
- new contracts and invariants;
- ownership of data and side effects;
- explicit breaking-change inventory;
- caller conversion order;
- data cutover and rollback or forward-fix strategy, when applicable;
- proof required for completion.

Keep the target no larger than needed to remove the stated design problem. Do not bundle unrelated cleanup.

For a planning request, create only analysis and plan artifacts. For an implementation request, continue through validation and cleanup.

### 3. Execute One-Way

Implement the new contract, update every in-scope consumer, and remove the superseded contract in the same coordinated change. Keep the repository buildable at meaningful checkpoints when practical.

Prefer direct consumer changes over wrappers. Remove obsolete exports, files, types, flags, branches, fixtures, tests, and documentation. Regenerate derived artifacts from their source rather than hand-editing generated output.

Do not add:

- old-to-new forwarding wrappers;
- deprecated aliases kept “for now”;
- runtime mode switches between old and new behavior;
- silent fallbacks to the old model;
- duplicate sources of truth;
- broad exception handling that hides incomplete migration.

Read `references/breaking-change-patterns.md` for contract-specific execution patterns and `references/anti-patterns.md` when reviewing proposed transition code.

### 4. Validate the Cutover

Validate in layers, using the narrowest relevant checks first and the full project checks last:

1. Run focused tests for the changed contract and critical behavior.
2. Run type checking, linting, build, and repository test commands that cover all affected consumers.
3. Search for old symbols, imports, paths, flags, schema fields, event names, fixtures, comments, and documentation.
4. Inspect the final dependency or call graph for residual consumers.
5. Review the diff for accidental compatibility code, scope creep, and unrelated formatting churn.
6. Exercise data conversion and rollback or forward-fix procedures when data or schema changes are involved.

Use `references/validation-checklist.md`; adapt it to the repository rather than claiming unavailable checks passed.

### 5. Report Completion

Report:

- the old contract removed and the replacement introduced;
- consumers changed;
- data or operational cutover performed;
- files or modules deleted;
- validation commands and results;
- remaining risks, unknown consumers, or deferred work.

Do not call the refactor complete while a legacy runtime path remains, required consumers are unconverted, or required validation is failing.

## Artifacts

Create artifacts only when they improve coordination, auditability, or handoff. Default to `docs/refactor/` unless the repository defines another location.

- Copy `templates/refactor-analysis.md` for the current-state impact analysis.
- Copy `templates/refactor-plan.md` for the target design and execution plan.
- Copy `templates/breaking-changes.md` for the final incompatible-change record.

Update an existing artifact instead of creating a duplicate. Keep claims tied to repository evidence.
