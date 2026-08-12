# Reviewing English Technical Prose

## Contents

1. Fix substance first
2. Give the reader an anchor
3. Audit paragraph information
4. Recognize common AI patterns
5. Tighten without flattening
6. Preserve the author's voice and locale
7. Final checklist

## 1. Fix substance first

When prose “sounds AI-generated,” inspect it in this order:

```text
Is there a concrete judgment?
→ Is the actual mechanism explained?
→ Does the order match the reader's reasoning?
→ Does the passage repeat existing context?
→ Only then edit diction and syntax
```

Polish cannot rescue an information-free paragraph. Remove it or return to the sources.

## 2. Give the reader an anchor

Readers struggle when prose begins from the author's internal model rather than recognizable work.

Ask:

- Does the reader know the actor and object?
- What familiar task does this design correspond to?
- Why does this concept appear at this point?
- Does each sentence supply the premise needed by the next?
- Is the heading more abstract than the section?

Do not solve a structural problem with synonyms. Reorder the passage around recognizable work, then introduce the project model.

## 3. Audit paragraph information

Label each paragraph internally: new fact, design reason, mechanism, boundary, evidence, or necessary transition.

Merge adjacent paragraphs with the same label and meaning. Remove a paragraph that adds no identifiable information.

Open a section on its subject. Prefer:

> Context collection turns product, design, and API material into inputs later stages can use.

Avoid throat-clearing such as “As discussed earlier, modern software development is a complex process.”

## 4. Recognize common AI patterns

### Generic framing

- “In today's rapidly evolving technology landscape…”
- “As software systems become increasingly complex…”
- “This section explores…”

Delete framing that does not establish a concrete fact or limitation.

### Excessive signposting

Use “first,” “moreover,” “it is important to note,” and “in conclusion” only when they express a relationship the structure cannot show by itself.

### Nominalization and abstract actors

Prefer actors and verbs:

- “SpecDev records the decision” over “the recording of the decision is performed”;
- “the reviewer rejects the plan” over “plan rejection occurs.”

Do not force active voice when the actor is unknown or irrelevant.

### Corporate and promotional language

Question phrases such as “leverages a robust ecosystem,” “seamlessly enables,” “drives transformation,” “empowers teams,” and “best-in-class.” Replace them with what changes, who does it, and what remains observable.

### Symmetry and rhetorical templates

Watch for:

- repeated “not only … but also” or “not X, but Y” contrasts;
- lists of three created only for cadence;
- paragraphs with identical problem–solution–benefit shapes;
- repeated em dashes used as dramatic pivots;
- a concluding uplift after every subsection.

Let paragraph length follow the evidence. Do not manufacture a slogan.

### Inflated certainty

Avoid “fundamentally,” “clearly,” “obviously,” “always,” and “ensures” unless the evidence supports the scope. Prefer the actual condition and result.

## 5. Tighten without flattening

When the prose is verbose:

1. remove repeated background;
2. merge neighboring claims;
3. stop narrating code blocks line by line;
4. use a table for comparable boundaries;
5. retain the one example that proves the point;
6. remove conclusion sentences that add no judgment;
7. check whether prose, lists, and visuals repeat the same content.

Concision does not mean making every sentence short. Restore a missing logical bridge when compression makes the argument jump.

## 6. Preserve the author's voice and locale

Learn from accepted passages:

- first or third person;
- sentence length and cadence;
- directness versus qualification;
- preferred technical vocabulary;
- use of contractions;
- heading capitalization;
- US or UK spelling and punctuation.

Keep established forms such as “behavior/behaviour,” “initialize/initialise,” and serial-comma practice consistent. Do not rewrite a distinctive but clear voice into generic corporate prose.

For translated English, adapt information order and sentence structure for the English-speaking audience. Do not preserve Chinese connective patterns or topic chains mechanically.

## 7. Final checklist

- Can a reader identify what every paragraph contributes?
- Does the section establish its subject without generic framing?
- Are actors and actions concrete where they matter?
- Does each abstraction point to a mechanism or artifact?
- Is signposting necessary rather than habitual?
- Are contrast templates, triads, and em dashes overused?
- Does the prose avoid unsupported promotional claims?
- Is the spelling convention consistent?
- Does the revision still sound like the author?

