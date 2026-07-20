# Migration Loop Rules

Use these rules to make migration work verifiable, resumable, and self-correcting. Scale the controls to migration risk and size; do not copy language-port ceremony into every repository move.

## Contents

- [1. Select a Migration Posture](#1-select-a-migration-posture)
- [2. Scale the Controls](#2-scale-the-controls)
- [3. Establish the Judge](#3-establish-the-judge)
- [4. Maintain the Core Artifacts](#4-maintain-the-core-artifacts)
- [5. Stress-test the Process](#5-stress-test-the-process)
- [6. Use a Mechanical Queue](#6-use-a-mechanical-queue)
- [7. Separate Implementation and Review](#7-separate-implementation-and-review)
- [8. Fix the Producing Process](#8-fix-the-producing-process)
- [9. Coordinate Expensive Operations](#9-coordinate-expensive-operations)

## 1. Select a Migration Posture

Choose and record one posture during `intake`. Re-evaluate it when `audit` or `diff` reveals stronger evidence.

| Posture | Default Work Unit | Rule Source | Pilot Method |
|---|---|---|---|
| Structure-preserving | Dependency-ordered file, package, or module | Canonical source-to-target mappings | Compare rule-following and independent translations, then run the production loop on a small batch |
| Redesign | Business module, subsystem, route, or flow | Architecture and design decisions | Adversarially review the design, then run a disposable end-to-end rehearsal |
| Incremental | Business slice, route, or capability | Compatibility, cutover, and rollback rules | Retain a representative pilot and expose it progressively |
| Hybrid | Explicitly defined per boundary | Mapping rules plus architecture decisions | Apply the matching method to each marked boundary |

Use business slices by default for repository, framework, and engineering-system migrations. Use file or package queues only when dependency structure is the real migration boundary, especially for total language ports.

## 2. Scale the Controls

Require for every migration:

- a business case, expected gain, constraints, and no-go criteria
- a migration posture
- objective acceptance evidence or an explicit gap explaining why it does not yet exist
- durable progress state and evidence-based completion
- independent review responsibility
- recurring-failure feedback into rules or workflow
- rollback or switch-back reasoning

Require before broad `execute` work:

- a credible Judge or parity plan
- old-system baseline evidence
- a Rulebook or design-decision source of truth
- a known Gap Inventory
- a process-focused pilot result
- deterministic done criteria for execution units

Use only when justified:

- deterministic dependency-map scripts
- parallel multi-agent fan-out or multiple reviewers
- a centralized build/test daemon
- a dual-translation bakeoff
- a disposable full migration rehearsal

## 3. Establish the Judge

The Judge is the objective mechanism that determines whether migrated behavior is acceptable. It may combine:

- a portable existing test suite
- API, CLI, output, schema, or contract diffs
- compiler or typechecker results
- smoke-test scenarios
- snapshot, visual, performance, or resource comparisons

Manage the Judge across phases:

- `intake`: define observable success signals
- `audit`: classify existing tests, public behavior, internal-coupled tests, baseline failures, and parity candidates
- `plan`: define the Judge, normalization rules, nondeterminism handling, negative control, and cost placement
- `pilot`: prove the Judge evaluates the pilot meaningfully
- `execute`: run affordable checks per unit or batch
- `verify`: run the authoritative old/new comparison and document limitations

Validate the Judge before trusting it:

1. Run it against the old system and document inherited failures.
2. Repeat a known-good run to expose nondeterminism.
3. Confirm it catches a safe negative control using an isolated fixture, mock input, or disposable branch/worktree.
4. Review comparator normalization, environment differences, and unsupported behavior.

Never deliberately break shared, production, or irreplaceable code to test the Judge.

## 4. Maintain the Core Artifacts

### Rulebook

Record every decision that reasonable implementers could make differently. Include a stable rule ID, decision, rationale, evidence, scope, exceptions, verification, and revision history.

- For structure-preserving work, use canonical source-to-target mappings.
- For redesign work, use architecture and design decisions.
- For incremental work, include compatibility, cutover, and rollback rules.

Treat the Rulebook as read-only inside an active concurrent batch. Queue amendments and publish a visible revision between batches.

### Dependency Map / Manifest

Record execution ordering, dependency IDs, cycles, target packaging boundaries, and ready conditions. Prefer deterministic repository-specific tooling when scale or graph complexity justifies it; otherwise document evidence and assumptions explicitly.

### Gap Inventory

Record concrete sites where default rules do not apply or the target system demands information that the source leaves implicit. Include a gap ID, location/scope, applicable rule, evidence, handling, owner, verification, and status.

## 5. Stress-test the Process

The pilot must validate the migration process, not only produce working code.

- Structure-preserving: compare a Rulebook-following result with an independent translation, turn differences into rule decisions, then run the intended implement-review-fix loop on a small representative batch.
- Redesign: attack the design decisions with independent review, then run a disposable end-to-end rehearsal.
- Incremental: validate integration, compatibility, progressive exposure, and rollback on a retained business slice.
- Hybrid: declare which method applies to each boundary before starting.

Evaluate rule obedience, Judge usefulness, queue recovery, review effectiveness, shared-operation placement, and failure classification. Record explicitly whether pilot output is retained or discarded. A disposable pilot succeeds when it improves the process, even if none of its code is kept.

## 6. Use a Mechanical Queue

Use a durable manifest or queue as the source of truth. Each unit should record:

- stable unit ID and unit type
- scope and dependency IDs
- expected output or changed boundary
- applicable rule IDs and gap IDs
- required Judge evidence
- owner or role when relevant
- status and completion evidence

Use these statuses consistently:

`pending -> ready -> in_progress -> review -> done`

Use `blocked` when an external dependency prevents progress and `revalidation_required` when an upstream rule, Judge, or workflow change may invalidate completed evidence.

Derive readiness from durable dependency and status data. Never infer completion from chat history. Output-file existence may be evidence, but a unit is `done` only when its output exists, independent review is resolved, and required Judge evidence passes.

## 7. Separate Implementation and Review

Use distinct responsibilities:

- **Implementer**: follows the Rulebook and produces the unit output and evidence.
- **Reviewer**: receives source evidence, applicable rules, output/diff, and acceptance conditions; searches for violations and regressions.
- **Fixer**: resolves accepted findings and refreshes evidence.
- **Arbiter**: optionally resolves reviewer disagreement or high-risk rule decisions.

Do not use the Implementer's reasoning as proof of correctness. With multi-agent support, use separate contexts. In a single-agent environment, start a fresh review pass with only the source evidence, applicable rules, output/diff, and acceptance conditions.

Scale review depth to risk. Multiple independent reviewers are recommended for high-risk total migrations, not required for every small incremental move.

## 8. Fix the Producing Process

Treat a failure as systemic when the same root cause affects multiple units or independent review shows that the producing rule, Judge, queue logic, or workflow is incomplete.

When a failure is systemic:

1. Record its root-cause category, affected units, and applicable rules.
2. Stop applying the same one-off fix to additional units.
3. Amend the Rulebook, Gap Inventory, Judge, queue logic, or workflow.
4. Identify every pending and completed unit affected by the amendment.
5. Mark affected completed units `revalidation_required`.
6. Regenerate units when the changed rule controls generated structure; otherwise patch or revalidate with explicit evidence.
7. Run a focused stress test of the revised process before resuming the queue.

Do not silently rewrite rule history. Record the revision, reason, affected scope, and required downstream action.

## 9. Coordinate Expensive Operations

Place objective checks according to their measured cost and shared-state risk:

- Run cheap, stateless checks inside each unit loop.
- Assign one operation coordinator to expensive or shared-state builds, full suites, deploys, or environment resets.
- Let workers produce changes and consume versioned operation results instead of triggering the operation independently.
- Have the coordinator batch changes, publish a result ID, and map failures back to queue units.

Use a compiler or build daemon only as an implementation example. Do not require centralized operation ownership when checks are cheap and isolated.
