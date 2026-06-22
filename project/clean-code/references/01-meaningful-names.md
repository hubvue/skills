# Rule: Meaningful Names

> 命名必须表达意图，减少猜测成本。优先使用业务语言，其次使用通用技术术语。

## 1. Use intention-revealing names

名称必须说明变量、函数或类为什么存在。

```tsx
// Bad
const d = 10

// Good
const retryDelaySeconds = 10
```

## 2. Avoid misleading names

名称不能暗示错误类型、结构或业务含义。

```ts
// Bad
const accountList = new Map<string, Account>()

// Good
const accountMap = new Map<string, Account>()
```

## 3. Avoid meaningless distinction

不要用 data、info、obj、tmp 制造伪区分。

```ts
// Bad
const userData = getUserInfo()

// Good
const userProfile = getUserProfile()
```

## 4. Use pronounceable names

名称应能自然读出来，方便讨论和 review。

```ts
// Bad
const genymdhms = '2026-06-22 10:30:00'

// Good
const generatedAt = '2026-06-22 10:30:00'
```

## 5. Use searchable names

重要常量和关键概念必须容易搜索。

```ts
// Bad
if (retryCount > 3) retry()

// Good
const MAX_RETRY_COUNT = 3
if (retryCount > MAX_RETRY_COUNT) retry()
```

## 6. Avoid type prefixes

不要用前缀暴露类型细节，类型系统会表达。

```ts
// Bad
const strUserName = 'Kim'

// Good
const userName = 'Kim'
```

## 7. Avoid mental mapping

不要让读者把 a、b、c 映射成业务含义。

```ts
// Bad
items.map(i => i.p)

// Good
items.map(orderItem => orderItem.price)
```

## 8. Class names should be nouns

类名表示对象、角色或概念，优先名词短语。

```ts
// Bad
class ManageUser {}

// Good
class UserManager {}
```

## 9. Function names should be verbs

函数名表示动作、查询或判断。

```ts
// Bad
function userStatus(user: User) {}

// Good
function getUserStatus(user: User) {}
```

## 10. Boolean names should read as predicates

布尔变量使用 is、has、can、should 等前缀。

```ts
// Bad
const loading = true

// Good
const isLoading = true
```

## 11. Use one word per concept

同一概念必须统一词汇，避免 fetch/get/load 混用。

```ts
// Bad
fetchUser()
loadOrder()
getProduct()

// Good
fetchUser()
fetchOrder()
fetchProduct()
```

## 12. Do not pun

同一个词不要在不同上下文表达不同动作。

```ts
// Bad
addUser(user)
addLog('created') // 实际是 append

// Good
addUser(user)
appendLog('created')
```

## 13. Use domain names

业务逻辑优先使用领域术语，而非技术化泛名。

```ts
// Bad
const value = order.amount - order.discount

// Good
const payableAmount = order.amount - order.discount
```

## 14. Add meaningful context

名称不够时，用对象或模块补充上下文。

```ts
// Bad
const city = 'Singapore'

// Good
const shippingAddress = { city: 'Singapore' }
```

## 15. Do not add gratuitous context

不要给所有名称加无意义项目前缀。

```ts
// Bad
class ZybUser {}
class ZybOrder {}

// Good
class User {}
class Order {}
```
