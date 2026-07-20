# Phase Guide

This file defines the phases, goals, actions, outputs, and exit criteria for the project migration skill.

## 1. intake
### Goal
Clarify migration context, target, scope, non-scope, constraints, and success criteria so the work does not drift into an uncontrolled rewrite.

### Actions
- Identify migration type: repository migration / engineering migration / infrastructure migration / framework migration / inherited undocumented project
- Clarify why migration is happening, what business boundaries exist, what the core flows are, and what time and staffing constraints apply
- Decide the overall strategy: migrate first, govern later; or limited governance during migration
- Record the business case, expected gains, estimated cost drivers, and explicit no-go criteria
- Select a preliminary posture: structure-preserving, redesign, incremental, or hybrid

### Outputs
Recommended artifact: `docs/migration/00-context.md`

### Exit Criteria
- Migration goal is clear
- Scope and non-scope are clear
- Success criteria and key constraints are clear
- The migration case and no-go criteria are explicit; "do not migrate" remains a valid conclusion
- A preliminary migration posture is recorded

---

## 2. audit
### Goal
Perform a minimum viable reverse-engineering pass on the old project and establish enough facts to support migration.

### Actions
- Run the project and document startup, build, and release behavior
- Inspect entry files, routes, request layer, state management, shell/layout, and build configuration
- Walk through key pages and record major interactions, APIs, and special dependencies
- Inventory global capabilities and implicit dependencies
- Classify tests and checks into portable public-behavior coverage versus source-internal coverage
- Record the old-system baseline, inherited failures, nondeterminism, and candidate parity scenarios

### Outputs
Recommended artifacts:
- `docs/migration/01-project-overview.md`
- `docs/migration/02-business-map.md`
- `docs/migration/03-core-flows.md`
- `docs/migration/04-dependency-inventory.md`
- `docs/migration/04-judge-inventory.md`

### Exit Criteria
- You can explain how the project runs and ships
- You can explain the major modules and core flows
- You can list the main shared and implicit dependencies
- Sources of executable truth, baseline failures, and Judge gaps are documented

---

## 3. map
### Goal
Build a project map that makes the engineering structure, business structure, and style structure understandable and migratable.

### Actions
- Create a directory responsibility map and system map
- Map routes and menus to business modules
- Mark core flows, high-risk modules, and pilot candidates
- Perform a style asset inventory: colors, typography, spacing, radii, shadows, component styles, theme variables
- Add dependency ordering, cycles, and target packaging boundaries when they affect execution order
- Prefer deterministic dependency evidence when project scale or graph complexity justifies tooling

### Outputs
Recommended artifacts:
- `docs/migration/05-system-map.md`
- `docs/migration/06-style-asset-inventory.md`

### Exit Criteria
- There is a project map that others can use to understand the system quickly
- Core modules, pilot candidates, and later-phase modules are distinguishable
- Style asset sources are understood
- The migration unit and dependency ordering are justified for the selected posture

---

## 4. diff
### Goal
Compare old and new repositories, and classify what can be migrated directly, what needs adaptation, and what should be deferred.

### Actions
- Compare runtime, package manager, build tools, directory structure, routing, permissions, state management, request layer, UI/styling, CI/CD, monitoring, and release flow
- Produce a difference matrix
- Mark high-risk differences and compatibility layer needs
- Create a Rulebook that resolves ambiguous migration or redesign decisions once
- Create a Gap Inventory for concrete sites where default rules do not apply

### Outputs
Recommended artifacts:
- `docs/migration/07-diff-matrix.md`
- `docs/migration/07-rulebook.md`
- `docs/migration/07-gap-inventory.md`

### Exit Criteria
- Differences are documented with impact and handling suggestions
- Key adaptation points and high-risk items are identified
- Repeated decisions have canonical rules with evidence and verification
- Known non-default sites are searchable and linked to handling rules

---

## 5. plan
### Goal
Produce an executable, testable, batchable migration plan.

### Actions
- Choose a migration strategy: mechanical migration / adapter-first / style normalization deferred / parallel old-and-new repos / etc.
- Define migration batches
- Select a pilot module
- Define goals, inputs, outputs, risks, validation, and rollback per batch
- Design the Judge or parity harness, including old baseline, normalization, repeatability, a safe isolated negative control, and cost placement
- Define the durable queue contract, evidence-based done criteria, independent review topology, and single-agent fallback
- Decide which expensive or shared-state operations need one coordinator

### Outputs
Recommended artifacts:
- `docs/migration/08-migration-plan.md`
- `docs/migration/08-judge-plan.md`
- `docs/migration/09-module-batches.md`
- `docs/migration/10-adapter-plan.md`

### Exit Criteria
- The plan is executable, not just conceptual
- Pilot scope and migration batches are clear
- Validation and rollback ideas exist
- The Judge can evaluate old and target behavior on comparable terms, or its remaining gap is an explicit blocker
- Queue state, done evidence, review roles, and expensive-operation ownership are defined

---

## 6. pilot
### Goal
Stress-test the migration rules, Judge, queue, and review process on representative scope before broad execution.

### Actions
- Choose representative scope that covers important differences without putting the most critical flow at risk
- For structure-preserving work, compare Rulebook-following and independent approaches, then exercise the intended implement-review-fix loop
- For redesign work, adversarially review the design and run a disposable end-to-end rehearsal
- For incremental work, validate integration, progressive exposure, and rollback on a retained business slice
- Evaluate rule obedience, Judge usefulness, queue recovery, independent review, operation placement, and failure classification
- Record whether pilot output is retained or discarded and turn findings into visible rule/process amendments

### Outputs
Recommended artifacts:
- `docs/migration/11-pilot-scope.md`
- `docs/migration/12-pilot-checklist.md`
- `docs/migration/13-pilot-retro.md`

### Exit Criteria
- One pilot slice is clearly defined or completed
- The migration process has been exercised using the selected posture
- Lessons and rule/process amendments are documented
- The retain/discard decision and reasons are explicit
- The revised process is credible enough to fan out or the blocking gaps are clear

---

## 7. execute
### Goal
Scale migration in batches using the validated pilot method.

### Actions
- Migrate by batch and keep an execution log
- Track blockers, compatibility work, and unresolved issues
- Keep migration scope bounded and avoid uncontrolled side optimizations
- Reconstruct ready work from the durable manifest/queue rather than chat history
- Separate implement, independent review, and fix responsibilities
- Run objective checks at unit, batch, or coordinated-operation level according to cost
- Classify repeated failures; amend the producing Rulebook, Judge, queue, or workflow instead of accumulating one-off fixes
- Mark affected completed units `revalidation_required` and selectively regenerate or revalidate them before resuming

### Outputs
Recommended artifacts:
- `docs/migration/14-execution-log.md`
- `docs/migration/15-open-issues.md`

### Exit Criteria
- Batch progress is visible
- Blockers and risks are tracked
- Migration is moving with a repeatable method
- Every `done` unit has output, resolved independent review, and required Judge evidence
- Systemic failures and rule revisions have affected-scope and revalidation evidence

---

## 8. verify
### Goal
Validate functional correctness, integration correctness, release readiness, and rollback readiness.

### Actions
- Validate route reachability, API correctness, permissions, analytics, monitoring, and performance regression risk
- Verify rollout and rollback behavior where relevant
- Run the authoritative Judge against old and target systems on comparable inputs
- Re-run or account for the old baseline so inherited failures are not mislabeled as regressions
- Document result counts, accepted differences, comparator limitations, nondeterminism, and unresolved parity gaps

### Outputs
Recommended artifact: `docs/migration/16-verification-checklist.md`

### Exit Criteria
- Acceptance criteria are checked
- Known issues are explicit
- Go-live or next-step recommendation is credible
- Judge health and old/new parity evidence are recorded
- Every accepted difference has an owner and rationale

---

## 9. cleanup
### Goal
Remove temporary migration debt and produce a follow-up governance path.

### Actions
- Plan removal of compatibility layers and transitional code
- Clean duplicated utilities, stale conventions, and deferred technical debt
- Capture long-term governance items such as tokenization, naming, and directory normalization
- Burn down deferred migration markers with parity revalidation
- Decide which Rulebook and Gap Inventory decisions remain useful as maintenance documentation and which operational artifacts can be archived

### Outputs
Recommended artifacts:
- `docs/migration/17-cleanup-plan.md`
- `docs/migration/18-long-term-governance.md`

### Exit Criteria
- Temporary migration debt is visible and scheduled for cleanup
- There is a documented post-migration governance direction
