# Phase: Research

## Goal

Understand the current system and the task-relevant code before planning or broad implementation.

## Must do

- inspect relevant code, configuration, and behavior
- identify relevant files, modules, components, services, or flows
- describe the current implementation state
- identify constraints, risks, unknowns, and assumptions
- capture research findings in `research.md`

## Must not do

- do not implement the feature or fix as part of research
- do not skip documenting uncertainties
- do not claim strong conclusions without evidence
- do not turn research into planning or coding without explicit phase progression

## Required output

- `research.md`

## Recommended `research.md` sections

- Task ID
- Title
- Research Objective
- Current Understanding
- Relevant Files / Modules
- Data Flow / Control Flow / UI Flow
- Constraints Discovered
- Risks
- Unknowns / Open Questions
- Recommendations for Planning
- Change Log

## Update mode

If `research.md` already exists:
- preserve valid earlier findings
- add new findings incrementally
- mark invalidated assumptions explicitly
- append a revision or changelog entry
- avoid replacing the entire document unless explicitly requested

## Research quality bar

Good research should help a reviewer answer:
- what exists now?
- where are the relevant files?
- what could break?
- what is still unknown?
- what should planning pay attention to?
