# Article Positioning and Structure

## Contents

1. Do not mirror the project inventory
2. Start from the reader's experience
3. Build design sections
4. Draw section boundaries
5. Name sections for readers
6. Recognize structural failures
7. Review the outline

## 1. Do not mirror the project inventory

Do not automatically use these as the article structure:

- package or module trees;
- command lists;
- API inventories;
- state enumerations;
- object models;
- implementation chronology.

They belong in reference documentation unless they directly support the reader's learning path.

| Material | Typical role in an article |
| --- | --- |
| A concrete reader problem | Entry point |
| Core design decisions | Narrative spine |
| Commands, configuration, and fields | Mechanism detail |
| Source code and real artifacts | Evidence |
| Exhaustive parameters and edge cases | Reference material or a focused table |

## 2. Start from the reader's experience

Before a new system existed, readers already completed the work somehow. Describe that recognizable process before explaining how the project reorganizes it.

Useful anchors include:

- how engineers deliver a feature;
- how operators investigate an incident;
- how users submit, inspect, and revise information;
- how a team previously coordinated the work.

Avoid invented anecdotes, unsupported industry trends, and universal openings such as “In today's rapidly evolving landscape.”

## 3. Build design sections

A design section often moves through:

```text
Recognizable work
→ a concrete limitation or risk
→ the project's design response
→ how a practitioner uses or enters it
→ the observable result or artifact
→ what happens when inputs change or execution fails
```

Adapt the sequence to the material. A section that only lists what the project provides is still feature documentation, not design explanation.

## 4. Draw section boundaries

Write an internal boundary card for every major section:

```markdown
Section: Flow control
Answers: how defined development stages continue, stop, return, and resume
Does not answer: which stages a complete delivery contains; how context files are organized
Reader prerequisite: understands the requirement and task workflows
Conclusion: state is not proof; artifacts and gates authorize progression
Evidence: state contract, persisted state, reflow diagram
```

If two cards have nearly identical “Answers” lines, merge the sections or redraw their responsibilities.

## 5. Name sections for readers

A useful title lets a first-time reader predict the section's content.

Prefer concrete work objects and actions, such as:

- Collecting requirement context
- Technical design and task decomposition
- Task development
- Versioning and validity
- Execution state and recovery

Use internal terms when the term itself has become the subject, not merely to sound architectural. Avoid vague words such as enablement, evolution, ecosystem, transformation, or framework unless the section defines a precise meaning.

## 6. Recognize structural failures

### Command-by-command structure

This reads like a README. Organize around work and design questions; place commands inside the relevant section.

### One solution section per opening problem

An overly symmetrical “three problems, three solutions” outline can hide the actual relationships among the designs. Use problems to establish the need; use design responsibilities to structure the body.

### Internal object model first

Readers must memorize concepts before knowing why they matter. Establish a familiar work process first.

### Chronology without design reasoning

A complete sequence can still read as a process description. Explain the reason, boundary, and artifact at each meaningful design point.

### Overview that repeats the article

An overview should establish relationships and a reading map, not pre-write every later section. If the previous passage already provides the map, proceed directly.

## 7. Review the outline

- Can the article state one central claim?
- Does the opening describe a real problem for the target reader?
- Does each major section answer a different question?
- Does the order move from familiar to unfamiliar and whole to detail?
- Can a first-time reader understand the titles?
- Do internal terms appear before they are needed?
- Do commands and fields dominate the narrative?
- Are core flow, extension points, and orchestration boundaries distinct?
- Does any section exist only to make the outline look complete?

