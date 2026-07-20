# Artifact Templates

Use these templates to create migration documents quickly.

## Contents

- `00-context.md`
- `01-project-overview.md`
- `02-business-map.md`
- `03-core-flows.md`
- `04-dependency-inventory.md`
- `04-judge-inventory.md`
- `05-system-map.md`
- `06-style-asset-inventory.md`
- `07-diff-matrix.md`
- `07-rulebook.md`
- `07-gap-inventory.md`
- `08-migration-plan.md`
- `08-judge-plan.md`
- `09-module-batches.md`
- `10-adapter-plan.md`
- `11-pilot-scope.md`
- `12-pilot-checklist.md`
- `13-pilot-retro.md`
- `14-execution-log.md`
- `15-open-issues.md`
- `16-verification-checklist.md`
- `17-cleanup-plan.md`
- `18-long-term-governance.md`

## 00-context.md
```md
# Migration Context

## Background
- Old repository:
- New repository:
- Reason for migration:

## Business Case
- Expected gains:
- Cost drivers:
- Why now:
- No-go criteria:

## Migration Posture
- Selected posture: structure-preserving / redesign / incremental / hybrid
- Reason:
- Default work unit:

## Goals
-
-

## Scope
- Included in this migration:
- Not included in this migration:

## Constraints
- Timeline:
- Staffing:
- Business continuity:
- Technical constraints:

## Success Criteria
-
-

## Key Assumptions
- 
- 

## Decision
- Proceed / do not migrate / more evidence required:
- Decision evidence:
```

## 01-project-overview.md
```md
# Project Overview

## Project Purpose

## Tech Stack
- Node:
- Package manager:
- Frontend framework:
- Build tool:
- UI library:
- State management:

## Run and Build
- Install command:
- Dev command:
- Build command:
- Release notes:

## Directory Overview
- src/
- pages/
- components/
- store/
- services/
- styles/
```

## 02-business-map.md
```md
# Business Map

| Module | Route / Entry | Main Function | Core APIs | Special Dependencies | Migration Priority |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
```

## 03-core-flows.md
```md
# Core Flows

## Login Flow
- Entry page:
- Requests:
- State:
- Permissions:

## Home Flow

## List -> Detail Flow

## Submit / Save Flow

## Upload / Download Flow
```

## 04-dependency-inventory.md
```md
# Dependency Inventory

## Globally Registered Components

## Global Mixins / Prototype Injections

## Permissions / Analytics / Monitoring

## Environment Variables

## Implicit Dependencies
```

## 04-judge-inventory.md
```md
# Judge Inventory

## Sources of Executable Truth
| Check / Scenario | Surface | Portable to Target | Cost | Determinism | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Old-system Baseline
- Environment:
- Passing checks:
- Inherited failures:
- Known nondeterminism:

## Coverage Gaps
- Internal-coupled tests that cannot port:
- Missing public-behavior coverage:
- Candidate parity scenarios:
```

## 05-system-map.md
```md
# System and Dependency Map

## Business / Runtime Boundaries
| Boundary | Responsibility | Entry | Dependencies | Risk |
|---|---|---|---|---|
|  |  |  |  |  |

## Migration Ordering
| Unit ID | Unit Type | Scope | Depends On | Target Boundary | Ready Condition |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Cycles and Packaging Constraints
- Cycle:
- Impact:
- Planned boundary handling:

## Evidence
- Deterministic tooling used:
- Manual assumptions:
```

## 06-style-asset-inventory.md
```md
# Style Asset Inventory

## Colors
- Primary:
- Secondary:
- Semantic colors:

## Typography
- Font sizes:
- Font weights:
- Line heights:

## Spacing

## Radius / Shadow / Border

## Component Style Sources
- Button:
- Input:
- Table:
- Modal:

## Theme Variables / Design Token Sources
```

## 07-diff-matrix.md
```md
# Diff Matrix

| Dimension | Old Repository | New Repository | Impact | Suggested Handling | Priority |
|---|---|---|---|---|---|
| Build tool |  |  |  |  |  |
| Routing |  |  |  |  |  |
| State management |  |  |  |  |  |
| Request layer |  |  |  |  |  |
| UI / Styling |  |  |  |  |  |
| Release flow |  |  |  |  |  |
```

## 07-rulebook.md
```md
# Migration Rulebook

## Posture and Scope
- Migration posture:
- Rulebook role: canonical mapping / design decisions / compatibility rules
- Current revision:

## Rules
| Rule ID | Area | Decision | Rationale / Evidence | Scope | Exceptions | Verification |
|---|---|---|---|---|---|---|
| R-001 |  |  |  |  |  |  |

## Amendment Queue
| Proposed Change | Reason | Affected Units | Decision | Target Revision |
|---|---|---|---|---|
|  |  |  |  |  |

## Revision History
| Revision | Date | Change | Reason | Affected Scope |
|---|---|---|---|---|
|  |  |  |  |  |
```

## 07-gap-inventory.md
```md
# Gap Inventory

| Gap ID | Location / Scope | Applicable Rule | Why Default Handling Fails | Evidence | Handling | Verification | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| G-001 |  |  |  |  |  |  |  | open |
```

## 08-migration-plan.md
```md
# Migration Plan

## Overall Strategy
- Migrate first or govern first:
- Parallel old/new repositories:
- Use adapters / compatibility layers:

## Migration Phases
1. 
2. 
3. 

## Pilot Module
- Name:
- Why selected:
- Differences it covers:

## Risks and Mitigation
| Risk | Impact | Mitigation |
|---|---|---|
|  |  |  |
```

## 08-judge-plan.md
```md
# Judge Plan

## Judge Design
- Judge type(s):
- Comparable old/target surface:
- Inputs and environment:
- Expected outputs / assertions:

## Comparator Rules
- Normalization:
- Nondeterminism handling:
- Environment differences:
- Unsupported behavior:

## Validation
- Old baseline result:
- Known-good repeatability result:
- Safe isolated negative control:
- Evidence that the Judge catches breakage:

## Cost Placement
- Per-unit checks:
- Per-batch checks:
- Coordinated expensive checks:
- Operation coordinator:

## Readiness
- State: missing / designed / validated / passing / failing / limited
- Remaining blockers:
```

## 09-module-batches.md
```md
# Module Batches

Allowed statuses: `pending`, `ready`, `in_progress`, `review`, `blocked`, `done`, `revalidation_required`.

| Unit ID | Posture / Type | Scope | Depends On | Owner / Role | Expected Output / Boundary | Rule IDs | Gap IDs | Required Judge Evidence | Status | Completion Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| U-001 |  |  |  |  |  |  |  |  | pending |  |

## Queue Rules
- Readiness derivation:
- Done criteria:
- Reconstruction source:
- Shared operation/result IDs:
```

## 10-adapter-plan.md
```md
# Adapter Plan

| Adapter / Bridge | Why Needed | Old Side Dependency | New Side Target | Temporary or Long-term | Owner | Removal Trigger |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
```

## 11-pilot-scope.md
```md
# Pilot Scope

## Selected Pilot
- Module / route:
- Why this slice:
- Migration posture:
- Process hypothesis:
- Pilot method:
- Risks covered:
- Risks intentionally not covered:

## Inputs
- Existing artifacts:
- Required dependencies:

## Acceptance Criteria
- 
- 

## Rollback Path
- Switch-back mechanism:
- Validation before cutover:

## Output Disposition
- Retain / discard:
- Reason:
```

## 12-pilot-checklist.md
```md
# Pilot Checklist

- [ ] Route and entry integration is complete
- [ ] Request layer is connected
- [ ] State integration is correct
- [ ] Permissions and guards behave correctly
- [ ] Styles are acceptable
- [ ] Analytics and monitoring are validated
- [ ] Rollback path is tested
- [ ] Applicable Rulebook decisions were followed
- [ ] The Judge produced meaningful evidence
- [ ] The queue can be stopped and reconstructed from durable state
- [ ] Independent review was completed
- [ ] Expensive-operation placement was validated where applicable
- [ ] Retain/discard disposition is recorded
```

## 13-pilot-retro.md
```md
# Pilot Retro

## What Worked
- 

## What Broke
- 

## Required Adapters
- 

## Judge and Queue Findings
-

## Rule / Process Amendments
| Amendment | Reason | Affected Units | Revalidation Required |
|---|---|---|---|
|  |  |  |  |

## Recommended Standard Pattern
- 

## Changes to Future Batches
- 
```

## 14-execution-log.md
```md
# Execution Log

| Date | Unit ID | Role | Rule Revision | Operation / Result ID | Output | Review | Judge Evidence | Status | Next Action |
|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  |
```

## 15-open-issues.md
```md
# Open Issues

| Issue | Root-cause Category | Isolated / Systemic | Affected Units | Rule / Judge / Queue Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |
```

## 16-verification-checklist.md
```md
# Verification Checklist

## Judge Health
- Judge state:
- Old-system baseline:
- Repeatability result:
- Safe negative-control result:
- Comparator limitations:

## Parity Summary
- Total checks:
- Passed:
- Regressions:
- Inherited failures:
- Accepted differences:
- Unresolved gaps:

- [ ] Route is reachable
- [ ] Core APIs behave correctly
- [ ] Permissions and guards behave correctly
- [ ] Analytics events are correct
- [ ] Monitoring and error capture are healthy
- [ ] No obvious performance regression
- [ ] Release path is validated
- [ ] Rollback path is validated
- [ ] Old and target systems were evaluated on comparable inputs
- [ ] Inherited failures were classified separately from regressions
- [ ] Every accepted difference has an owner and rationale
```

## 17-cleanup-plan.md
```md
# Cleanup Plan

| Item | Why It Exists | Remove When | Risk If Delayed | Owner | Status |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## Deferred Migration Markers
| Marker / Scope | Reason | Required Fix | Parity Revalidation | Status |
|---|---|---|---|---|
|  |  |  |  |  |
```

## 18-long-term-governance.md
```md
# Long-term Governance

## Deferred Governance Topics
- Naming normalization:
- Directory normalization:
- Design tokens:
- Shared abstractions:

## Proposed Sequence
1. 
2. 
3. 

## Success Metrics
- 
- 

## Artifact Retention
- Rulebook decisions retained for maintenance:
- Gap decisions retained for maintenance:
- Migration-only artifacts to archive:
```
