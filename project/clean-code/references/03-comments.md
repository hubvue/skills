# Rule: Comments

> 注释用于解释原因、背景和风险，不用于弥补混乱代码。

## 1. Do not compensate bad code with comments

优先重构代码，而不是用注释解释混乱。

```ts
// Bad
// 检查用户是不是可以看到优惠券
if (u.a > 18 && u.v && o.m > 100) {}

// Good
if (canShowCoupon(user, order)) {}
```

## 2. Explain why, not what

注释解释业务原因，不重复代码行为。

```ts
// Bad
// 判断用户年龄大于 18
if (user.age > 18) {}

// Good
// 活动受地区合规限制，仅允许成年人参与
if (user.age > 18) {}
```

## 3. Keep legal comments only when required

版权、许可证等必要信息可保留。

```ts
// Bad
// Created by Kim at 2026-06-22

// Good
// Copyright 2026 Example Corp. Licensed under MIT.
```

## 4. Use warning comments for real risk

只有确实危险或反直觉时才写警示。

```ts
// Bad
// Be careful
clearCache()

// Good
// Do not cache permissions; they can change immediately after admin updates.
fetchPermissions()
```

## 5. TODO must be actionable

TODO 必须说明原因、目标和清理条件。

```ts
// Bad
// TODO fix later

// Good
// TODO: remove legacy adapter after v2 API migration is complete.
```

## 6. Avoid redundant comments

不要写一眼能从代码看出的注释。

```ts
// Bad
// increase count by one
count++

// Good
count++
```

## 7. Delete commented-out code

注释掉的旧代码应删除，历史交给 Git。

```ts
// Bad
// const oldPrice = price * 0.8
const price = calculatePrice(order)

// Good
const price = calculatePrice(order)
```

## 8. Keep comments updated

过期注释比没有注释更危险。

```ts
// Bad
// Uses localStorage
saveToIndexedDB(data)

// Good
// Persist large drafts in IndexedDB to avoid localStorage quota limits.
saveToIndexedDB(data)
```

## 9. Avoid noisy section markers

不要用大量分割线制造视觉噪音。

```ts
// Bad
// ================= UTIL METHODS =================
function formatPrice() {}

// Good
function formatPrice() {}
```

## 10. Public API comments should describe contract

对外 API 注释应说明约束、返回和异常。

```ts
// Bad
// create order
function createOrder(input: OrderInput) {}

// Good
// Creates an order. Throws OrderValidationError when input is invalid.
function createOrder(input: OrderInput) {}
```
