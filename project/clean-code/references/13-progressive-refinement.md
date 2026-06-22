# Rule: Progressive Refinement

> 先让代码工作，再小步、安全、持续地让它变干净。

## 1. Refactor in small steps

每次只做一个可验证的小改变。

```ts
// Bad
rewriteWholeModuleAtOnce()

// Good
renameVariable()
extractFunction()
runTests()
```

## 2. Keep behavior unchanged

重构只改变结构，不改变功能结果。

```ts
// Bad
// refactor and change discount rule together

// Good
const discount = calculateLegacyDiscount(order)
```

## 3. Add characterization tests first

改陌生代码前，先用测试固定现有行为。

```ts
// Bad
modifyLegacyParserWithoutTests()

// Good
expect(parseLegacy(input)).toEqual(currentOutput)
```

## 4. Improve names as understanding grows

理解变深后及时更新命名。

```ts
// Bad
const data = buildData(order)

// Good
const paymentPayload = buildPaymentPayload(order)
```

## 5. Extract obvious concepts

重复或复杂逻辑中自然浮现的概念应抽出。

```tsx
// Bad
{user.age > 18 && user.vip && order.amount > 100 && <Coupon />}

// Good
{canShowCoupon(user, order) && <Coupon />}
```

## 6. Delete obsolete abstraction

失去价值的抽象要移除。

```ts
// Bad
const name = userNameAdapter.getUserName(user)

// Good
const name = user.name
```
