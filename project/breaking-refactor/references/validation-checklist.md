# Validation Checklist

Record evidence for applicable items. Mark irrelevant or unavailable checks honestly.

## Contract and Scope

- [ ] The authorized ownership boundary is explicit.
- [ ] All known consumers are inventoried.
- [ ] Must-remain, must-change, and incidental behavior are separated.
- [ ] Each incompatible contract change is documented.
- [ ] Data loss, downtime, and external cutover decisions are explicit.

## Implementation

- [ ] The target design has one source of truth.
- [ ] Every in-scope caller, producer, and consumer uses the new contract.
- [ ] Types, tests, fixtures, mocks, examples, and docs use the new contract.
- [ ] Generated artifacts were regenerated from their source.
- [ ] One-time conversion code is isolated from normal runtime.

## Legacy Removal

Search for the actual removed identifiers and paths. Also inspect relevant uses of:

```text
legacy
deprecated
compat
adapter
wrapper
fallback
temporary
oldMode
useOld
```

Do not delete legitimate matches by keyword alone.

- [ ] Removed symbols have no definitions or references.
- [ ] Old import paths, exports, routes, fields, flags, and config keys are absent.
- [ ] No old-to-new forwarding wrapper remains.
- [ ] No runtime dual-read, dual-write, or mode branch remains.
- [ ] No stale snapshots, fixtures, docs, or comments describe the old design.
- [ ] Deleted files are not still referenced by build or deployment configuration.

## Verification

- [ ] Focused tests pass.
- [ ] Type checking passes.
- [ ] Linting passes.
- [ ] The affected build passes.
- [ ] Repository-wide tests covering consumers pass.
- [ ] End-to-end or smoke checks cover the critical cutover path.
- [ ] The final dependency or call graph contains no residual consumer.
- [ ] The final diff contains no unrelated churn or hidden compatibility path.

## Data and Operations

- [ ] Conversion or rebuild succeeds on representative data.
- [ ] Backup and recovery steps are tested or the limitation is stated.
- [ ] Partial failure behavior is defined.
- [ ] Deployment ordering and any irreversible point are documented.
- [ ] Monitoring can distinguish a successful cutover from silent data loss.

## Completion

- [ ] The old design is removed, not merely unused.
- [ ] All required checks pass, or failures are reported with impact.
- [ ] Remaining risks and unknown consumers are explicit.
- [ ] Final artifacts match the implemented design.
