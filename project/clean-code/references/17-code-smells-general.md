# Rule: Code Smells - General

> 通用坏味道包括重复、魔法值、职责错放、过度耦合、晦涩意图和边界遗漏。

## 1. Duplicate code

重复逻辑必须合并为单一来源。

```ts
// Bad
const a = price / 100
const b = amount / 100

// Good
const a = centToYuan(price)
const b = centToYuan(amount)
```

## 2. Magic numbers and strings

重要数字和字符串必须命名。

```ts
// Bad
if (order.status === 3) {}

// Good
if (order.status === OrderStatus.Paid) {}
```

## 3. Wrong abstraction level

高层模块不应处理底层细节。

```ts
// Bad
function renderUser() { localStorage.setItem('user', JSON.stringify(user)) }

// Good
function renderUser() { userStore.save(user) }
```

## 4. Too much information

模块只暴露必要 API。

```ts
// Bad
export { internalCache, normalizeRawUser, UserService }

// Good
export { UserService }
```

## 5. Dead code

不会执行或无人使用的代码应删除。

```ts
// Bad
if (false) runLegacyFlow()

// Good
// removed unreachable legacy flow
```

## 6. Inconsistency

同类代码必须保持一致风格和命名。

```ts
// Bad
fetchUser()
loadOrder()
queryProduct()

// Good
fetchUser()
fetchOrder()
fetchProduct()
```

## 7. Artificial coupling

无关模块不应因为方便互相依赖。

```ts
// Bad
import { formatPrice } from '../pages/order/OrderPage'

// Good
import { formatPrice } from '../utils/formatPrice'
```

## 8. Feature envy

函数总操作别的对象时，应移动位置。

```ts
// Bad
function getOrderTotal(order: Order) { return order.items.reduce(...) }

// Good
order.getTotalAmount()
```

## 9. Selector arguments

用参数选择行为时，优先拆函数或策略。

```ts
// Bad
renderUser(user, 'admin')

// Good
renderAdminUser(user)
```

## 10. Obscured intent

代码目的不清时，先改命名和结构。

```ts
// Bad
if (x && y && z) run()

// Good
if (canSubmitOrder(order)) run()
```

## 11. Misplaced responsibility

逻辑应放在最自然的模块中。

```ts
// Bad
UserPage.calculateOrderTotal(order)

// Good
order.calculateTotal()
```

## 12. Prefer explanatory variables

中间变量可提升可读性。

```ts
// Bad
if (user.age > 18 && user.vip && order.amount > 100) {}

// Good
const canShowCoupon = isAdult(user) && user.vip && hasEnoughAmount(order)
if (canShowCoupon) {}
```

## 13. Avoid negative conditions

正向条件通常更容易读。

```ts
// Bad
if (!isNotReady) submit()

// Good
if (isReady) submit()
```

## 14. Encapsulate boundary conditions

边界规则集中封装，避免散落。

```ts
// Bad
if (index >= 0 && index < items.length) {}

// Good
if (isValidIndex(index, items)) {}
```

## 15. Avoid configurable complexity in code

可变策略应配置化，不硬编码。

```ts
// Bad
const timeout = isProd ? 3000 : 1000

// Good
const timeout = config.requestTimeoutMs
```

## 16. Avoid transitive navigation

调用方不应层层获取内部对象。

```ts
// Bad
user.getAccount().getPlan().getName()

// Good
user.getPlanName()
```
