# Migration Checklists

## 0. Migration Case and Posture Checklist
- [ ] Expected business or engineering gains are explicit
- [ ] Cost drivers and constraints are recorded
- [ ] No-go criteria are defined
- [ ] The selected posture is structure-preserving, redesign, incremental, or hybrid
- [ ] The unit of work matches the posture and dependency reality
- [ ] "Do not migrate" remains an acceptable conclusion

## 1. Inherited Undocumented Project Checklist
- [ ] The project can run locally
- [ ] Install, dev, build, and release commands are recorded
- [ ] Entry file, routing entry, and build entry are identified
- [ ] Main business modules are mapped
- [ ] Core flows are documented
- [ ] Request layer, state layer, permissions, and style entry are understood
- [ ] Implicit dependencies such as global registration, global mixins, prototype injections, and `window` injections are recorded
- [ ] A minimum project map exists

## 1.1 Judge Inventory Checklist
- [ ] Existing checks are classified as public-behavior or source-internal
- [ ] The old-system baseline and inherited failures are recorded
- [ ] Known nondeterminism and environment dependencies are recorded
- [ ] Candidate parity scenarios cover critical observable behavior
- [ ] Missing Judge coverage is explicit

## 2. Old vs New Repository Difference Checklist
- [ ] Node and package manager differences are recorded
- [ ] Build tool differences are recorded
- [ ] Directory structure differences are recorded
- [ ] Routing and permission differences are recorded
- [ ] State management differences are recorded
- [ ] Request layer differences are recorded
- [ ] UI library and style system differences are recorded
- [ ] CI/CD and release flow differences are recorded
- [ ] Compatibility layer needs are marked
- [ ] Canonical ambiguous decisions are recorded in the Rulebook
- [ ] Concrete non-default sites are recorded in the Gap Inventory
- [ ] Dependency ordering and cycles are documented where they affect execution

## 2.1 Judge Readiness Checklist
- [ ] Old and target systems can be evaluated on comparable inputs
- [ ] Comparator normalization and nondeterminism handling are defined
- [ ] A known-good run is repeatable
- [ ] A safe negative control is run only in an isolated fixture, mock, or disposable branch/worktree
- [ ] The Judge demonstrably catches the negative control
- [ ] Judge cost determines whether checks run per unit, per batch, or through a coordinator

## 3. Pilot Module Selection Checklist
- [ ] It is not the most critical flow
- [ ] It is not too trivial
- [ ] It covers most of the differences across pages, APIs, state, styles, and permissions
- [ ] At least one team member understands the module well enough to support debugging
- [ ] It can be validated independently
- [ ] It has a rollback or switch-back path
- [ ] The pilot method matches the selected migration posture
- [ ] The pilot exercises the intended implement-review-fix process
- [ ] Rule obedience and Judge usefulness are evaluated
- [ ] Queue stop/resume behavior is tested from durable state
- [ ] Independent review is completed
- [ ] Retain/discard disposition is explicit

## 4. Module Migration Execution Checklist
- [ ] Route integration is complete
- [ ] Layout / shell integration is complete
- [ ] Permission flow passes validation
- [ ] Request layer integration is complete
- [ ] Store / state integration is complete
- [ ] Style rendering is acceptable
- [ ] Core interactions pass
- [ ] Analytics / monitoring are healthy
- [ ] Compatibility layers and leftovers are documented
- [ ] The unit references applicable Rulebook and Gap IDs
- [ ] Independent review findings are resolved
- [ ] Required Judge evidence passes
- [ ] Completion is recorded in the durable queue, not inferred from chat history
- [ ] Repeated failures are classified as isolated or systemic
- [ ] Systemic failures update the producing process before further fan-out
- [ ] Affected completed units are marked `revalidation_required`
- [ ] Expensive shared operations have one coordinator when applicable

## 5. Verification Checklist
- [ ] Page is reachable
- [ ] APIs behave correctly
- [ ] Permissions behave correctly
- [ ] Analytics behave correctly
- [ ] Monitoring behaves correctly
- [ ] No obvious performance regression
- [ ] Rollback has been validated
- [ ] The old baseline was rerun or inherited failures were accounted for
- [ ] Old and target systems were evaluated on comparable inputs
- [ ] Parity counts and unresolved gaps are recorded
- [ ] Comparator limitations and nondeterminism are recorded
- [ ] Every accepted difference has an owner and rationale
