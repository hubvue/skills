# Anti-Patterns

Reject these patterns unless the user explicitly changes the compatibility contract.

## Forwarding the Old API

```js
function oldApi(...args) {
    return newApi(convert(args));
}
```

Why it fails: the old contract stays supported and continues attracting consumers. Update callers and delete it.

## Argument-Shape Dispatch

```js
function createUser(input, email) {
    return typeof input === 'string'
        ? createUserNew({ name: input, email })
        : createUserNew(input);
}
```

Why it fails: compatibility is hidden inside the replacement API. Expose only the new signature.

## Deprecated but Undeleted

Keeping a deprecated alias or export without active callers still preserves the old contract. Delete the definition and its consumers.

## Runtime Dual Path

```js
return flags.useNewDesign ? runNew() : runOld();
```

Why it fails: two implementations and two failure modes become permanent. Use a one-way coordinated cutover instead.

## Silent Fallback

```js
return readNewShape(value) || readOldShape(value);
```

Why it fails: incomplete conversion remains invisible. Convert retained data and fail explicitly on invalid state.

## Parallel Legacy Tree

```text
src/legacy/
src/new/
```

Why it fails: ownership is ambiguous and deletion is deferred. Move consumers to the target boundary and remove the superseded tree.

## Rename-Only Refactor

Changing folders or symbols while preserving the same coupling does not solve the stated design problem. Verify responsibilities, dependencies, and invariants changed as intended.

## Unbounded Cleanup

Using a breaking refactor to rewrite adjacent systems makes review and recovery harder. Keep unrelated modernization separate.

## Unsafe “No Migration” Interpretation

Skipping a data conversion, backup, deployment plan, or external consumer analysis is not architectural cleanliness. Remove runtime compatibility without discarding transition safety.
