---
name: doc-skill-creator
description: Use this skill when the user wants to convert one or more existing documents into a dedicated skill, including analyzing suitability, extracting capabilities, designing the skill structure, and drafting SKILL.md and references.
---

# doc-skill-creator

## Purpose

Convert existing documents into a dedicated skill design.

This skill is for turning static documentation such as component library docs, SDK docs, utility docs, FAQ, migration guides, standards docs, README files, and examples into practical skill artifacts.

## Use this skill when

Use this skill when the user wants to:

- convert documents into a dedicated skill
- generate a skill from library, SDK, FAQ, migration, or standards documentation
- design a target skill from existing docs
- create SKILL.md and references from source documents
- transform static docs into practical usage capabilities

## Do not use this skill when

Do not use this skill when:

- the user only wants a summary, translation, or rewrite
- the user wants direct usage help instead of creating a skill
- the request is unrelated to documentation-to-skill conversion

## Default workflow

1. Analyze the source material and scope
2. Judge suitability for skill conversion
3. Determine the target skill type
4. Extract capability units
5. Split knowledge into facts, rules, scenarios, examples, pitfalls, migration, and gaps when applicable
6. Design the target skill structure
7. Draft the target SKILL.md and references plan

## Output requirements

Unless the user requests otherwise, include:

1. source material analysis
2. suitability judgment
3. recommended target skill type
4. target skill definition
5. capability map
6. knowledge-layer breakdown
7. suggested references structure
8. draft SKILL.md
9. gaps and follow-up suggestions

## Working rules

- Convert documentation into capabilities, not just summaries
- Organize outputs around user tasks, not source headings
- Prefer practical guidance over passive description
- Clearly separate documented facts from derived guidance
- Do not invent unsupported APIs, features, or guarantees
- State missing information explicitly when the source material is incomplete
- Keep the target skill scoped and maintainable
- If the material spans multiple distinct domains, consider proposing multiple skills instead of one overloaded skill

## References

See `references/` for detailed guidance on analysis, skill typing, capability extraction, knowledge layering, references planning, output templates, examples, pitfalls, gaps, and migration.
