# Rule: Code Smells - Names

> 名称坏味道会直接增加理解成本，必须优先修复。

## 1. Choose descriptive names

名称必须准确表达业务含义。

```ts
// Bad
const x = order.amount - order.discount

// Good
const payableAmount = order.amount - order.discount
```

## 2. Match name length to scope

作用域越大，名称越具体。

```ts
// Bad
const v = calculateMonthlySubscriptionRenewalAmount(user)

// Good
const monthlyRenewalAmount = calculateMonthlySubscriptionRenewalAmount(user)
```

## 3. Use standard nomenclature

遵循团队、框架和社区习惯。

```tsx
// Bad
<Button whenClick={submit} />

// Good
<Button onClick={submit} />
```

## 4. Avoid vague names

禁止滥用 data、info、temp、obj。

```ts
// Bad
function handle(data: any) {}

// Good
function submitRefundApplication(application: RefundApplication) {}
```

## 5. Do not repeat type information

不要在名称中重复类型系统已表达的信息。

```ts
// Bad
const userArray: User[] = []

// Good
const users: User[] = []
```

## 6. Name side effects

有副作用的函数名必须体现副作用。

```ts
// Bad
function validateOrder(order: Order) { saveAuditLog(order) }

// Good
function validateOrderAndSaveAuditLog(order: Order) {}
```

## 7. Avoid overloaded names

同一名称不要代表多个概念。

```ts
// Bad
function add(item: Item) {}
function add(message: string) {}

// Good
function addItem(item: Item) {}
function appendMessage(message: string) {}
```
