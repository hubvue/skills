# Claims, Evidence, and Real Artifacts

## Contents

1. Rank evidence
2. Maintain a claim–evidence table
3. Respect factual boundaries
4. Integrate real artifacts
5. Use code and configuration examples
6. Review evidence

## 1. Rank evidence

Prefer, in order:

1. executable code and automated tests;
2. explicit contracts, schemas, and state definitions;
3. real runtime artifacts;
4. project configuration;
5. design documents;
6. README or marketing material;
7. inference from the above.

Different sources prove different things:

- Configuration proves declaration or wiring, not that a particular execution succeeded.
- A state field proves a storage shape, not that the stage completed correctly.
- An artifact proves that a result exists, but may not prove which component produced it.
- A design document proves intent, not implementation.

## 2. Maintain a claim–evidence table

For a fact-dense article, keep an internal table:

| Article claim | Claim type | Evidence | What it proves | What it cannot prove | Confidence |
| --- | --- | --- | --- | --- | --- |
| Requirement and Task persist separate states | Implemented behavior | Schema, write path, real state files | Separate state exists | Every transition is correct | High |
| Skill X produced a paragraph in a research artifact | Causal attribution | Hook configuration only | Skill X was configured | Origin of the paragraph | Low; do not publish |

Distinguish implemented behavior, contract, design goal, inference, and future proposal.

## 3. Respect factual boundaries

Avoid turning:

- “allowed” into “always performed”;
- “may be empty” into “must provide”;
- “warn and continue” into “the stage fails”;
- “uses the same configuration” into “copies all state”;
- “planned support” into “implemented support”;
- “appears in one example” into “the system always behaves this way.”

When evidence is insufficient, narrow the claim, label it as intent or inference, or remove it.

Check whether absolute terms such as all, any, must, never, and always exceed the evidence.

## 4. Integrate real artifacts

Use artifact fragments to show how a design becomes observable, not to display every field.

Recommended sequence:

1. explain the mechanism;
2. introduce the artifact it produces;
3. show the smallest sufficient fragment;
4. explain the design judgment visible in the fragment;
5. state how later work uses it.

Avoid an abrupt “Here is a case study from Project X” unless the case itself is the subject. Let the artifact continue the explanation.

### Omission rules

- Preserve the field structure and stage conclusion.
- Omit irrelevant hashes, long lists, and repeated history.
- Mark excerpts and ellipses clearly.
- Do not splice multiple revisions into a nonexistent single artifact.
- Do not replace real values with invented ones while calling the block original output.

## 5. Use code and configuration examples

For a command, explain what it accepts, what it does, what it produces, and how the result is consumed.

Use JSON or YAML only to establish a specific design point. Do not narrate every line after the block.

When explaining identity, revision, hashes, or fingerprints, name the real fields that implement those concepts. Do not present a conceptual label as though it were a literal schema field.

## 6. Review evidence

- Does every important state and permission claim have a primary source?
- Does the article distinguish intent from implemented behavior?
- Does it infer successful execution from configuration?
- Does it attribute an artifact to a component without provenance evidence?
- Does each excerpt come from a real file without changing its meaning?
- Has sensitive data been handled appropriately?
- Do scope words match the evidence?
- If behavior may change, does the article identify the relevant version or date?

