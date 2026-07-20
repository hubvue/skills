# Risk Playbook

## 1. The old repository keeps changing during migration
### Signal
New features and fixes continue landing in the old repository, causing migration drift.

### Recommendation
- Decide whether the old repository can be frozen
- If it cannot be frozen, define a synchronization owner and mechanism
- Track important increments in a migration backlog

---

## 2. Implicit dependencies are missed
### Signal
Pages open, but messaging, permissions, analytics, uploads, or theming behave incorrectly.

### Recommendation
- Audit global mixins, prototype injections, `window` injections, and globally registered components
- Create focused checklists for high-risk global capabilities

---

## 3. Migration turns into a rewrite
### Signal
The first migration phase tries to upgrade frameworks, replace UI libraries, redesign state flow, and normalize all code style at once.

### Recommendation
- Migrate mechanically first, normalize later
- Limit pilot work to necessary change only
- Put opportunistic cleanup behind explicit scope control

---

## 4. The pilot module is a bad choice
### Signal
The pilot is too simple to expose real problems, too core to be safe, or produces working output without proving that the rules, Judge, queue, and review loop are reliable.

### Recommendation
- Pick a medium-complexity module
- Make sure it covers page, API, state, style, and permission differences
- Ensure at least one teammate understands it well enough to support investigation
- Grade the migration process as well as the pilot output
- Record whether the output is retained or discarded

---

## 5. Release flow is validated too late
### Signal
The app works locally but fails in staging or production, often due to public paths, environment variables, asset paths, gateway config, or micro-frontend mounting differences.

### Recommendation
- Validate staging early
- Compare base path, asset path, and gateway or web server config up front
- Verify monitoring, analytics, and rollback behavior early

---

## 6. Style migration drifts visually
### Signal
Functionality works, but visual behavior is noticeably off, especially when switching UI libraries or theme variable systems.

### Recommendation
- Perform a style asset inventory first
- Build a design token mapping table if needed
- Compare buttons, forms, tables, modals, spacing, and typography carefully

---

## 7. Progress is hard to measure
### Signal
The team says migration is happening, but there is no clear status, progress, or remaining risk picture.

### Recommendation
- Maintain migration batches and an execution log
- Record scope, status, blockers, and next steps per batch
- Do not use “number of files moved” as the main progress metric

---

## 8. There is no rollback plan
### Signal
A migrated module cannot be switched back quickly if problems appear.

### Recommendation
- Define rollback for pilots and critical batches
- Clarify cutover method, old-entry retention window, and validation steps
- Do not switch high-risk flows without rollback readiness

---

## 9. The new repository gets polluted by compatibility layers
### Signal
Temporary adapters never get removed, so the new repository becomes a host for old logic.

### Recommendation
- Record why each compatibility layer exists, when it can be removed, and the intended removal trigger
- Make cleanup a required output of the `cleanup` phase

---

## 10. The migration has no visible business value
### Signal
The migration consumes time, but stakeholders only see cost.

### Recommendation
- Track at least three classes of metrics: delivery efficiency, stability, and build/release efficiency
- Example metrics: build time, blank-screen rate, regression defect count, average changed files per task, onboarding time for a new page

---

## 11. The Judge is weak or broken
### Signal
The Judge passes deliberately invalid isolated inputs, fails nondeterministically, or reports widespread differences caused by comparator normalization rather than migrated behavior.

### Recommendation
- Establish the old-system baseline and inherited failures first
- Repeat known-good runs to expose nondeterminism
- Use a safe negative control in an isolated fixture, mock, or disposable branch/worktree
- Debug comparator normalization and environment differences before trusting its verdicts

---

## 12. Rule revisions drift across active workers
### Signal
Different units cite different decisions for the same ambiguity, or workers update the Rulebook while other workers are still reading the old revision.

### Recommendation
- Treat the Rulebook as read-only inside an active concurrent batch
- Queue amendments and publish one visible revision at the batch boundary
- Mark every affected completed unit `revalidation_required`

---

## 13. The execution queue cannot resume mechanically
### Signal
Progress depends on chat history, individual memory, or a manually reconstructed list of completed files.

### Recommendation
- Use stable unit IDs, dependency IDs, statuses, and completion evidence
- Derive readiness from durable queue state
- Require output, resolved independent review, and Judge evidence before `done`

---

## 14. Review inherits implementation bias
### Signal
The same context writes and approves the change, or review accepts the Implementer's reasoning as evidence without checking source behavior and applicable rules.

### Recommendation
- Separate Implementer and Reviewer responsibilities
- Use separate contexts when available
- In single-agent mode, start a fresh restricted-context review pass using source evidence, rules, output/diff, and acceptance conditions

---

## 15. Expensive operations contend or duplicate work
### Signal
Multiple workers trigger full builds, suites, deploys, or environment resets concurrently, causing wasted cost, stale results, or shared-state failures.

### Recommendation
- Measure operation cost and statefulness before placing it in the loop
- Keep cheap isolated checks per unit
- Assign one coordinator to expensive shared operations and publish versioned result IDs
- Map each failure back to queue units before the next run
