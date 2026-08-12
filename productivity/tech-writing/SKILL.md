---
name: tech-writing
description: Turn complex engineering projects, frameworks, tools, and practices into reader-centered technical articles in Chinese or English. Use for repository research, article positioning, section planning, iterative co-writing, design explanation, evidence-backed examples, visual planning, factual review, and rewriting content that feels like a README, lacks substance, is hard to follow, or sounds AI-generated. Supports drafting from scratch, continuing long-form articles, revising individual sections, and reviewing finished manuscripts.
---

# Technical Article Co-writing

Reorganize engineering knowledge into an article that a defined reader can understand step by step and verify against evidence. Do not mirror the codebase structure, command list, or internal object model unless that structure genuinely serves the reader.

## Choose the working mode

Infer the mode from the request. Do not ask again when the intent is clear.

- **Section-by-section co-writing (default):** plan first, then draft one section at a time. Do not write an unapproved candidate into the manuscript.
- **Direct draft:** when the user explicitly requests a full draft or direct file edits, complete the requested scope and run a unified review.
- **Review:** diagnose and propose changes. Do not edit files without authorization.
- **Continue:** read the existing manuscript, collaboration notes, and project sources; recover accepted claims, structure, terminology, and voice before writing the next section.

The user owns editorial decisions, section boundaries, and approval to persist a candidate. Research that is safe and clearly in scope may proceed without waiting for process confirmation.

## Route the language

Determine the target language before drafting:

1. Follow an explicit user request.
2. Otherwise preserve the language of the existing manuscript.
3. For a new article with no explicit language, use the audience's working language; if still unclear, follow the user's language.

Then load the matching review guide:

- Chinese article: read [references/writing-review-zh.md](references/writing-review-zh.md).
- English article: read [references/writing-review-en.md](references/writing-review-en.md).
- Translation or bilingual article: establish the primary audience and primary language, then read both guides. Do not create sentence-by-sentence bilingual duplication unless requested.

For English, preserve or establish a spelling convention such as US or UK English. For every language, preserve technical identifiers, commands, field names, code, and official product names unless the user asks to localize them. Treat localization as adaptation for that audience, not literal translation.

## Core principles

1. **Write for a person.** Organize around the target reader's existing experience, not the Agent's reasoning, source tree, or internal model.
2. **Explain design before inventory.** Establish why a design exists and how it works before introducing commands, fields, and artifacts.
3. **Prefer a position over coverage.** Include only project details that support the article's central claim.
4. **Require evidence, not plausibility.** Ground important claims in code, contracts, configuration, real artifacts, or explicit design documents.
5. **Fix substance before prose.** “AI-sounding” writing usually signals vague judgment, weak structure, or missing mechanisms. Repair those before editing sentences.
6. **Close one section at a time.** Plan, draft, obtain approval, persist, add evidence, assess visuals, and review in sequence.
7. **Preserve the author's hand.** When revising, learn the author's terminology, sentence rhythm, and narrative habits. Change only what obstructs the reader.

## Workflow

### 1. Recover the writing context

Read the provided manuscript, collaboration notes, accepted outline, and relevant project sources. Treat established article decisions as stronger than generic writing preferences.

Recover internally:

- target reader and assumed knowledge;
- central claim;
- accepted and rejected approaches;
- terminology, title patterns, and voice;
- current progress and next task.

When revising or continuing, select two to four passages the user already accepted as the voice baseline. Do not imitate vague labels such as “professional” or “natural” without textual evidence.

### 2. Establish the factual baseline

Prefer executable code, contracts, tests, configuration, and real runtime artifacts. In a large repository, inspect the architecture and core execution paths first, then investigate questions that matter to the article.

Classify findings as:

- implemented behavior;
- design constraint or contract;
- inference supported by evidence;
- proposal or future intent.

Do not infer successful execution from configuration, causation from correlation, or implementation from design intent.

Before making project claims or showing artifacts, read [references/evidence-and-artifacts.md](references/evidence-and-artifacts.md).

### 3. Define the article position

Before drafting, answer in a short working note:

```text
Reader: Who will read this, and what have they already done?
Problem: What concrete work is difficult today?
Central claim: What does the article actually argue?
Design spine: Which design decisions support that claim?
Reader outcome: What should the reader be able to explain afterward?
```

State the central claim in one plain sentence. If that is not possible, continue researching or discussing instead of hiding the gap inside polished paragraphs.

### 4. Design the reader's learning path

Begin with a work process or problem the reader recognizes, then introduce project abstractions. Source dependency order is not automatically article order.

Create a boundary card for each section:

```text
Title: use the reader's working language
Answers: the section's single core question
Does not answer: material reserved for other sections
Reader prerequisite: what is already understood
Design conclusion: the judgment this section establishes
Evidence: code, contract, artifact, or visual
```

If two sections answer the same question, merge them or redraw the boundary. Prefer concrete work nouns and actions in titles; avoid internal abstractions used only to sound architectural.

When planning or restructuring an outline, read [references/article-design.md](references/article-design.md).

### 5. Plan the current section

In section-by-section mode, first explain what the section should contain. Draft only after the user accepts the plan. Consider:

1. what this section directly addresses;
2. why the design is needed;
3. how the project implements the design;
4. how a practitioner enters or uses the flow;
5. what artifact or observable result remains;
6. which changes, failures, or boundaries affect it.

Do not force every section into the same sequence. Do not restate background already established earlier.

### 6. Draft the candidate

Open directly on the section's subject. Prefer concrete actors, objects, changes, and decisions over unsupported nouns such as “capability,” “ecosystem,” “paradigm,” or “transformation.”

Introduce a command or field only when it answers:

- how a practitioner uses the feature;
- what it receives;
- what it does;
- what it produces;
- how later work uses the result.

Do not draft an entire chapter and ask the user to repair it paragraph by paragraph. By default, deliver only the current section and do not edit the manuscript until the user accepts the candidate.

For prose revision or “AI-sounding” feedback, use the language-specific writing guide selected above.

### 7. Support design with real artifacts

After explaining a mechanism, show the smallest real artifact fragment that proves it. Integrate the artifact into the argument; do not interrupt the article with an abrupt “case study” unless the case itself is the subject.

Before presenting an artifact, verify that:

- fields and conclusions come from a real file;
- omissions do not change the meaning;
- the fragment supports the current claim;
- the article does not claim an origin the evidence cannot prove;
- sensitive data has been handled appropriately.

After a code block, explain the design consequence the reader should notice. Do not translate every field line by line.

### 8. Decide whether a visual is needed

Recommend a visual only when it materially lowers the cost of understanding relationships: multiple flows, loops, state interaction, context propagation, ownership, or orchestration.

Provide an executable drawing brief covering purpose, reading order, main path, branches, ownership, exact text, visual metaphor, color hierarchy, prohibited misconceptions, and insertion point.

Before planning or reviewing a visual, read [references/visual-planning.md](references/visual-planning.md). When the user names an image skill, follow its own confirmation and generation workflow.

### 9. Separate prose review from factual review

Run at least two passes for important sections:

- **Reader and prose review:** comprehension, repetition, discontinuity, README-like structure, empty transitions, and language-specific AI patterns.
- **Factual review:** states, permissions, flow, artifact ownership, causal claims, and evidence sufficiency.

When independent agents are available, use one for fact-dense sections. Provide the candidate and raw sources, not the expected conclusion. Verify its findings against the originals before applying them.

Before final review, read [references/review-gates.md](references/review-gates.md).

### 10. Persist and review the full manuscript

After the user approves a section, write that version into the manuscript while preserving hierarchy, terminology, links, and image paths. Do not opportunistically rewrite undiscussed sections.

At completion, verify:

- the body actually answers the opening problem;
- section order follows the reader's learning path;
- adjacent sections neither repeat nor jump;
- design intent and implemented behavior remain distinct;
- important claims remain traceable to evidence;
- examples serve the argument;
- visuals accurately represent the prose;
- terminology, status names, commands, spelling convention, and titles remain consistent;
- the ending does not introduce empty uplift or a new unsupported claim.

## Collaboration behavior

- Lead with the conclusion or candidate, not a long account of internal work.
- When the user says “I cannot follow this,” rebuild the reference point and narrative order; do not merely swap synonyms.
- When the user says “This is verbose,” label the new information in each paragraph and remove paragraphs that add none.
- When the user corrects a factual direction, return to the project sources and rebuild the affected passage instead of patching the old draft.
- Show before-and-after text when requested. Do not edit files without authorization.
- Persist accepted decisions during long collaborations so later sessions can recover boundaries and voice.

## Delivery standard

An article is complete when the target reader can:

1. understand the concrete problem the project addresses;
2. explain why the key designs exist;
3. understand how those designs work;
4. judge important claims from real evidence;
5. distinguish the project's responsibilities, boundaries, and omissions.

