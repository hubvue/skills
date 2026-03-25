# Output Rules

## Core Rule

Documentation must prioritize user consumption over source code restatement.

## Required Sections by Priority

Always try to include, when evidence is sufficient:

1. what it is
2. what problem it solves
3. when to use it
4. how to use it
5. prerequisites / dependencies
6. caveats / limitations
7. example usage
8. common mistakes
9. related APIs / modules

## Evidence Labels

Use these labels when uncertainty matters:

- `Confirmed`
- `Inference`
- `Needs Verification`

Do not over-label obvious statements. Use labels only where they add trust.

## Example Rule

If enough information exists, include at least one example.

Preferred example order:

1. minimal runnable example
2. common real-world usage example
3. incorrect usage example, when valuable

## Caveat Rule

Whenever relevant, document:

- side effects
- required initialization
- ordering constraints
- environment constraints
- async behavior
- mutation behavior
- cleanup requirements
- performance concerns
- compatibility assumptions

## Update Mode Rule

If updating an existing document:

- preserve useful structure when possible
- remove outdated statements if contradicted by code
- fill missing sections instead of rewriting everything blindly
- keep terminology consistent with existing doc where reasonable

## Avoid

- generic filler
- repeating type signatures without explanation
- “this function is very useful” style statements
- unsupported claims like “production-ready” unless evidence exists
