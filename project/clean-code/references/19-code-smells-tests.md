# Rule: Code Smells - Tests

> 测试坏味道会让团队失去对测试的信任，必须保持测试可靠、清晰、快速。

## 1. Insufficient tests

核心路径、异常路径和边界路径必须覆盖。

```ts
// Bad
test('success only', () => expect(pay(validOrder)).toBeTruthy())

// Good
test('rejects unpaid order refund', () => {
  expect(() => refund(unpaidOrder)).toThrow()
})
```

## 2. Do not ignore skipped tests

跳过测试必须有原因和恢复计划。

```ts
// Bad
test.skip('checkout works', () => {})

// Good
test.todo('checkout works after payment mock is available')
```

## 3. Test boundary conditions

bug 常出现在空值、极值、边界时间。

```ts
// Bad
expect(canShowCoupon(adultVip, order100)).toBe(true)

// Good
expect(canShowCoupon(adultVip, order100)).toBe(false) // amount must be > 100
```

## 4. Test near bugs

修复 bug 时必须添加回归测试。

```ts
// Bad
fixCouponBug()

// Good
test('hides coupon when order amount equals threshold', () => {
  expect(canShowCoupon(vipUser, orderAmount100)).toBe(false)
})
```

## 5. Avoid fragile tests

测试不应依赖实现细节。

```ts
// Bad
expect(component.state.internalCache.size).toBe(1)

// Good
expect(screen.getByText('加载完成')).toBeInTheDocument()
```

## 6. Avoid slow integration in unit tests

单元测试避免真实网络、数据库和定时等待。

```ts
// Bad
await new Promise(resolve => setTimeout(resolve, 3000))

// Good
vi.useFakeTimers()
vi.advanceTimersByTime(3000)
```

## 7. Make test data expressive

测试数据应表达场景，不是随机堆字段。

```ts
// Bad
const user = { age: 20, vip: true, a: 1, b: 2 }

// Good
const user = createAdultVipUser()
```
