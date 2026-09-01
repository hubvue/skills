# Minimal Decision Rules

## Contents

- [Core definitions](#core-definitions)
- [Task contract](#task-contract)
- [Simple vs complex tasks](#simple-vs-complex-tasks)
- [Complexity evidence matrix](#complexity-evidence-matrix)
- [Boundaries and contracts](#boundaries-and-contracts)
- [Error handling](#error-handling)
- [Compatibility](#compatibility)
- [Abstractions](#abstractions)
- [State and configuration](#state-and-configuration)
- [Testing](#testing)
- [Handling ambiguity](#handling-ambiguity)
- [Complexity Minimal must not remove](#complexity-minimal-must-not-remove)

## Core definitions

### Smallest correct implementation

The "smallest correct implementation" is the one that satisfies the current explicit requirement, repository constraints, and necessary quality attributes, while introducing the fewest new concepts, new paths, and long-term commitments.

It is not:

- The fewest lines of code
- The fewest files changed
- The shortest functions
- Skipping tests
- Skipping error handling
- Bypassing repository architecture

### Necessary complexity

Complexity is necessary only when removing it would break at least one of:

- Current acceptance criteria
- Existing real business states
- Public contracts
- Safety, data integrity, accessibility, or concurrency correctness
- Explicit repository requirements
- Protections against a reproduced regression

If none of these would be affected by removal, the complexity is unnecessary by default.

## Task contract

Before starting, establish the following with the least information needed:

1. Which observable behavior needs to change?
2. Which behaviors must stay the same?
3. Which call chain or component is directly responsible for that behavior?
4. Which types, schemas, or tests already define the boundary?
5. What has not been requested?

Do not rewrite the goal as "the implementation could be more generic." The goal must come from the user or an existing contract.

## Simple vs complex tasks

### Simple tasks

Usually have these characteristics:

- Behavior and done-when are clear
- Changes concentrate in an existing local implementation
- Existing fields, components, or functions are sufficient
- Public APIs or persistence models do not change
- No migration, concurrency coordination, or security design is required

How to handle: confirm the existing pattern, change it directly, verify against the goal, and stop.

### Complex tasks

Usually involve at least one of:

- Multi-module or cross-process data flow
- Changes to public APIs, protocols, or persistence models
- Migration, rollback, or version negotiation
- Permissions, security, transactions, concurrency, or consistency
- Real, irreducible trade-offs among existing approaches

Complex tasks may have a plan, but the plan covers only necessary decisions. Do not design unrequested extension capacity in advance.

Do not judge task level by file count or line count alone.

## Complexity evidence matrix

| About to add | Minimum valid evidence | Usually invalid reasons |
|---|---|---|
| Conditional branch | Explicit business state, real boundary, or regression case | "Be extra safe" |
| Null or type check | The type allows the value, or the data comes from an unvalidated boundary | "Someone might pass the wrong type" |
| Fallback / default | The product defines an acceptable recovery result | "Keep the page from erroring" |
| `try/catch` | Recover at this layer, rethrow with context, or perform necessary cleanup | "Don't let the program crash" |
| Retry / degrade | Explicit reliability requirement, plus defined count, timing, and failure result | "The network might be flaky" |
| Compatibility branch | Support matrix, migration plan, or a real old caller | "Old code might still be using this" |
| Helper / hook / component | Existing repeated concept, required repository pattern, or a clear independent responsibility | "Might reuse later" |
| New file | Existing directory boundary requires it, or a real independent responsibility has formed | "Looks cleaner" |
| New state | An independent, observable business lifecycle that must be handled | "Might add more states later" |
| New configuration | A real current difference in deployment or behavior | "Adds flexibility" |
| New dependency | Existing capability cannot reasonably complete a necessary function | "This library is more professional" |
| Public interface change | The current requirement must expose a new contract | "Makes it easier for others to call" |

Complexity evidence must point to a specific requirement, code, test, or constraint, not an abstract slogan.

## Boundaries and contracts

### Untrusted boundaries

Perform necessary validation at:

- User input and forms
- URLs, query strings, and route parameters
- Persisted data such as LocalStorage, IndexedDB, and cookies
- Files, clipboard, and drag-and-drop content
- Network responses and third-party APIs
- Cross-service, cross-process, queue, and plugin messages
- JSON or other deserialization results
- Environment variables and external configuration

### Trusted internal contracts

After data is validated at a boundary and converted to internal types, later layers should rely on that contract. Do not repeat in every function, component, and hook:

- `typeof` checks
- `null` / `undefined` fallbacks
- Re-normalizing strings
- Re-parsing the same schema
- Wrapping the same error into a default value

If the internal contract is not trustworthy, fix or establish a real boundary. Do not add defensive logic in every consumer.

## Error handling

Choose the most direct correct error path:

- This layer cannot recover: allow the error to propagate to an existing handling layer.
- This layer can recover: implement only the recovery behavior the product has defined.
- Context needs to be added: catch, rethrow with cause, and keep the original error.
- Resources need cleanup: use the explicit cleanup mechanism provided by the language or framework.

Forbidden:

- Turning an interface error into an empty array and showing "no data," unless the product explicitly defines that.
- Catching all exceptions and returning `false`, `null`, or an empty string.
- Logging and then pretending success.
- Adding layers of fallback for internal states that cannot occur.

## Compatibility

By default, implement only the current explicit contract.

Only the following evidence can prove compatibility logic is necessary:

- The user explicitly requires a compatible version or old behavior
- The repository has a public support matrix
- Real callers have been confirmed to still exist
- The migration plan requires dual-read, dual-write, or staged adaptation
- The release policy explicitly requires a non-breaking upgrade

If the requirement is a breaking change or a replacement of the old implementation, do not keep the old path on your own.

## Abstractions

Prefer a local, direct, readable implementation. Abstract only when at least one of the following is true:

- Two or more real call sites already express the same stable concept
- Repository architecture explicitly requires going through an existing abstraction layer
- Duplication would immediately create a consistency or correctness risk
- A clear public contract must be maintained
- The logic itself forms an independent, namable business responsibility

Do not abstract because a snippet is a few lines long, conditions look similar, or reuse might happen later.

Before abstracting, check:

1. Does the abstraction name express a real business concept, not an implementation detail?
2. Does it make call sites easier to understand, rather than requiring a jump to read?
3. Does it reduce current duplication or constraints, rather than merely moving code?
4. If the abstraction is deleted and inlined, is the current implementation simpler and still correct?

If item 4 is yes, inline by default.

## State and configuration

Every new piece of state must correspond to independent business meaning and observable behavior. Do not split one fact into multiple booleans, and do not build a state machine in advance for "future extensibility."

Every new piece of configuration must correspond to a real current difference. When there is only one fixed behavior, implement that behavior directly. Do not create switches, mapping tables, or strategy registries.

## Testing

Prefer testing:

- Current acceptance criteria
- Existing behavior affected by the change
- Reproduced bugs
- Real input classes at untrusted boundaries
- Necessary error paths

Do not invent impossible states to justify defensive logic, then add production branches and tests for them.

The goal is not a large number of tests. Tests should prove the change is correct and prevent real regressions.

## Handling ambiguity

When information is incomplete:

- First check whether existing types, callers, tests, and adjacent implementations can resolve the ambiguity.
- For local, reversible choices that do not change public behavior, use the simplest approach consistent with the repository.
- Do not evade a decision by supporting multiple guesses at once.
- Explicitly surface a key assumption or request a decision only when different interpretations would change a public contract, safety, data meaning, or an irreversible result.

## Complexity Minimal must not remove

Do not delete the following necessary content for the sake of surface simplicity:

- Authentication, authorization, input validation, and protection of sensitive data
- Transactions, locks, idempotency, concurrency control, and consistency guarantees
- Resource release, cancellation handling, and lifecycle cleanup
- Explicitly supported compatibility layers and migration logic
- Accessibility requirements
- Proven performance constraints
- Audit, compliance, and data-retention requirements
- Error semantics of public APIs

The goal of Minimal is to remove unjustified complexity, not to compress real domain complexity.
