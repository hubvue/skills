# Phase 03: Scenarios

## Purpose

Restore concrete trigger moments, current workflows, target workflows, and scenario boundaries for the selected users.

## Inputs

- `02-users.md`
- `research/02-users-research.md`
- relevant earlier artifacts and `sources/sources.json`

## Work

1. Describe what happens before, during, and after the task.
2. Identify triggers, actors, tools, handoffs, workarounds, and outcomes.
3. Separate high-frequency core scenarios from low-frequency or edge scenarios.
4. Describe the desired workflow without assuming the final implementation.

Suggested search questions:

- How do users complete this task today?
- Which workflow steps generate complaints or workarounds?
- How do comparable products structure the flow?

## Input quality gate

Require a specific target user, one concrete trigger moment, and enough context to restore the current task. Use this internal question priority:

1. “目标用户通常在什么具体时刻遇到这个问题？”
2. “他们现在如何完成这个任务？”
3. “当前流程中最关键的交接点在哪里？”

Pass when at least one bounded before-during-after workflow can be described without assuming the final solution.

## Output

Write `03-scenarios.md` with:

- core scenarios and triggers;
- current workflow;
- desired workflow;
- critical path and handoffs;
- high- and low-frequency scenarios;
- scenario boundaries;
- Evidence Block;
- phase conclusion and downstream handoff.

Write `research/03-scenarios-research.md`.

## Output quality gate

Verify that trigger, actors, current flow, desired outcome, handoffs, frequency class, and boundary are explicit; the desired workflow expresses outcomes rather than invented implementation.

## Completion

`continue` when at least one concrete, bounded, evidence-aware scenario can be evaluated for pain. Revise `users` when scenarios cannot be made coherent for the selected target.
