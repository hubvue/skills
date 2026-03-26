# Artifact Templates

Use these templates to create migration documents quickly.

## 00-context.md
```md
# Migration Context

## Background
- Old repository:
- New repository:
- Reason for migration:

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

## 09-module-batches.md
```md
# Module Batches

| Batch | Business Scope | Included Modules / Routes | Key Differences Covered | Dependencies | Validation Focus | Status |
|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |
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

## Recommended Standard Pattern
- 

## Changes to Future Batches
- 
```

## 14-execution-log.md
```md
# Execution Log

| Date | Batch | Scope | Progress | Blockers | Decision | Next Action |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
```

## 15-open-issues.md
```md
# Open Issues

| Issue | Type | Affected Scope | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
```

## 16-verification-checklist.md
```md
# Verification Checklist

- [ ] Route is reachable
- [ ] Core APIs behave correctly
- [ ] Permissions and guards behave correctly
- [ ] Analytics events are correct
- [ ] Monitoring and error capture are healthy
- [ ] No obvious performance regression
- [ ] Release path is validated
- [ ] Rollback path is validated
```

## 17-cleanup-plan.md
```md
# Cleanup Plan

| Item | Why It Exists | Remove When | Risk If Delayed | Owner | Status |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
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
```
