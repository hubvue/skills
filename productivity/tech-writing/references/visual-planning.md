# Planning and Reviewing Technical Article Visuals

## Contents

1. Decide whether a visual is needed
2. Assign a job to the visual
3. Write the drawing brief
4. Control text
5. Choose the insertion point
6. Review the result

## 1. Decide whether a visual is needed

Use a visual when it materially clarifies:

- three or more nodes with branching, loops, or return paths;
- interacting states or owners;
- one source feeding several stages;
- an orchestration layer coordinating lower-level flows;
- separate ownership of artifacts, state, and permissions;
- a whole–part relationship that prose makes difficult to retain.

A visual is usually unnecessary for one command's input/output, a simple three-step sequence, a short state table, or a text fragment with no important relationships.

## 2. Assign a job to the visual

Prose explains reasons, mechanisms, and judgments. The visual explains spatial relationships, sequence, branches, loops, ownership, and boundaries.

Do not compress the prose into boxes. Use a metaphor only when it preserves the facts:

- railway and stations for serial orchestration and checkpoints;
- ledgers and archives for durable facts and history;
- workbench for coordinated contributors;
- map and signposts for state, cursor, and recovery;
- streams and branches for context propagation and filtering.

Reject a metaphor that accidentally implies parallelism, endless execution, incorrect ownership, or a missing terminal state.

## 3. Write the drawing brief

```markdown
Title:
Purpose: what the reader should understand
Canvas: dimensions, ratio, and article use
Reading order: start and end
Main path: normal flow and key nodes
Branches: exceptions, returns, and stop boundaries
Ownership: who stores state, produces results, and decides
Human and Agent actions:
Visual metaphor and why it fits:
Color hierarchy: normal, warning, state, evidence
Exact text: list verbatim
Prohibited implications: incorrect flow, extra states, long prose, box-only layout
Insertion point: between which passages
```

## 4. Control text

- Give titles, state names, and key principles verbatim.
- Reduce explanations to short labels.
- Keep long sentences in the article, not the image.
- Preserve the case and spelling of technical terms.
- Do not repeat the same message in several regions.
- Remember that generated-image text errors increase with text volume.
- Use the article's target language; retain untranslatable technical identifiers as defined in the prose.

## 5. Choose the insertion point

Place an overview after the section establishes its design claim and before detailed subsections. Place a local workflow at the first point where the reader must retain several relationships at once.

Do not place a visual far before the concepts it explains, and do not restate every arrow in the prose.

## 6. Review the result

- Are the title and labels exact?
- Do arrows match the prose?
- Are normal flow, return paths, and stop boundaries distinct?
- Does serial work look accidentally parallel?
- Does orchestration look like an ordinary workflow stage?
- Are state and artifact owners correct?
- Are human and Agent decision rights reversed?
- Did the image invent commands, states, or objects?
- Is the terminal state clear?
- Does the main relationship survive small-size viewing?
- Are dimensions, path, and Markdown reference correct?

For a text-only error, prefer a targeted edit that preserves composition. Keep the first version as a backup and save a separate final asset.

