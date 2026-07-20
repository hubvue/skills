# Status Schema

Use the following structure whenever possible so the phase, state, and next action remain clear.

```md
## Current Status
- Current phase:
- Phase goal:
- Migration posture:
- Inputs:
- Key assumptions:
- Confirmed facts:
- Unknowns to verify:

## Loop State
- Judge state: missing / designed / validated / passing / failing / limited
- Rulebook revision:
- Queue summary: pending / ready / in_progress / review / blocked / done / revalidation_required
- Current operation / result ID:
- Parity summary:
- Systemic issues / affected rules:

## Actions
- 
- 

## Outputs
- Artifact 1:
- Artifact 2:

## Risks
- 
- 

## Exit Criteria
- 
- 

## Next Step
- Recommended next phase:
- Proceed to next phase:
```

---

## Field Notes
### Current phase
Always name the current phase explicitly so there is no ambiguity about workflow position.

### Inputs
State what the phase depends on: user inputs, existing docs, code facts, or assumptions.

### Migration posture
Use `structure-preserving`, `redesign`, `incremental`, or `hybrid`. State the posture per boundary when the migration is hybrid.

### Key assumptions
When information is incomplete, assumptions must be explicit. Do not present guesses as facts.

### Outputs
Outputs should be concrete artifacts such as docs, tables, checklists, plans, or inventories, not only verbal advice.

### Judge state
Use `missing`, `designed`, `validated`, `passing`, `failing`, or `limited`. A Judge is `validated` only after baseline, repeatability, safe negative-control, and comparator checks are complete.

### Queue summary
Use `pending`, `ready`, `in_progress`, `review`, `blocked`, `done`, and `revalidation_required` consistently. Report counts when the queue has multiple units.

### Rulebook revision and systemic issues
Record the rule revision used by active work. When a systemic issue changes a rule, identify affected units and required revalidation explicitly.

### Current operation / result ID
When a shared expensive operation has one coordinator, record the versioned result consumed by workers so evidence is traceable.

### Risks
At minimum, include known risks and risks that still need validation.

### Exit Criteria
Describe what must be true for the phase to count as complete.

### Next Step
If the user did not request a later phase explicitly, recommend one and wait for the user to decide whether to continue.
