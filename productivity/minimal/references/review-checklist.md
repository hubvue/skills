# Diff Subtraction Review Checklist

## Contents

- [How to apply](#how-to-apply)
- [Review steps](#review-steps)
- [Item-by-item checks](#item-by-item-checks)
- [Disposition rules](#disposition-rules)
- [Explicit review output](#explicit-review-output)
- [Stop conditions](#stop-conditions)

## How to apply

- Implementation tasks: use this checklist to slim your own diff before submitting the final result.
- Explicit review tasks: review only unjustified complexity in the current change. Do not mix existing code or style preferences into the conclusion.

## Review steps

1. Restate the current done-when in one sentence.
2. Inspect the actual diff; do not review from memory.
3. Map each added or changed block to a requirement, test, or repository constraint.
4. Mark code that has no mapping evidence.
5. Try deleting or inlining it, and confirm the done-when still holds.
6. Run the smallest sufficient verification.
7. Stop when done. Do not start another round of drive-by optimization.

## Item-by-item checks

### Scope

- Were files with no direct relation to the goal modified?
- Are there unrelated renames, formatting, directory moves, or comment cleanup?
- Were non-blocking adjacent issues fixed opportunistically?

### Branches and validation

- Does every `if`, `else`, and `switch` correspond to a real state or boundary?
- Are values already excluded by the type system being checked?
- Is the same data re-validated across multiple internal layers?
- Are multiple unconfirmed input formats supported at once?

### Fallbacks and errors

- Is every default value a product-defined recovery result?
- Is failure disguised as an empty list, empty string, `false`, or success?
- Does `try/catch` actually recover, rethrow with added context, or perform necessary cleanup?
- Were retries or degradation added without a policy basis?

### Abstractions

- Does a new helper, hook, component, or service have only one call site?
- Does the abstraction represent a stable business concept, rather than merely moving a few lines of code?
- Is it easier to understand and still correct after inlining?
- Was a new mechanism created in parallel with an existing repository capability?

### State, configuration, and dependencies

- Does new state correspond to independent, observable business meaning?
- Is one state expressed as multiple booleans?
- Does new configuration correspond to a real current difference?
- Does a new file fit existing responsibility boundaries?
- Does a new dependency fill a currently irreplaceable capability gap?

### Compatibility

- Is there an explicit support matrix or a real old caller?
- Was the old path kept even though the user asked to replace the old implementation?
- Does temporary compatibility logic have a migration scope and an exit condition?

### Tests

- Do tests directly prove acceptance criteria or a real regression?
- Were production branches and tests added for hypothetical input?
- Were large amounts of unrelated snapshots or test data rewritten?
- Were only the checks related to this change, and sufficient to prove correctness, run?

## Disposition rules

### Must delete or correct

- Changing public behavior outside the requirement
- Hiding real errors or breaking error semantics
- Unjustified compatibility, degradation, or data conversion
- Unrelated changes that clearly expand the regression surface
- Complexity that produces contradictory states or a wrong contract

### Simplify by default

- Thin abstractions with a single call site
- Repeated defensive checks when the type already guarantees the value
- Configuration tables or strategy layers when there is only one fixed behavior
- Extension points with no real callers
- Helper code that can be deleted while still passing the done-when

### Should keep

- Branches that map to an explicit business state
- Centralized validation at untrusted boundaries
- Safety, transaction, concurrency, accessibility, and resource-cleanup requirements
- Confirmed compatibility and migration needs
- Existing layers required by repository architecture

Do not delete necessary domain logic merely because the code is long.

## Explicit review output

Each finding should include:

1. **Location**: The file and relevant code region.
2. **Unjustified complexity**: What specifically was added.
3. **Why it is unnecessary**: Which current requirement or constraint it cannot map to.
4. **Simpler approach**: A direct alternative that preserves correctness.
5. **How to verify**: How to confirm the simplified version still meets the done-when.

Report only problems that can be specifically demonstrated. When there are no findings, state clearly that the current diff has no unjustified complexity. Do not invent suggestions in order to produce a review.

## Stop conditions

Before answering, confirm:

- All retained complexity has locatable evidence.
- Deleted content does not break the done-when or real constraints.
- Verification covers this change.
- The task scope has not been expanded further.
