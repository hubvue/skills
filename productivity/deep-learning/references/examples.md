# Example Invocation Patterns

## Example 1
User: "Explain the overall architecture of Nuxt"
Handling:
- project mode,
- explain problem space,
- map modules,
- trace one main flow such as routing or data fetching,
- summarize design ideas and next files to read.

## Example 2
User: "Help me learn Vue reactivity from source"
Handling:
- module mode,
- explain subsystem role,
- identify core objects like effect/dependency/track/trigger,
- trace one reactive update path,
- summarize why this design works.

## Example 3
User: "How does Axios interceptor work internally?"
Handling:
- module mode or narrow function mode depending on context,
- explain interceptors as layers around request dispatch,
- trace request and response chains,
- point out ordering and promise-chain mechanics.

## Example 4
User: "Analyze this function and explain its design"
Handling:
- function mode,
- place the function in context first,
- explain signature, role, branches, side effects,
- give pseudocode and takeaways.

## Example 5
User: "Give me a reading path for this repository"
Handling:
- project mode,
- avoid immediately diving into internals,
- provide recommended order: docs/examples/entry/module/main flow/tests,
- explain why that order reduces confusion.
