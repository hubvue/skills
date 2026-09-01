---
name: minimal
description: Use for code implementation, bug fixes, refactoring, UI or data-logic changes, tests, and code review. Before every meaningful action, decide whether it is necessary, overcomplicated, or replaceable by a simpler correct approach. Enforce the smallest correct change and reject unsupported conditions, fallbacks, compatibility logic, abstractions, files, states, dependencies, and unrelated refactors. Do not use for pure explanation or research that neither modifies nor reviews code.
---

# Minimal

## Goal

Complete the task with the smallest correct implementation that matches the complexity of the requirement.

Follow two highest-order principles:

- Prove that complexity is necessary before introducing it.
- Stop immediately after the explicit acceptance criteria are met.

Treat this skill as an internal constraint throughout the coding process. Do not turn it into an extra lengthy analysis workflow. Correctness, safety, explicit compatibility requirements, and existing repository constraints take precedence. "Minimal" does not mean the shortest code, the fewest files, or the smallest diff.

## 1. Establish the task contract

Extract from the user request, existing code, and repository conventions:

- **Goal**: The behavior that must change now.
- **Done when**: What result means the task is complete.
- **Scope**: Modules, files, and tests directly related to that behavior.
- **Non-goals**: Unrequested refactors, compatibility, extensions, and drive-by optimizations.
- **Existing contracts**: Types, schemas, public APIs, component conventions, and architectural boundaries.

Do not expand the goal on your own. Future needs without evidence are not part of the current task by default.

## 2. Judge the task level

Treat a task as simple when the requirement is clear, the change is local, existing structure can be reused, and public contracts do not change. For simple tasks:

- Do not output a detailed plan.
- Read only enough context to confirm existing patterns and the change point.
- Implement the smallest correct change directly.

Use a short plan only when the task truly involves cross-module data flow, public APIs, data models, migrations, security, concurrency, or important architectural trade-offs. Complex tasks must still pass the later gates.

## 3. Run the simplicity gate

Before every meaningful action, ask internally:

1. Is this action required to complete the current requirement?
2. Does it introduce behavior or commitments beyond the requirement?
3. Can existing code, types, components, or data structures be used directly?
4. Is there a correct approach with fewer changes, fewer branches, fewer concepts, and shallower layers?
5. If this action is not performed, can the current done-when still be met?

Decide by these rules:

- If skipping it still meets the requirement: skip it.
- If both the simple and the complex approach are correct: choose the simple one.
- If the complex approach is unavoidable: find explicit evidence that rules out the simple approach.
- If you cannot point to evidence: fall back to the simple approach.

The gate constrains internal decisions only. Do not output the full gate process unless the complexity is obvious, an assumption would affect public behavior, or the user asks for an explanation.

## 4. Require evidence for complexity

Before adding any of the following, find explicit justification:

- Conditional branches, null checks, type checks, default values, or fallbacks
- `try/catch`, retries, degradation, recovery, or swallowed errors
- Compatibility with old behavior, adapter layers, dual writes, or migration branches
- New state, new configuration, new files, new dependencies, or new public interfaces
- Helpers, hooks, components, services, strategies, factories, or other abstractions
- Refactors, renames, formatting, or directory changes unrelated to the task goal

Valid justification can come only from at least one of:

- Explicit requirements or acceptance criteria
- Existing real business states
- Untrusted system boundaries
- Reproduced problems or failing cases
- Existing test requirements
- Explicit repository constraints on architecture, compatibility, security, performance, or accessibility

"More robust," "just in case," "might need it later," "easier to extend," and "could theoretically be empty" are not valid justification by themselves.

When finer judgment criteria are needed, read [references/decision-rules.md](references/decision-rules.md).

## 5. Implement the smallest correct change

When implementing, follow these constraints:

- Change only the behavior required by the done-when.
- Prefer modifying the existing implementation and reusing repository patterns; do not create a parallel mechanism.
- Trust data already guaranteed by types, schemas, or trusted internal contracts.
- Validate data only at boundaries such as user input, URLs, storage, files, network, third-party services, deserialization, and cross-process messages; after validating once, do not repeat it at every layer.
- Do not use fallbacks to disguise contract errors as empty data, default state, or success.
- Do not keep unrequested old behavior, and do not add compatibility layers for hypothetical callers.
- Do not create a generic abstraction for single, local, clear logic.
- Do not opportunistically fix adjacent issues; handle them only when they block the current task.
- Test the current acceptance behavior, real boundaries, and reproduced regressions; do not invent production branches and tests for impossible states.

When the implementation starts to show defensive checks, generalization, compatibility layers, or state bloat, read [references/anti-patterns.md](references/anti-patterns.md) and correct against it.

## 6. Run a subtraction review

After the change, inspect the current diff in reverse:

- Can each change map to the done-when or an explicit constraint?
- Is there code that can be deleted while still meeting the requirement?
- Were branches, state, fallbacks, or error handling added without a real scenario?
- Was data already guaranteed by an internal contract re-validated?
- Was an abstraction created for a single use case?
- Was code outside the scope modified?
- Were upstream errors hidden via default values or caught exceptions?

Delete anything that can be removed without affecting correctness, acceptance criteria, or existing constraints. For non-trivial diffs or explicit review tasks, read [references/review-checklist.md](references/review-checklist.md).

## 7. Verify and stop

Run the smallest sufficient verification that proves the current change is correct, such as targeted tests, type checks, lint, or a local build. Do not expand the verification scope merely because tools are available; do not skip existing checks that can directly prove the change.

Stop immediately when all of the following are true:

- The explicit requirement is complete.
- Relevant verification has passed, or any checks that could not be run have been reported honestly.
- No correctness issues that must be fixed were found.
- The diff contains no unjustified complexity.

Do not continue to "opportunistically" abstract, clean up, unify, add compatibility, or extend.

## Output requirements

For simple implementation tasks, briefly state what changed and how it was verified. State assumptions only when they affect behavior.

For explicit review tasks, report only specific, locatable unjustified complexity, and give a simpler alternative that preserves correctness. Do not treat personal style preferences, hypothetical future needs, or "could be abstracted further" as issues.
