# Phase: intake

## Purpose

Convert a product request / PRD / idea into a clear requirement artifact for the task.

## Inputs

Possible inputs include:
- PRD
- user request
- feature description
- issue report
- acceptance expectation
- constraints from stakeholders

## Outputs

Required:
- `task.md`
- initialize `status.json`

## Process

1. Identify the task objective.
2. Clarify scope and non-goals from available information.
3. Extract or infer acceptance criteria.
4. Capture constraints, dependencies, and assumptions.
5. Create or update `task.md`.
6. Initialize `status.json` with current phase state.

## Completion Criteria

Complete when:
- `task.md` exists
- goal and scope are clear enough for engineering research to begin
- acceptance criteria are captured at least at a practical level

## Output Guidance

Summarize:
- requirement goal
- scope boundaries
- acceptance targets
- next phase: research
