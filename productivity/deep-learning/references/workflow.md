# Standard Workflow

Use this workflow unless the user explicitly wants only one narrow thing.

## Stage 1: Intake

Normalize the request into:
- Target
- Mode: project / module / function
- Goal
- Desired depth: overview / standard / deep dive

Determine whether the user mainly wants:
- architecture understanding,
- implementation understanding,
- reading path,
- interview-ready summary,
- or a mixture.

## Stage 2: Orientation

Establish context before detail:
- what problem the target solves,
- what its boundary is,
- where it lives in the system,
- what the important entry points are.

## Stage 3: Structure Mapping

Map the relevant structure:
- repo or directory layout,
- important files and modules,
- package boundaries,
- runtime vs compile-time separation,
- public API vs internal implementation.

## Stage 4: Flow Tracing

Trace the main path.
Examples:
- initialization,
- request/response,
- rendering,
- data fetching,
- hook registration and dispatch,
- reactive track/trigger,
- compiler parse/transform/generate,
- function call chain.

For each flow, explain:
- input,
- key transitions,
- important intermediate state/data,
- output,
- extension points or branching logic.

## Stage 5: Deep Dive

Analyze the requested implementation details:
- function signature / inputs / outputs,
- important branches,
- internal helpers,
- side effects,
- state changes,
- error handling,
- performance considerations,
- platform-specific branches.

## Stage 6: Design Insight

Extract engineering lessons:
- why this abstraction exists,
- why it is shaped this way,
- what tradeoffs it makes,
- what alternatives may have existed,
- why the chosen design is practical.

## Stage 7: Consolidation

End with one or more of:
- concise summary,
- interview-ready explanation,
- pseudocode,
- key takeaways,
- suggested next files/functions to read.
