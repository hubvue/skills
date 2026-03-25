---
name: doc-generator
description: Use this skill when the user wants to generate, update, or improve usage documentation for a project, file, component, SDK, module, or function based on source code.
---

# Doc Generator Skill

## Purpose

This skill analyzes codebases, files, and symbols, then generates practical usage documentation.

The goal is not only to explain code, but to produce documentation that helps users understand:

- what this code/module does
- when it should be used
- how to use it correctly
- what constraints or risks exist
- what common misuse patterns should be avoided

This skill is intended for:

- component libraries
- SDKs
- utility libraries
- infrastructure libraries
- business shared modules
- core project modules

## Supported Targets

This skill supports the following target scopes:

1. **project-level**
   - entire repository
   - package
   - component library
   - SDK project

2. **file-level**
   - single file
   - module file
   - entry file
   - service / manager / composable / hook file

3. **symbol-level**
   - function
   - method
   - class
   - component
   - hook / composable
   - exported constant / config factory

## Core Principles

1. Documentation must be **usage-oriented**, not just implementation-oriented.
2. Prefer explaining **how to use**, **when to use**, and **what to watch out for**.
3. Prefer **minimal runnable examples** over abstract explanation.
4. Do not invent behavior that cannot be supported by code evidence.
5. Clearly mark uncertainty when behavior cannot be fully confirmed from source.
6. Distinguish between:
   - confirmed by code
   - high-confidence inference
   - requires verification
7. Generated docs must be readable by engineers who did not write the code.
8. When existing docs already exist, prefer **update / improve / align**, not blindly overwrite.

## Default Workflow

When invoked, follow this workflow:

1. Determine target scope:
   - project
   - file
   - symbol

2. Determine documentation intent:
   - readme
   - usage-guide
   - api-reference
   - module-guide
   - best-practices
   - faq
   - migration-guide
   - update-existing-doc

3. Inspect available evidence:
   - folder structure
   - exports
   - type definitions
   - comments
   - function signatures
   - call relationships
   - example code
   - tests
   - existing documentation
   - package metadata
   - config files

4. Build understanding:
   - responsibility
   - public surface
   - dependencies
   - usage flow
   - constraints
   - edge cases
   - risks
   - example patterns

5. Generate documentation in the requested format.

6. Run quality checks before finalizing.

## Required Behavior

### Always do

- explain the target’s responsibility in plain language
- identify public-facing APIs or exposed usage surfaces
- describe suitable scenarios and, if possible, unsuitable scenarios
- include at least one usage example when enough evidence exists
- include caveats / limitations / risk notes when relevant
- explicitly state uncertainty when evidence is insufficient

### Never do

- fabricate business context
- fabricate runtime behavior
- claim compatibility not supported by evidence
- describe internal assumptions as facts
- output vague filler without concrete value
- rewrite code as documentation without interpretation

## Documentation Style

Documentation should be:

- clear
- structured
- practical
- concise but sufficiently informative
- focused on real usage

Prefer:

- direct statements
- scenario-based explanation
- minimal examples
- explicit constraints
- actionable warnings

Avoid:

- empty praise
- generic summaries
- repeating code names without interpretation
- over-explaining obvious syntax

## Uncertainty Policy

When the code does not provide enough evidence:

- mark the statement as **Inference**
- or mark as **Needs Verification**

Examples:

- Confirmed: visible directly from exports, types, or implementation
- Inference: strongly suggested by naming, call chain, or surrounding structure
- Needs Verification: depends on runtime, external system, hidden contract, or business rules

## Output Preference

Unless the user specifies otherwise:

- project-level → produce `README` or `usage guide`
- file-level → produce `module guide`
- symbol-level → produce `API reference`

## Reference Files

Read and follow:

- `references/overview.md`
- `references/input-schema.md`
- `references/output-rules.md`
- `references/analysis-rules.md`
- `references/doc-templates.md`
- `references/quality-checklist.md`

## Success Criteria

This skill succeeds when the produced documentation helps a new engineer answer:

- What is this for?
- When should I use it?
- How do I use it?
- What do I need before using it?
- What can go wrong?
- What is the safest recommended usage pattern?
