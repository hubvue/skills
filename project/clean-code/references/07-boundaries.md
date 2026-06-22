# Rule: Boundaries

> 第三方库、外部服务和未完成模块必须隔离在边界层，业务代码依赖自己的契约。

## 1. Wrap third-party APIs

不要让第三方 API 直接散落在业务代码中。

```ts
// Bad
axios.post('/api/orders', order)

// Good
orderApi.createOrder(order)
```

## 2. Convert external data to internal models

外部返回结构进入系统边界后立即转换。

```ts
// Bad
renderUser(apiResponse.data.user_name)

// Good
const user = toUser(apiResponse.data)
renderUser(user.name)
```

## 3. Do not leak SDK types

SDK 类型不应扩散到业务层。

```ts
// Bad
function pay(request: Stripe.PaymentIntentCreateParams) {}

// Good
function pay(request: PaymentRequest) {}
```

## 4. Write learning tests for boundaries

用测试确认第三方库关键行为。

```ts
// Bad
// assume dayjs parses timezone correctly

// Good
test('dayjs parses configured timezone', () => {
  expect(parseInTimezone(input)).toBe(expected)
})
```

## 5. Define interfaces for unknown modules

未实现模块先定义业务需要的接口。

```ts
// Bad
// TODO: wait for payment SDK

// Good
interface PaymentGateway {
  pay(order: Order): Promise<PaymentResult>
}
```

## 6. Keep boundary failures isolated

边界层负责转换和归一化外部错误。

```ts
// Bad
throw stripeError

// Good
throw new PaymentGatewayError('stripe payment failed', { cause: stripeError })
```
