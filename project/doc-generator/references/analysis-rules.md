# Analysis Rules

Before writing docs, analyze the code using the following lenses.

## 1. Responsibility

Determine:
- what the target is responsible for
- what it is not responsible for
- whether it is public-facing or internal-facing

## 2. Public Surface

Inspect:
- exports
- props
- method signatures
- public class methods
- hooks/composables return values
- configuration entry points

Determine:
- what users are expected to call
- what users should not touch directly

## 3. Usage Flow

Understand:
- initialization
- typical call order
- required context/providers
- data flow
- setup / cleanup pattern

## 4. Dependency Context

Inspect:
- external packages
- internal modules
- shared utilities
- environment assumptions
- config dependencies

## 5. Constraints and Risks

Look for:
- runtime guards
- error throwing
- null checks
- env checks
- SSR/browser assumptions
- side effects
- stateful behavior
- mutation
- caching
- singleton behavior
- concurrency/async assumptions

## 6. Evidence Sources

Prioritize evidence in this order:

1. implementation
2. exported types / type annotations
3. tests
4. examples
5. comments
6. existing docs
7. naming and surrounding structure

If these sources conflict, prefer stronger evidence.

## 7. Confidence Judgment

Use:
- Confirmed: directly supported by implementation/types/tests
- Inference: strongly implied by structure or naming
- Needs Verification: runtime or external dependency behavior not confirmable here

## 8. Documentation Focus by Scope

### Project
Focus on:
- purpose
- install/setup
- main modules
- public APIs
- getting started flow
- usage patterns
- architecture overview
- caveats

### File
Focus on:
- file responsibility
- exports
- main workflow
- integration points
- how consumers interact with it
- risks of modification

### Symbol
Focus on:
- signature meaning
- params
- return value
- usage timing
- side effects
- edge cases
- examples
