# Rule: Unit Tests

> 测试代码也是生产资产，必须快速、独立、可读、可维护。

## 1. Keep tests clean

测试也要清晰命名、结构简单。

```ts
// Bad
test('test1', () => { expect(fn(1)).toBe(2) })

// Good
test('adds one to the input value', () => {
  expect(addOne(1)).toBe(2)
})
```

## 2. One test, one behavior

一个测试只验证一个行为，失败原因清楚。

```ts
// Bad
test('user', () => { expect(isAdult(user)).toBe(true); expect(isVip(user)).toBe(true) })

// Good
test('returns true for adult user', () => {
  expect(isAdult(user)).toBe(true)
})
```

## 3. Tests should be fast

慢测试会阻碍频繁运行。

```ts
// Bad
await realPaymentApi.pay(order)

// Good
mockPaymentApi.pay.mockResolvedValue(successResult)
```

## 4. Tests should be independent

测试之间不能依赖执行顺序。

```ts
// Bad
let userId: string

test('create', () => { userId = createUser().id })
test('delete', () => { deleteUser(userId) })

// Good
test('delete user', () => {
  const user = createTestUser()
  deleteUser(user.id)
})
```

## 5. Tests should be repeatable

测试结果不应依赖机器、时间或网络。

```ts
// Bad
expect(isToday(new Date())).toBe(true)

// Good
expect(isToday(fixedDate, fixedNow)).toBe(true)
```

## 6. Tests should self-validate

测试应通过断言自动判断，不靠人工看日志。

```ts
// Bad
console.log(calculateTotal(items))

// Good
expect(calculateTotal(items)).toBe(120)
```

## 7. Test boundary conditions

空值、极值和异常路径必须覆盖。

```ts
// Bad
test('formats price', () => expect(formatPrice(100)).toBe('¥100'))

// Good
test('formats zero price', () => expect(formatPrice(0)).toBe('¥0'))
```

## 8. Add regression tests for bugs

修 bug 前先补能复现问题的测试。

```ts
// Bad
// directly fix without a failing test

// Good
test('keeps coupon hidden for non-vip adults', () => {
  expect(canShowCoupon(nonVipAdult, order)).toBe(false)
})
```
