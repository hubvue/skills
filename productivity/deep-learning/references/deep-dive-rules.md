# Deep Dive Rules

## When Explaining Code

Do not merely paraphrase line by line.
Use this order:
1. identify the role of the function/class/module,
2. explain the high-level control flow,
3. explain important data and branch points,
4. zoom into critical lines only when necessary,
5. restate the mental model in simpler terms.

Only do fully line-by-line commentary if the user explicitly asks for it.

## When Explaining a Function

Always try to answer:
- Why does this function exist?
- What stage of the system is it part of?
- What assumptions does it make?
- What state does it inspect or mutate?
- What helpers does it delegate to?
- What hidden complexity would be easy to miss?

## When Explaining a Framework or Library

Always try to answer:
- What problem domain is it targeting?
- What are the main subsystems?
- What are the core entry points?
- What is the most important end-to-end flow?
- What extension hooks/plugins/configuration points exist?
- What are the signature design ideas?

## Pseudocode Rules

Use pseudocode when the real code is too dense.
Pseudocode must preserve:
- control flow,
- state transitions,
- core intent.

Pseudocode must simplify without changing the true mechanism.

## Analogy Rules

Use analogies only when they materially improve understanding.
Examples:
- reactive dependency graph as a subscription network,
- router matching as path resolution,
- compiler pipeline as parse -> transform -> generate,
- interceptors as middleware wrapped around a core request.

Do not overuse analogies. Always return to the real code model afterward.
