# Compensatory Complexity Anti-Patterns

## Contents

- [Re-validating internal types](#re-validating-internal-types)
- [Hiding contract errors with fallbacks](#hiding-contract-errors-with-fallbacks)
- [Auto-normalizing unknown states](#auto-normalizing-unknown-states)
- [Creating an abstraction for a single call site](#creating-an-abstraction-for-a-single-call-site)
- [Upgrading a direct branch into a config system](#upgrading-a-direct-branch-into-a-config-system)
- [Catching exceptions and pretending success](#catching-exceptions-and-pretending-success)
- [Keeping old behavior on your own](#keeping-old-behavior-on-your-own)
- [State bloat](#state-bloat)
- [Drive-by refactors that expand scope](#drive-by-refactors-that-expand-scope)
- [Inventing tests for hypothetical boundaries](#inventing-tests-for-hypothetical-boundaries)

The examples below use TypeScript, but the judgment applies to other languages.

## Re-validating internal types

### Bad

```ts
interface User {
  name: string;
}

function getDisplayName(user: User): string {
  if (!user || typeof user !== "object") return "";
  if (!("name" in user) || typeof user.name !== "string") return "";
  return user.name.trim();
}
```

### Good

```ts
function getDisplayName(user: User): string {
  return user.name;
}
```

The type already guarantees that `user.name` exists. Extra checks are justified only when the argument comes from an unvalidated boundary, or the type itself allows empty values.

## Hiding contract errors with fallbacks

### Bad

```ts
const items = response?.data?.items ?? [];
```

If `items` must exist by interface contract, this disguises an interface error as a normal empty list.

### Good

```ts
const items = response.data.items;
```

If the product explicitly requires an empty state when the interface fails, implement that recovery in a defined error-handling layer, not as a silent fallback in every consumer.

## Auto-normalizing unknown states

### Bad

```ts
function isSuccess(status: unknown): boolean {
  return (
    typeof status === "string" &&
    status.trim().toLowerCase() === "success"
  );
}
```

When the requirement only defines a strict status value, this code independently adds compatibility for case, whitespace, and unknown types.

### Good

```ts
function isSuccess(status: Status): boolean {
  return status === "success";
}
```

Normalize once at the boundary only when the real input protocol allows a loose format.

## Creating an abstraction for a single call site

### Bad

```ts
function shouldShowDeleteButton(status: Status): boolean {
  return status !== "archived";
}

const visible = shouldShowDeleteButton(item.status);
```

This helper only moves a direct condition. It does not create reuse or an independent business responsibility.

### Good

```ts
const visible = item.status !== "archived";
```

Extract a named function only if the same business rule is already used at multiple call sites, or the repository requires centralized permission rules.

## Upgrading a direct branch into a config system

### Bad

```ts
const STATUS_VISIBILITY: Record<Status, boolean> = {
  active: true,
  disabled: false,
};

const visible = STATUS_VISIBILITY[status] ?? false;
```

When the requirement is only to hide when `disabled`, this map and fallback introduce extra state commitments.

### Good

```ts
const visible = status !== "disabled";
```

Use a map only when multiple states truly have different configuration, and that configuration is consumed in multiple places.

## Catching exceptions and pretending success

### Bad

```ts
async function loadUser(): Promise<User | null> {
  try {
    return await api.getUser();
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

Callers cannot distinguish "no user" from "request failed."

### Good

```ts
async function loadUser(): Promise<User> {
  return api.getUser();
}
```

Let the existing error boundary handle failure. Catch only when this layer defines a real recovery behavior.

## Keeping old behavior on your own

### Bad

```ts
export function getTitle(data: NewData | LegacyData): string {
  if ("title" in data) return data.title;
  return data.name;
}
```

When the task already requires migrating to `NewData`, this implementation keeps the old type and old path without evidence.

### Good

```ts
export function getTitle(data: NewData): string {
  return data.title;
}
```

Keep compatibility logic only when a support matrix or migration plan explicitly requires it, and mark the exit condition.

## State bloat

### Bad

```ts
const [isLoading, setIsLoading] = useState(false);
const [hasLoaded, setHasLoaded] = useState(false);
const [loadSucceeded, setLoadSucceeded] = useState(false);
const [loadFailed, setLoadFailed] = useState(false);
```

Multiple booleans can form contradictory combinations, while the requirement may only need the existing request state.

### Good

```ts
const { data, error, isLoading } = useQuery(queryOptions);
```

Prefer reusing an existing state source. Add state only when the business truly has an extra, independent, observable lifecycle.

## Drive-by refactors that expand scope

### Bad

Requirement: fix a button's disabled condition.

The implementation also:

- Renames the component's entire props surface
- Extracts a generic button component
- Tweaks unrelated CSS
- Formats the whole directory
- Changes same-named variables on other pages

These changes make the diff hard to review and expand the regression surface.

### Good

Change only the expression that owns the disabled condition, and the corresponding tests. Adjacent issues that do not block the current requirement stay out of this change.

## Inventing tests for hypothetical boundaries

### Bad

```ts
it("handles numeric, object, null, whitespace and mixed-case status", () => {
  // Production types only allow "active" | "disabled"
});
```

To satisfy these tests, production code then adds many type and normalization branches, creating a self-justifying loop.

### Good

```ts
it("hides the action when status is disabled", () => {
  // Verify the current explicit business behavior
});
```

If the status comes from unvalidated external input, test illegal input at the parsing boundary. Do not repeat defensive logic in every business consumer.
