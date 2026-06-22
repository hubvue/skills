---
name: feasibility-assess
description: Assess technical, product, business, cost, time, risk, and MVP feasibility. Use when the idea-to-requirement workflow reaches the `feasibility_assess` stage, or when independently producing `06-feasibility.md` from upstream stage documents.
disable-model-invocation: true
---

# Feasibility Assess

## Purpose

Assess technical, product, business, cost, time, risk and MVP feasibility.

This skill is one node in the evidence-driven Idea-to-Requirement pipeline. It can be used independently or orchestrated by `idea-requirement`.

## When to Use

Use this skill when the workflow reaches stage `feasibility_assess` or when you need to independently produce `06-feasibility.md` from the required upstream documents.

## Operating Rules

1. Read required upstream documents before analysis.
2. Check whether Web Search is required for this stage.
3. If Web Search is required, create a Research Plan before searching.
4. Record external evidence in `research/` and `sources/sources.json`.
5. Separate facts, inferences, and assumptions.
6. Always write the stage document to `06-feasibility.md`.
7. If information is missing or the stage cannot continue, still write a blocking stage document.
8. Update `status.json` after completion.
9. Return a clear decision: `continue`, `revise`, `need_data`, or `stop`.

## Required References

Read these references before executing:

- `references/stage-contract.md`
- `references/stage-template.md`
- `references/research-policy.md`
- `references/output-template.md`
- `references/skill-contract.md`
- `references/evidence-block.md`
- `references/sources-schema.md`
- `references/status-schema.md`

## Inputs

See `references/stage-contract.md`.

## Outputs

- Stage document: `06-feasibility.md`
- Research document: `research/06-feasibility-research.md` when search is used or when evidence must be documented.
- Updated `sources/sources.json` when external sources are used.
- Updated `status.json`.

## Execution Summary

Follow the procedure in `references/stage-contract.md`. Keep this `SKILL.md` lightweight; detailed stage instructions live in `references/`.
