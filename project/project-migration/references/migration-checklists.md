# Migration Checklists

## 1. Inherited Undocumented Project Checklist
- [ ] The project can run locally
- [ ] Install, dev, build, and release commands are recorded
- [ ] Entry file, routing entry, and build entry are identified
- [ ] Main business modules are mapped
- [ ] Core flows are documented
- [ ] Request layer, state layer, permissions, and style entry are understood
- [ ] Implicit dependencies such as global registration, global mixins, prototype injections, and `window` injections are recorded
- [ ] A minimum project map exists

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

## 3. Pilot Module Selection Checklist
- [ ] It is not the most critical flow
- [ ] It is not too trivial
- [ ] It covers most of the differences across pages, APIs, state, styles, and permissions
- [ ] At least one team member understands the module well enough to support debugging
- [ ] It can be validated independently
- [ ] It has a rollback or switch-back path

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

## 5. Verification Checklist
- [ ] Page is reachable
- [ ] APIs behave correctly
- [ ] Permissions behave correctly
- [ ] Analytics behave correctly
- [ ] Monitoring behaves correctly
- [ ] No obvious performance regression
- [ ] Rollback has been validated
