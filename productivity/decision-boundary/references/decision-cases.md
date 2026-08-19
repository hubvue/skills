# Decision Cases

Use these cases to resolve ambiguous boundaries. Apply the principle demonstrated by the case; do not copy its implementation details blindly.

## 1. Local Feature With One Consumer

**Request:** Add expand and collapse behavior to one message card.

**Bound behavior:** Add local state to the existing component, preserve current message contracts, and test the interaction.

**Avoid:** A global store, persistent state, a generic collapse framework, protocol changes, or refactoring all message types without evidence that they are required.

## 2. Focused Bug Fix

**Request:** Fix duplicate form submissions.

**Bound behavior:** Reproduce the issue, identify the actual duplicate path, patch the narrow cause, and verify existing submission behavior.

**Avoid:** Rewriting the form architecture, replacing the request library, normalizing unrelated validation, or adding broad debounce infrastructure without evidence.

## 3. Explicit Breaking Refactor

**Request:** Replace the legacy API and do not preserve backward compatibility.

**Bound behavior:** Remove the old path, update all confirmed internal consumers, and validate the new contract.

**Avoid:** Compatibility adapters, deprecated aliases, feature flags, dual writes, silent fallback to the old API, or migration scaffolding the user explicitly rejected.

## 4. Necessary Abstraction

**Situation:** Two current features perform the same nontrivial validation, and a third confirmed feature will use the same contract.

**Bound behavior:** Extract a focused abstraction whose boundary is supported by present repeated use and tests.

**Avoid:** A general validation engine, registry, rule language, or plugin API that exceeds the repeated behavior actually observed.

## 5. Structural Correction Is Required

**Situation:** A bug cannot be fixed safely because state ownership is split across two components and creates contradictory sources of truth.

**Bound behavior:** Make the smallest structural change that establishes one source of truth, then verify the affected behavior.

**Avoid:** Preserving the defect-prone structure merely to keep a one-line diff, or using synchronization patches that add more hidden state.

## 6. Material Product Ambiguity

**Request:** "Remember the user's setting."

**Unknowns:** Session-only, device-local, or account-wide persistence would produce materially different product behavior and data handling.

**Bound behavior:** Inspect existing persistence conventions and requirements. If still unresolved, surface the consequential alternatives rather than choosing silently.

**Avoid:** Inventing account synchronization, a new database field, or permanent retention because persistence is a common best practice.

## 7. Low-Risk Implementation Ambiguity

**Request:** Add a small helper inside a module. The project consistently uses named functions, but the user did not specify function syntax.

**Bound behavior:** Follow the established local style and proceed without asking.

**Avoid:** Blocking on a preference that is low-risk, reversible, and already answered by the project.

## 8. Expertise Without User Preference

**Request:** Choose a state-management approach for a small local interaction; the user asks for a recommendation.

**Bound behavior:** Explain the decisive tradeoff briefly and recommend local component state based on the current scope.

**Avoid:** Presenting the recommendation as a user requirement, or introducing a global state library to demonstrate architectural completeness.

## 9. Both Sides Lack Evidence

**Situation:** It is unclear whether a performance problem comes from rendering, network latency, or data volume.

**Bound behavior:** Instrument or measure the smallest representative path, identify the bottleneck, and then design the fix.

**Avoid:** Adding caching, virtualization, batching, workers, and a new data layer simultaneously to cover every hypothesis.

## 10. Explicit Exploration

**Request:** Brainstorm several bold architectures for a future multi-tenant plugin platform.

**Bound behavior:** Explore genuinely different options, state assumptions, compare consequences, and keep speculative claims separate from facts.

**Avoid:** Forcing a single minimal implementation before exploration is complete. The guardrail limits unsupported certainty and irrelevant complexity, not requested breadth.

## 11. Forward-Looking Architecture With a Defined Horizon

**Request:** Design for three confirmed deployment targets and a plugin API planned for the next release.

**Bound behavior:** Include extension points justified by those confirmed targets and the planned release, while keeping the design bounded to that horizon.

**Avoid:** Designing for arbitrary providers, unknown protocols, hypothetical marketplaces, or governance systems outside the stated roadmap.

## 12. Unrelated Defect Discovered During Work

**Situation:** While fixing upload progress, the agent notices an unrelated naming inconsistency and an old unused utility.

**Bound behavior:** Leave them unchanged. Mention the unrelated defect only when it creates meaningful risk or follow-up value.

**Avoid:** Expanding the diff with cleanup that cannot be traced to upload progress.

## 13. Required Safety and Correctness

**Request:** Add a file-upload endpoint.

**Bound behavior:** Include validation and security controls necessary for the endpoint to be correct and safe, even if the user did not enumerate every control.

**Avoid:** Calling essential validation "overengineering," or building a general media-security platform beyond the actual endpoint's threat model.

## 14. Completion Boundary

**Situation:** The requested behavior works and relevant tests pass, but nearby modules could be simplified.

**Bound behavior:** Stop and report the completed result.

**Avoid:** Continuing into cleanup, abstraction, formatting, documentation expansion, or speculative optimization because the repository offers more opportunities.
