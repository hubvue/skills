# Routing Rules

## Node Decision Handling

### continue

Proceed to next stage.

### revise

Pause or route back to the indicated upstream stage. The workflow must record:

- reason for revision
- target stage
- documents that need changes
- questions to resolve

### need_data

Pause workflow. Write missing information into current stage doc and `status.json`.

### stop

Stop workflow. Generate `decision.md` with rejection or defer reason.

## Gate Rules

- Painpoint gate: if painpoint is not real or evidenceLevel is low, prefer `need_data` unless the evidence strongly disproves it.
- Value gate: if value is low, route to `idea_pool` or `deferred`.
- Feasibility gate: if not feasible, try scope reduction before stop.
- Scope gate: if MVP is too large, revise solution or scope.
- Acceptance gate: if cannot be tested, revise scope or solution.
