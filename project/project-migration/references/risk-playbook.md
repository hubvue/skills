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
The pilot is too simple to expose real problems, or too core to be safe.

### Recommendation
- Pick a medium-complexity module
- Make sure it covers page, API, state, style, and permission differences
- Ensure at least one teammate understands it well enough to support investigation

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
