# Phase: Plan

## Goal

Turn research into a concrete, reviewable implementation strategy.

## Must do

- base planning on `research.md` when available
- if research is missing, perform lightweight explicit research first
- create or update `plan.md`
- describe intended approach and scope alignment
- identify affected files/modules
- explain implementation steps
- describe risks, trade-offs, and validation strategy
- leave the result reviewable by a human

## Must not do

- do not start broad implementation while in planning
- do not hide assumptions
- do not introduce major work outside the current task scope
- do not treat planning as complete if open questions are still critical and unstated

## Required output

- `plan.md`

## Dependency healing

If `research.md` is missing:
- run lightweight explicit research first
- create or update `research.md`
- then continue planning

Always state that dependency healing occurred.

## Recommended `plan.md` sections

- Task ID
- Title
- Goal
- Scope Confirmation
- Research Summary
- Proposed Approach
- File / Module Impact
- Step-by-Step Change Strategy
- Trade-offs / Alternatives
- Risks
- Validation / Testing Strategy
- Open Questions
- Review / Annotation Notes
- Revision History

## Update mode

If `plan.md` already exists:
- preserve earlier plan context where still valid
- append a revision summary
- identify what changed and why
- keep earlier decisions unless invalidated
- do not silently discard previous approved direction

## Planning quality bar

A good plan should help a reviewer answer:
- what will change?
- where will it change?
- why this approach?
- what are the main risks?
- how will we validate the result?
