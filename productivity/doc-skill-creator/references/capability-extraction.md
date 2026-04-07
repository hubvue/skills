# capability-extraction

## Purpose

Turn document content into skill capabilities.

## Core rule

Do not mirror document headings directly.
Convert them into user-facing abilities.

## Conversion examples

### Document-oriented structure
- installation
- button
- dialog
- form
- FAQ

### Capability-oriented structure
- setup guidance
- usage explanation
- scenario-based recommendation
- composition guidance
- troubleshooting support

## Common capability units

- usage explanation
- scenario recommendation
- option comparison
- minimal example generation
- integration guidance
- code adaptation
- troubleshooting guidance
- migration guidance
- standards guidance

## Extraction method

For each major section of the source docs, ask:

1. What user problem does this section help solve?
2. Is it factual, rule-based, scenario-based, or example-based?
3. Can it support explanation only, or also recommendation/generation/troubleshooting?
4. What are the boundaries of this capability?

## Output shape

- capability name
- what it helps with
- what evidence supports it
- whether support is strong / medium / weak
- what limitations apply
