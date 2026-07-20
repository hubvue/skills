# Quality Gates and Question Loop

Every phase has an input gate and an output gate. A phase may not become `passed` until both pass.

## Input gate

Before substantive phase analysis:

1. Read the complete valid prefix, research artifacts, source registry, workflow log, phase input, and answered pending questions.
2. Evaluate the phase-specific required context listed in its reference.
3. Classify each gap as:
   - `derivable`: answerable from existing artifacts;
   - `researchable`: answerable from external evidence;
   - `user_required`: an internal fact, preference, constraint, observation, or decision only the user can provide;
   - `non_critical`: safe to retain as an explicit assumption.
4. Resolve derivable gaps and plan researchable gaps before asking the user.
5. Pass the input gate only when no decision-critical `user_required` gap remains.

Do not ask for information already present, externally researchable facts, optional detail, or precision that would not change the phase decision.

## Single-question protocol

When a decision-critical `user_required` gap remains:

1. Choose the unanswered gap with the greatest expected impact on the phase decision.
2. Ask exactly one atomic question about one fact or decision.
3. Ask in the user's current language; translate phase-reference examples when needed.
4. Do not combine questions with “and”, nested bullets, multiple question marks, or a hidden list of requested fields.
5. Across commentary and final output for the turn, emit only one interrogative sentence and one question mark; do not add rhetorical or non-blocking questions elsewhere.
6. Options or examples are allowed only when they clarify the same single field.
7. Before asking, persist `pendingQuestion`, mark the input gate `needs_context`, set the phase to `needs_data`, set the workflow to `paused`, and append `quality_gate_failed` plus `question_asked` events.
8. End the turn after a concise reason and that one question. Do not continue research, analysis, or artifact finalization in that turn.
9. Treat the next relevant user response as the answer even when it does not repeat the slash command.
10. Append the raw answer as `question_answered`, clear `pendingQuestion`, and reevaluate the entire input gate before deciding whether to ask another question.
11. Use all useful information in an answer, including facts that resolve later queued gaps.
12. Never repeat an answered question. If the user says the answer is unknown or unavailable, record that fact and either proceed with an explicit assumption, research it, or pause on a different decisive gap.

A phase may ask multiple questions across multiple turns. There is no fixed question count; stop asking when the remaining gaps are non-critical or the phase can make a defensible `need_data` or `stop` decision.

## Output gate

After research and analysis, verify:

1. every required output section from the phase reference is present;
2. claims are classified as facts, inferences, or assumptions;
3. citations resolve to unique source-registry IDs when external evidence is used;
4. the evidence level matches the strength and conflicts of the evidence;
5. missing information and risks are explicit;
6. the conclusion follows from the analysis and uses a valid status/decision pair;
7. downstream handoff states what the next phase may rely on;
8. no unresolved decision-critical user-context gap is hidden as an assumption.

If item 8 fails, re-enter the single-question protocol. If another item fails, repair the draft or use `blocked` with `retry` for an execution failure. Do not mark the phase `passed` merely because files exist.

## Valid status and decision pairs

| Phase status | Decision | Meaning |
|---|---|---|
| `passed` | `continue` | Both gates passed |
| `stale` | `revise` | This phase found an upstream conclusion that must change |
| `needs_data` | `need_data` | Waiting for one or more question-loop turns or external evidence |
| `blocked` | `retry` | Recoverable execution or dependency failure |
| `stopped` | `stop` | Incubation ended with a terminal decision |

A `revise` transition requires `targetPhase`; downstream phases invalidated by the revision may be `stale` with a null decision. The target phase becomes active and must eventually resolve to a non-stale pair.
