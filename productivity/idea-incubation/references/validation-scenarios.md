# Validation Scenarios

Use these scenarios when forward-testing changes to the skill. Validate routing and state transitions, not the quality of a particular product idea.

Run `node scripts/validate-workspace.js <idea-workspace>` after every scenario that creates a workspace. Expected success or intentional failure must match the scenario.

1. **New intake**: `/idea-incubation intake <raw idea>` creates and activates one workspace, runs both gates, writes phase plus research artifacts, and sets intake revision to `1`.
2. **Insufficient intake**: `/idea-incubation intake` asks exactly one question and does not invent a problem or beneficiary.
3. **Single-question loop**: an incomplete answer causes one different highest-value question; a sufficient answer resumes the same phase without another slash command.
4. **Later target healing**: requesting `scope` with only intake present runs every invalid phase in order and stops at `scope`.
5. **Idempotent repeat**: invoking an unchanged passed phase without input changes no files, timestamps, or revision counts.
6. **Upstream revision**: changing `users` after `scope` snapshots `scope`, marks `scenarios` through `scope` stale, and revalidates them in order.
7. **Gate pause during reflow**: if `value` needs user context during reflow, the workflow pauses there and keeps later phases stale.
8. **Interrupted write**: a leftover `running` phase with partial artifacts becomes `blocked/retry`, preserves the draft, and retries without a premature revision increment.
9. **Multiple workspaces**: no active pointer plus multiple candidates persists one `pendingSelection`, asks exactly one workspace-selection question, and performs no phase mutation.
10. **Completed no-op**: invoking a completed workflow without new information preserves its decision and artifacts.
11. **Terminal reopen**: new material information reopens a completed or closed workflow, resets the final decision to `pending`, and follows revision/reflow rules.
12. **Early stop**: strong counter-evidence produces `stopped/stop`, a terminal decision, and no later phase execution.
13. **Assemble prerequisites**: assemble requires research artifacts for phases 00–10, creates phase 11 research itself, and completes only after its output gate passes.
14. **Question atomicity**: every paused turn contains one question about one field, with no compound request or preview of later questions.
