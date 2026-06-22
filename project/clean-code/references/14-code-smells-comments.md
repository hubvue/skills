# Rule: Code Smells - Comments

> 注释坏味道通常说明代码表达能力不足，优先重构。

## 1. Inappropriate information

作者、修改历史等不应放注释。

```ts
// Bad
// Modified by Kim on Monday

// Good
// Use Git history for authorship and change logs.
```

## 2. Obsolete comments

过期注释必须更新或删除。

```ts
// Bad
// Save to localStorage
saveToIndexedDB(draft)

// Good
saveToIndexedDB(draft)
```

## 3. Redundant comments

不要重复代码已经表达的内容。

```ts
// Bad
// return user name
return user.name

// Good
return user.name
```

## 4. Poorly written comments

看不懂的注释应重写或用代码表达。

```ts
// Bad
// special handle this weird thing
processLegacyOrder(order)

// Good
// Legacy orders miss currency; default to SGD before migration.
processLegacyOrder(order)
```

## 5. Commented-out code

注释掉的旧代码应删除。

```ts
// Bad
// oldSubmit(order)
submitOrder(order)

// Good
submitOrder(order)
```
