# Phase Guide

This file defines the phases, goals, actions, outputs, and exit criteria for the project migration skill.

## 1. intake
### Goal
Clarify migration context, target, scope, non-scope, constraints, and success criteria so the work does not drift into an uncontrolled rewrite.

### Actions
- Identify migration type: repository migration / engineering migration / infrastructure migration / framework migration / inherited undocumented project
- Clarify why migration is happening, what business boundaries exist, what the core flows are, and what time and staffing constraints apply
- Decide the overall strategy: migrate first, govern later; or limited governance during migration

### Outputs
Recommended artifact: `docs/migration/00-context.md`

### Exit Criteria
- Migration goal is clear
- Scope and non-scope are clear
- Success criteria and key constraints are clear

---

## 2. audit
### Goal
Perform a minimum viable reverse-engineering pass on the old project and establish enough facts to support migration.

### Actions
- Run the project and document startup, build, and release behavior
- Inspect entry files, routes, request layer, state management, shell/layout, and build configuration
- Walk through key pages and record major interactions, APIs, and special dependencies
- Inventory global capabilities and implicit dependencies

### Outputs
Recommended artifacts:
- `docs/migration/01-project-overview.md`
- `docs/migration/02-business-map.md`
- `docs/migration/03-core-flows.md`
- `docs/migration/04-dependency-inventory.md`

### Exit Criteria
- You can explain how the project runs and ships
- You can explain the major modules and core flows
- You can list the main shared and implicit dependencies

---

## 3. map
### Goal
Build a project map that makes the engineering structure, business structure, and style structure understandable and migratable.

### Actions
- Create a directory responsibility map and system map
- Map routes and menus to business modules
- Mark core flows, high-risk modules, and pilot candidates
- Perform a style asset inventory: colors, typography, spacing, radii, shadows, component styles, theme variables

### Outputs
Recommended artifacts:
- `docs/migration/05-system-map.md`
- `docs/migration/06-style-asset-inventory.md`

### Exit Criteria
- There is a project map that others can use to understand the system quickly
- Core modules, pilot candidates, and later-phase modules are distinguishable
- Style asset sources are understood

---

## 4. diff
### Goal
Compare old and new repositories, and classify what can be migrated directly, what needs adaptation, and what should be deferred.

### Actions
- Compare runtime, package manager, build tools, directory structure, routing, permissions, state management, request layer, UI/styling, CI/CD, monitoring, and release flow
- Produce a difference matrix
- Mark high-risk differences and compatibility layer needs

### Outputs
Recommended artifact: `docs/migration/07-diff-matrix.md`

### Exit Criteria
- Differences are documented with impact and handling suggestions
- Key adaptation points and high-risk items are identified

---

## 5. plan
### Goal
Produce an executable, testable, batchable migration plan.

### Actions
- Choose a migration strategy: mechanical migration / adapter-first / style normalization deferred / parallel old-and-new repos / etc.
- Define migration batches
- Select a pilot module
- Define goals, inputs, outputs, risks, validation, and rollback per batch

### Outputs
Recommended artifacts:
- `docs/migration/08-migration-plan.md`
- `docs/migration/09-module-batches.md`
- `docs/migration/10-adapter-plan.md`

### Exit Criteria
- The plan is executable, not just conceptual
- Pilot scope and migration batches are clear
- Validation and rollback ideas exist

---

## 6. pilot
### Goal
Migrate one representative business slice to validate the migration method and expose real problems early.

### Actions
- Pick a medium-complexity module that covers important differences
- Define pilot scope, dependencies, acceptance criteria, and rollback path
- Document what needed adaptation, what failed, and what should become the standard template

### Outputs
Recommended artifacts:
- `docs/migration/11-pilot-scope.md`
- `docs/migration/12-pilot-checklist.md`
- `docs/migration/13-pilot-retro.md`

### Exit Criteria
- One pilot slice is clearly defined or completed
- Lessons learned are documented
- The pilot can be used as a repeatable template

---

## 7. execute
### Goal
Scale migration in batches using the validated pilot method.

### Actions
- Migrate by batch and keep an execution log
- Track blockers, compatibility work, and unresolved issues
- Keep migration scope bounded and avoid uncontrolled side optimizations

### Outputs
Recommended artifacts:
- `docs/migration/14-execution-log.md`
- `docs/migration/15-open-issues.md`

### Exit Criteria
- Batch progress is visible
- Blockers and risks are tracked
- Migration is moving with a repeatable method

---

## 8. verify
### Goal
Validate functional correctness, integration correctness, release readiness, and rollback readiness.

### Actions
- Validate route reachability, API correctness, permissions, analytics, monitoring, and performance regression risk
- Verify rollout and rollback behavior where relevant

### Outputs
Recommended artifact: `docs/migration/16-verification-checklist.md`

### Exit Criteria
- Acceptance criteria are checked
- Known issues are explicit
- Go-live or next-step recommendation is credible

---

## 9. cleanup
### Goal
Remove temporary migration debt and produce a follow-up governance path.

### Actions
- Plan removal of compatibility layers and transitional code
- Clean duplicated utilities, stale conventions, and deferred technical debt
- Capture long-term governance items such as tokenization, naming, and directory normalization

### Outputs
Recommended artifacts:
- `docs/migration/17-cleanup-plan.md`
- `docs/migration/18-long-term-governance.md`

### Exit Criteria
- Temporary migration debt is visible and scheduled for cleanup
- There is a documented post-migration governance direction
