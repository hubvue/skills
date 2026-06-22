# Rule: Simple Design

> 简单设计要求：通过测试、消除重复、表达意图、减少不必要元素。

## 1. Make tests pass first

正确行为是设计的第一约束。

```ts
// Bad
refactorCheckoutFlowWithoutTests()

// Good
expect(checkout(order)).toEqual(expectedResult)
```

## 2. Remove duplication

重复逻辑是最明确的重构信号。

```ts
// Bad
const userPrice = user.price / 100
const orderPrice = order.price / 100

// Good
const userPrice = centToYuan(user.price)
const orderPrice = centToYuan(order.price)
```

## 3. Express intent clearly

代码结构和名称应直接说明意图。

```ts
// Bad
if (a > 0 && b === 1) {}

// Good
if (hasPaidOrder(order)) {}
```

## 4. Minimize unnecessary elements

删除不提供价值的类、函数和抽象。

```ts
// Bad
class UserNameWrapper { getName(user: User) { return user.name } }

// Good
const userName = user.name
```

## 5. Prefer current simplicity

为真实需求设计，不为假设需求设计。

```ts
// Bad
createPluginSystemForOneFormatter()

// Good
formatPrice(price)
```

## 6. Refactor under test protection

结构优化必须有测试保护行为。

```ts
// Bad
rewritePaymentModuleDirectly()

// Good
expect(pay(order)).toEqual(successResult)
```
