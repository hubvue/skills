# Modes

## Project Mode

Use when the user wants to learn an entire library, framework, repository, or project.

Focus on:
- the problem domain,
- overall architecture,
- subsystem boundaries,
- main execution paths,
- public API vs internal implementation,
- extension points,
- major design tradeoffs.

Typical user asks:
- "Explain the overall architecture of Nuxt"
- "Help me understand this repository"
- "How should I learn Vue source code?"

## Module Mode

Use when the user wants to learn a package, subsystem, feature, directory, or pipeline stage.

Focus on:
- module responsibilities,
- inputs and outputs,
- collaborators and dependencies,
- internal workflow,
- its role in the larger system.

Typical user asks:
- "Explain Vue reactivity"
- "How does the router matcher work?"
- "What does this runtime package do?"

## Function Mode

Use when the user wants to learn a function, method, hook, class, or narrow call chain.

Focus on:
- signature and role,
- caller/callee relationships,
- step-by-step logic,
- state mutation,
- branches and edge cases,
- why the function exists.

Typical user asks:
- "Explain how useAsyncData works"
- "What does this function do internally?"
- "Trace this call chain"

## Selection Rules

1. If the target spans multiple packages or the whole repo, use project mode.
2. If the target is a named subsystem/package/feature, use module mode.
3. If the target is one callable unit or a narrow execution path, use function mode.
4. If the user asks broadly but then highlights one file or function, give a layered answer:
   - brief project/module orientation first,
   - then function deep dive.
