# Technical Article Review Gates

## Contents

1. Section gate
2. Reader review
3. Factual review
4. Independent-agent review
5. Full-manuscript review
6. Completion standard

## 1. Section gate

Before a section enters the manuscript, verify:

| Gate | Passing condition |
| --- | --- |
| Clear question | One sentence can state what the section alone answers |
| Valid reason | The section explains why the design is needed without repeating the article background |
| Concrete mechanism | Actors, objects, state, or artifacts change in a specific way |
| Usable entry | When relevant, the practitioner can see how to trigger or confirm the work |
| Sufficient evidence | Important claims have code, contract, or real-artifact support |
| Accurate boundary | The prose does not expand permissions, states, or implementation scope |
| Reader clarity | Titles and narrative follow the reader's experience |
| Editorial approval | In co-writing mode, the user explicitly accepted the candidate |

Fix the failed gate without opportunistically rewriting unrelated sections.

## 2. Reader review

Read as a domain practitioner meeting the project for the first time:

- Is the section's subject and purpose clear at the start?
- Does each new concept have a recognizable anchor?
- Can the reader see why the design exists, not only its steps?
- Do commands and artifacts appear only when needed?
- Does each artifact continue the preceding argument naturally?
- Do adjacent paragraphs add different information?
- Would deleting a paragraph lose anything?

Give actionable feedback tied to a passage and a reading obstacle. Avoid comments such as “could be clearer.”

## 3. Factual review

Verify:

- state names, transitions, and completion conditions;
- ownership among requirements, tasks, resources, and orchestration layers;
- write permissions, external permissions, and authorization boundaries;
- who writes, reads, and owns each artifact or final state;
- whether failure produces a warning, blocked state, stale state, or reflow;
- the actual meaning of revisions, hashes, and fingerprints;
- configuration versus design intent versus implemented behavior;
- whether examples are real and prove the statement.

For each issue provide the original passage, risk, evidence location, and minimal correction. Say “insufficient evidence” when appropriate.

## 4. Independent-agent review

For fact-dense sections involving permissions, state machines, rollback, or external systems, prefer an independent reviewer.

Provide:

- the candidate section;
- raw code, contracts, configuration, and artifact paths;
- the target reader.

Do not provide the main writer's expected verdict, suspected bug, or a secondary summary crafted to support the article.

Suggested task:

> Check this article section against the provided project sources. Focus on states, permissions, flow, artifact ownership, and causal claims that the evidence cannot establish. For every issue, cite the passage, evidence, and smallest correction. Do not fill evidence gaps with plausibility.

The main writer must verify the review against the originals before applying it.

## 5. Full-manuscript review

### Narrative

- Does the body answer the opening problem?
- Does the central claim remain visible, or does the article become a manual?
- Are the core flow, extension points, and orchestration layers distinct?

### Structure

- Do major sections have non-overlapping responsibilities?
- Does the reader move from familiar work to internal design?
- Are overview, summary, and repeated background sections necessary?

### Consistency

- Use the same names for objects, commands, states, and files.
- Keep heading levels, code blocks, tables, and link formatting consistent.
- Preserve the chosen English spelling convention where applicable.
- Keep image titles, prose labels, and file references aligned.
- Distinguish design goals, current implementation, and future plans consistently.

### Ending

- Do not add uplift merely to create a conclusion.
- Summarize established design judgments and boundaries only when useful.
- Do not repeat the table of contents.
- Do not introduce a broader claim absent from the body.

## 6. Completion standard

The manuscript is deliverable when:

1. the target reader can explain the concrete problem;
2. each section establishes a distinct design judgment;
3. important facts trace to primary evidence;
4. examples and visuals aid understanding rather than decorate;
5. the accepted author voice and terminology remain intact;
6. no known factual error, broken transition, or information-free repetition remains.

