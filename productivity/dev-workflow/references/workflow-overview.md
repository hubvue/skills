# Workflow Overview

## What this skill is for

This skill turns AI-assisted coding into a **task-based, document-driven workflow**.

Instead of treating every request as "start coding now," it organizes work into explicit phases with durable artifacts. This makes the workflow easier to review, safer to iterate, and more robust when requirements change.

## The problem it solves

Unstructured AI coding often fails in predictable ways:

- the agent starts implementing before understanding the system
- plans exist only in chat and are hard to review
- requirement changes erase earlier context
- unrelated requirements get mixed together
- implementation scope silently expands
- no reliable task history is preserved

This skill fixes those issues by making work:
- task-scoped
- phase-based
- artifact-first
- update-friendly
- review-gated

## Why work by task

A task is the smallest stable unit of work for this workflow.

Tasks help isolate:
- requirements
- artifacts
- revisions
- implementation progress
- review history

Without task isolation, frequent iteration quickly causes confusion between:
- old assumptions
- new requirements
- implementation notes
- unrelated work items

## Why use phases

Phases keep workflow intent explicit.

Recommended sequence:
1. intake
2. research
3. plan
4. todo
5. implement
6. review

Users may enter at any phase, but the workflow should still respect dependencies through auto-healing.

## Why artifact first

Each phase produces durable outputs. Artifacts make the workflow:
- inspectable
- reviewable
- resumable
- updateable
- transferable

Artifacts are more reliable than hidden agent context.

## Why update instead of overwrite

Requirements often evolve. If every new iteration rewrites prior artifacts from scratch, the workflow loses:
- historical decisions
- invalidated assumptions
- revision context
- completed work state

Update mode preserves continuity and makes it easier to understand what changed.

## Why review-gated execution

Broad implementation should usually follow explicit research and planning.

This reduces:
- mis-scoped code changes
- architectural drift
- accidental breaking changes
- hidden agent assumptions

The goal is not to slow work down. The goal is to keep implementation grounded.

## What good workflow looks like

A healthy task should end up with:
- a clear task definition
- a current research document
- a reviewable plan
- an execution-ready todo list
- an implementation log
- a status record
- an obvious next step
