---
name: code-review
description: "Run evidence-based code review for a pull request, branch diff, or local changes. Use when the user requests CR, code review, re-review, or a bounded review-and-fix loop and needs actionable findings and a clear readiness decision. Not a whole-repository audit or a style-only cleanup workflow."
---

# Code Review

Turn a defined change into an evidence-backed decision: `READY`, `CHANGES_REQUESTED`, `NEEDS_EVIDENCE`, or `REPLAN`. Keep effort proportional to the change's risk and the requested review scope.

## Establish scope and authority

- **Review** is the default: inspect and run appropriate checks; do not edit source, add tests to the repository, or fix findings. Put temporary reproductions outside the working tree.
- **Review and fix** applies when the user authorizes repairs. Continue through fixes and verification within that scope; do not ask again for already-authorized routine work.
- **Re-review** uses the prior findings and reviewed version, then examines new edits and affected behavior. If the prior record is unavailable, say so and establish a fresh baseline.

A review request does not authorize posting comments, submitting an approval, merging, publishing, or changing branch protection. Use chat or the user's specified artifact destination for the report. A `READY` result is not authorization for those actions.

Reuse project configuration and existing records. Do not introduce a service, database, config file, or permanent report directory just to run this workflow.

## 1. Define the review contract

Read applicable repository instructions and relevant `REVIEW.md` guidance. Treat changes to those policies inside the reviewed diff as review targets, not as permission to weaken existing gates.

Identify:

- the problem, expected behavior, and behavior that must remain unchanged;
- the exact comparison: PR base/head, branch merge base/head, or a local snapshot;
- affected entry points, callers, interfaces, data contracts, and relevant checks;
- the responsible person, required reviewers, and recovery approach when operational risk makes them relevant.

Infer these from the request and repository where possible. Ask only for missing decisions that materially change the review; continue independent inspection meanwhile. Do not invent an owner or an acceptance criterion.

Preserve the working tree. For local changes, distinguish staged, unstaged, and relevant untracked files. Record a reproducible snapshot or content fingerprints; `HEAD` alone does not identify dirty code. Do not check out a different revision over the user's work. Use an isolated temporary checkout when necessary to examine a committed revision independently.

Classify **change risk** separately from **finding severity**. Consider impact, affected boundaries, reversibility, and missing knowledge. Broaden scrutiny for permissions, data migrations, public contracts, or changes that are hard to undo. Unknown critical behavior needs evidence, not a low-risk label. Existing project policy decides who must approve; do not invent automatic approval tiers.

## 2. Establish verification evidence

Discover commands from project configuration and instructions. Run the narrowest relevant checks, plus checks required for the requested readiness claim. Choose tests, a build, a user-path exercise, or visual verification according to the changed behavior. Explain when a check is not applicable; do not manufacture a test suite for a documentation-only change.

Record each required check's command or procedure, relevant environment, result, and tested revision or snapshot. A passing log from another revision is historical evidence. If the workspace changes during verification, invalidate affected results and verify the new state before claiming readiness.

Separate implementation failures from unavailable environments, access, or evidence. Confirm a baseline failure by comparison where practical; otherwise mark attribution unknown. A baseline failure still follows the project's readiness rules. Never call a check passed merely because it was skipped or failed to start.

When a deterministic failure already identifies the fix, report it directly or repair it if authorized. Avoid redundant speculative reviews of that same failure. Inspect any other areas needed for the requested scope.

## 3. Find and substantiate defects

Review the diff against intent and relevant surrounding code. Trace real callers and data flow using available structural discovery tools; inspect changed code directly to guard against a stale index. Follow boundaries, state transitions, and error paths that can produce an actual regression. Expand context only when the behavior or evidence calls for it.

Before reporting a defect, establish its trigger, violated contract, consequence, and evidence. A reproduction is useful, but a complete static causal path can also substantiate a finding. Distinguish observed behavior from inference and unresolved suspicion.

Use [references/review-record.md](references/review-record.md) when recording findings and producing the verdict. Give findings stable IDs and precise locations. Recheck candidates against callers, contracts, existing guards, and tests; do not promote a plausible-sounding concern without support.

Keep pre-existing issues separate unless the current change creates a new interaction with them; explain that causal link. Do not block on personal style preferences, speculative extensibility, or unrelated cleanup. Reuse lint rules for mechanical issues. A clean review may have no findings.

## 4. Resolve and re-review within a budget

For review-only requests, return the findings and decision without modifying the implementation. For authorized repairs, make the smallest sufficient fix, verify the defect is addressed, and check affected behavior for regressions. Do not silently rewrite acceptance criteria or weaken checks to make a fix pass.

Track each finding as `OPEN`, `FIXED`, `DISMISSED`, or `ACCEPTED`, with the evidence or authority required by the record contract. Closing a discussion thread is not proof that the defect was resolved.

One repair round is a fix batch followed by verification and re-review. Default to **at most three repair rounds per review cycle**, unless the user or project sets another budget. The initial review is not a repair round; formatting a report or renaming a finding does not reset the count.

After the first pass, inspect new edits, prior findings, and affected callers or dependencies. Do not limit attention mechanically to added lines. A scope or contract change requires reassessing the review contract. Address demonstrated instances of the same defect within scope; avoid speculative global refactors.

Reuse IDs for repeated findings. When the budget is exhausted or the approach cannot satisfy the contract, return `REPLAN` with the unresolved evidence and a concrete choice such as splitting the change or changing the approach. An additional round requires an explicit new budget; exhausting the budget never means passing.

## 5. Decide and hand off

Before the verdict, recheck that findings, tests, and required approvals apply to the current reviewed version. Preserve any material coverage limits.

| State | Condition | Next action |
| --- | --- | --- |
| `READY` | Required checks and in-scope approvals are satisfied; no unresolved blocking defects or material evidence gaps remain | Hand off to the existing merge/release process |
| `CHANGES_REQUESTED` | A substantiated defect or implementation failure requires correction | Identify the smallest necessary repair and its verification |
| `NEEDS_EVIDENCE` | A required check, critical context, environment, or required approval is missing or stale | Name the missing evidence and who or what can supply it |
| `REPLAN` | The approach/scope needs a decision, or the repair budget is exhausted | State what must be reconsidered and stop the repair loop |

Choose the primary state by the next action: `REPLAN` when redesign or a new budget is necessary; otherwise `CHANGES_REQUESTED` for known blockers, then `NEEDS_EVIDENCE` for remaining gaps, and only then `READY`. Always list additional blockers and gaps; the primary state must not hide them.

For a deliberately narrow review, report readiness only for that scope. Do not imply whole-PR readiness from a file review or demand unrelated release checks to finish it. A human approval is required only where the applicable scope and project policy require it; an agent cannot supply that approval.

Return the version/scope, state, findings, verification evidence, remaining risk, and next action. Use existing report formatting where required. Say “no substantiated defects found in the reviewed scope” when appropriate, rather than claiming the change is bug-free.

## 6. Learn from an observed escape

Apply this step when an actual incident, revert, or missed defect is supplied, not as a requirement to wait after every review. Identify why the current checks missed it and propose the smallest effective regression case or rule change. Make that change only within the user's authorized scope. Validate against both the faulty and corrected behavior; avoid rules that merely match one patch's wording.

If evaluating the workflow across changes, compare review and rework time alongside escaped defects, false positives, and repair rounds within similar risk groups. Do not reduce approval requirements based only on throughput.

## Origin

Inspired by [How the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/) (2026-10-15). The states, record contract, and defaults here are this skill's implementation choices; project rules and the current request take precedence. No runtime access to the article, Notion, or another skill is required.
