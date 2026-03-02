# Phase: Intake

## Goal

Create or update the task record so the workflow has a stable home for the work.

## Must do

- create or update `task.md`
- create or update `status.json`
- capture the original request or latest task update
- define the task title
- define current scope
- note non-goals when they are apparent
- capture known constraints and dependencies
- set or update current phase and status

## Must not do

- do not perform deep code analysis
- do not pretend implementation details are already known
- do not silently merge separate requirements into one task

## Required outputs

- `task.md`
- `status.json`

## Update mode

If `task.md` already exists:
- preserve prior scope history
- append changes rather than replacing history
- mark new constraints clearly
- update phase history
- refresh `updated_at` or equivalent metadata

If `status.json` already exists:
- update current phase
- update task status
- update artifact availability
- preserve continuity rather than resetting the task

## Completion standard

Intake is complete when the task has:
- a stable identity
- a clear title
- a readable scope
- visible constraints
- an initialized status record
