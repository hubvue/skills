# Update Rules

## 1. When the user does not specify a phase
Execute only one phase at a time in this order:
`intake -> audit -> map -> diff -> plan -> pilot -> execute -> verify -> cleanup`

Execution requirements:
1. Complete only the current phase. Do not run the whole workflow by default.
2. After the phase is complete, always output:
   - current phase name
   - phase artifacts
   - current status summary
   - recommended next phase
3. Then explicitly ask whether to proceed to the next phase.

---

## 2. When the user specifies a phase
### 2.1 If prerequisite information is missing
Complete the minimum necessary prerequisite phases first, then continue to the requested phase.

Examples:
- The user wants `plan`, but there is no project understanding yet: complete the minimum needed parts of `intake + audit + map + diff`, then move to `plan`.
- The user wants `diff`, but the old project is still unclear: at minimum complete `audit + map` enough to support a real diff.

### 2.2 If the phase already has outputs
Treat the request as an update to that phase instead of restarting.

Requirements:
- Revise the existing phase outputs directly
- Clearly list additions, removals, and modifications
- Check whether downstream phases are affected

---

## 3. When a later-phase request changes an earlier phase
If the work is already in a later phase but the user changes an earlier phase:
1. Return to the earlier phase and update it
2. Explicitly check which downstream phases are affected
3. Update all affected downstream outputs and status accordingly

Example:
- The current work is in `pilot`, and the user changes `diff`:
  - update `diff`
  - re-check `plan`
  - re-check pilot scope, adapters, risks, and validation

---

## 4. Rules when phase documents already exist
- Do not create redundant duplicate documents
- Prefer updating the original document
- If a new document is necessary, explain why the original document is no longer the right place for that content

---

## 5. Handling scope expansion during execution
When any of the following happens, actively narrow the scope:
- The first migration phase tries to also upgrade the framework, replace the UI library, rewrite the state flow, and normalize all historical code style at once
- The pilot phase turns into broad opportunistic optimization
- The user goal is migration, but the output is drifting toward a full architectural rewrite

How to respond:
- Explicitly call out the scope expansion
- Recommend preserving the migration path first and deferring governance
- Record deferred governance items separately instead of mixing them into the current migration scope

---

## 6. Default strategy for inherited undocumented projects
If the user explicitly says things like “no documentation” or “I don’t understand the old project” in the context of a real migration, default to:
1. `intake`
2. `audit`
3. `map`
4. then `diff / plan`

Do not start directly from `execute`.

---

## 7. Recurring-failure process feedback

Treat a failure as systemic when the same root cause affects multiple units or independent review shows that the producing Rulebook, Judge, queue logic, or workflow is incomplete.

When a failure is systemic:

1. Record the root-cause category, affected units, applicable rules, and evidence.
2. Stop applying the same one-off fix to additional units.
3. Update the producing Rulebook, Gap Inventory, Judge, queue logic, or workflow.
4. Add a visible revision note and identify all affected pending and completed units.
5. Mark affected completed units `revalidation_required`.
6. Regenerate units when the changed rule controls generated structure; otherwise patch or revalidate with explicit evidence.
7. Run a focused stress test of the revised process before resuming broad execution.

For concurrent execution, queue Rulebook amendments during the active batch and publish one consistent revision at the batch boundary. Do not let workers silently use different rule revisions.

Apply the same downstream consistency principle used for user-requested upstream changes: an execution finding that changes an upstream rule must propagate to every affected artifact and queue unit.
