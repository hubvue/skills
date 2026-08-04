# Refactor Strategy

Use this guide to choose scope, sequencing, cutover, and recovery for an intentional breaking refactor.

## Scope the Ownership Boundary

Classify each consumer before implementation:

| Consumer | Default treatment |
|---|---|
| Same repository and release unit | Update atomically |
| Separate repository owned by the same team | Define a coordinated multi-repository cutover |
| Independently deployed internal service | Confirm deployment ordering and contract cutover |
| Public API, SDK, plugin surface, stored external artifact | Do not assume a breaking change is safe; require explicit authorization |
| Unknown consumer | Treat as unresolved risk and investigate |

A symbol search alone is not proof of a closed boundary. Check dynamic registration, configuration, reflection, code generation, events, serialized formats, docs, examples, and operational scripts.

## Choose an Execution Shape

### Atomic replacement

Use when implementation and all consumers can change in one commit or release unit.

1. Define the new contract.
2. Update its implementation.
3. Update every consumer.
4. Delete the old contract.
5. Run repository-wide validation.

### Ordered cutover

Use when owned components deploy separately but the user explicitly authorizes a coordinated break.

1. Define deployment ordering and downtime expectations.
2. Prepare each component without enabling a second long-lived runtime path.
3. Execute the cutover in the declared window.
4. Verify end-to-end behavior.
5. Remove any cutover-only code immediately.

Do not invent an ordered cutover if the request requires zero downtime and no compatible overlap is possible. Surface the conflict.

### Data or schema replacement

Separate permanent runtime design from one-time transition mechanics.

- Allow a tested one-time conversion, rebuild, reindex, or schema migration.
- Define backup, restore, forward-fix, and partial-failure behavior.
- Rehearse against representative data when risk warrants it.
- Remove conversion hooks from normal runtime after cutover.
- Never delete production data merely because compatibility is out of scope.

## Preserve Intended Behavior

List behavior in three categories:

- **Must remain:** externally observable behavior not declared broken.
- **Must change:** behavior required by the target design.
- **May change:** incidental implementation details with no supported contract.

Use this list to prevent a breaking interface change from becoming an unbounded rewrite.

## Define Recovery

Prefer the recovery method that matches the cutover:

- revert the coordinated code change when no irreversible state changed;
- restore and replay data when a conversion fails;
- forward-fix when reverting would corrupt newer state;
- stop the rollout when validation gates fail.

Document any point after which rollback is unsafe.
