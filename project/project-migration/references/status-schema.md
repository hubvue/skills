# Status Schema

Use the following structure whenever possible so the phase, state, and next action remain clear.

```md
## Current Status
- Current phase:
- Phase goal:
- Inputs:
- Key assumptions:
- Confirmed facts:
- Unknowns to verify:

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

### Key assumptions
When information is incomplete, assumptions must be explicit. Do not present guesses as facts.

### Outputs
Outputs should be concrete artifacts such as docs, tables, checklists, plans, or inventories, not only verbal advice.

### Risks
At minimum, include known risks and risks that still need validation.

### Exit Criteria
Describe what must be true for the phase to count as complete.

### Next Step
If the user did not request a later phase explicitly, recommend one and wait for the user to decide whether to continue.
