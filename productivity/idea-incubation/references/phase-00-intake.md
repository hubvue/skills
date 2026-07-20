# Phase 00: Intake

## Purpose

Capture the raw idea without prematurely turning it into a solution. Create the durable workspace and establish the initial questions.

## Inputs

- Raw idea text
- Optional source, proposer, and background

## Work

1. Preserve the original wording.
2. Extract the problem hypothesis, proposed beneficiary, desired change, and solution assumptions.
3. Identify ambiguous concepts and missing context.
4. Generate the idea ID, title, workspace, and initial status.
5. Search only when an unfamiliar or current term must be understood before recording the idea.

Suggested search questions:

- What does an unfamiliar concept currently mean?
- Does the named product, platform, or technology exist in the described form?

## Input quality gate

Require the original idea text and enough context to infer at least a tentative problem or beneficiary. Resolve missing context using this internal question priority, one question per turn:

1. “请用一句话描述你想孵化的原始想法。”
2. “这个想法首先希望为哪一类人带来改变？”
3. “他们当前最需要改变的具体问题是什么？”

Pass when the raw idea is preserved and either the problem or beneficiary is identifiable without invention.

## Output

Write `00-idea-intake.md` with:

- raw idea;
- source and proposer, when known;
- initial background;
- key concepts;
- problem and solution hypotheses;
- missing information;
- Evidence Block;
- phase conclusion and downstream handoff.

Write `research/00-intake-research.md` even when no search is used.

## Output quality gate

Verify that original wording is preserved, problem and solution hypotheses are separated, critical ambiguity is explicit, the Evidence Block is complete, and no unsupported solution detail has been promoted to fact.

## Completion

`continue` when the idea is captured well enough to investigate its motivation. Use `need_data` only when the raw idea is too incomplete to identify even a tentative problem or beneficiary.
