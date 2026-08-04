# Breaking Change Patterns

Apply only the patterns relevant to the declared refactor contract.

## Function or Method Contract

Before:

```js
createUser(name, email);
```

After:

```js
createUser({ name, email });
```

Update direct callers, mocks, spies, type declarations, examples, generated clients, and documentation. Remove the positional signature instead of dispatching on argument shape.

## Export or Module Boundary

Move ownership to the target module, update imports and dependency injection registrations, then remove the old export and directory. Check aliases, barrel files, lazy imports, tests, build entries, and package export maps.

Do not re-export the new symbol from the old path.

## Domain Model or Serialized Shape

Before:

```json
{"name":"Tom"}
```

After:

```json
{"profile":{"nickname":"Tom"}}
```

Update producers, consumers, validators, persistence, fixtures, seeds, snapshots, telemetry, and docs. Convert retained data once or explicitly prove it is disposable. Do not read both shapes indefinitely.

## Database Schema

Design the final schema first. Add a tested cutover migration or rebuild procedure, update all queries and models, verify constraints and indexes, and remove obsolete columns or tables at the declared irreversible point.

A one-time migration is compatible with this skill; a permanent runtime branch for both schemas is not.

## Event, Message, or Job Contract

Inventory publishers, consumers, retry queues, dead-letter handling, replay tooling, and stored messages. Coordinate the cutover and decide how queued old-format messages are drained, converted, or discarded with explicit authorization.

Do not publish both versions or silently accept both indefinitely unless the user revises the compatibility policy.

## Configuration or Environment Contract

Update configuration schema, loaders, deployment manifests, CI secrets references, examples, local setup, and operational documentation. Fail clearly when the required new configuration is absent. Do not fall back silently to the removed key.

## Route or CLI Contract

Update dispatch, links or callers, auth and permission rules, automation, smoke tests, docs, monitoring, and runbooks. Remove the old route or command rather than leaving a redirect or alias unless that behavior is explicitly required.

## Test Contract

Rewrite tests around the intended invariant, not around deleted implementation details. Remove tests whose only purpose is preserving the old interface. Keep regression coverage for behavior classified as “must remain.”
