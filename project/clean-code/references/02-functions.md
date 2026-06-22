# Rule: Functions

> 函数必须短小、单一、同一抽象层级，并通过名称表达意图。

## 1. Keep functions small

函数越小，越容易理解、测试和修改。

```ts
// Bad
function submitOrder() {
  validateOrder()
  calculatePrice()
  requestPayment()
  saveOrder()
  sendNotification()
}

// Good
function submitOrder() {
  const order = buildValidOrder()
  completeOrderPayment(order)
}
```

## 2. Do one thing

一个函数只做一个抽象层级的一件事。

```ts
// Bad
function saveUser(user: User) {
  if (!user.name) throw new Error('name required')
  localStorage.setItem('user', JSON.stringify(user))
}

// Good
function saveUser(user: User) {
  validateUser(user)
  persistUser(user)
}
```

## 3. Keep one abstraction level

不要在同一函数混合业务流程和底层细节。

```ts
// Bad
function login() {
  const token = btoa(`${Date.now()}:${Math.random()}`)
  document.cookie = `token=${token}`
}

// Good
function login() {
  const token = createSessionToken()
  saveSessionToken(token)
}
```

## 4. Read top-down

高层流程在上，细节函数在下。

```ts
// Bad
function parseHeader() {}
function renderPage() { parseHeader(); renderBody() }
function renderBody() {}

// Good
function renderPage() { parseHeader(); renderBody() }
function parseHeader() {}
function renderBody() {}
```

## 5. Prefer polymorphism or map over switch

多分支类型判断优先使用策略或映射表。

```ts
// Bad
if (type === 'email') sendEmail()
else if (type === 'sms') sendSms()

// Good
const senders = { email: sendEmail, sms: sendSms }
senders[type]()
```

## 6. Use fewer arguments

参数越多，函数越难读、难测、难调用。

```ts
// Bad
createUser(name, age, city, phone, email)

// Good
createUser({ name, age, city, phone, email })
```

## 7. Avoid boolean arguments

布尔参数通常代表函数承担两种行为。

```ts
// Bad
renderUser(user, true)

// Good
renderEditableUser(user)
```

## 8. Avoid output arguments

函数应返回结果，不应靠修改入参输出。

```ts
// Bad
function normalize(user: User) { user.name = user.name.trim() }

// Good
function normalizeUser(user: User) {
  return { ...user, name: user.name.trim() }
}
```

## 9. Separate command and query

查询函数不应修改状态，命令函数不应伪装查询。

```ts
// Bad
function getUserAndMarkRead(id: string) {}

// Good
function getUser(id: string) {}
function markUserAsRead(id: string) {}
```

## 10. Avoid hidden side effects

函数名没有说明的副作用不得偷偷发生。

```ts
// Bad
function checkPassword(password: string) {
  loginUser()
  return password.length > 8
}

// Good
function isValidPassword(password: string) {
  return password.length > 8
}
```

## 11. Prefer exceptions to error codes

错误码会污染主流程，异常边界更清晰。

```ts
// Bad
const result = saveUser(user)
if (result.code !== 0) return result

// Good
try {
  saveUser(user)
} catch (error) {
  handleSaveUserError(error)
}
```

## 12. Extract try/catch blocks

错误处理应独立，避免掩盖业务流程。

```ts
// Bad
async function submit() {
  try { await save() } catch (e) { showToast('failed') }
}

// Good
async function submit() {
  await saveSafely()
}
```

## 13. Avoid duplication

重复逻辑超过两处，应优先抽象。

```ts
// Bad
const userPrice = user.price / 100
const orderPrice = order.price / 100

// Good
const userPrice = formatCent(user.price)
const orderPrice = formatCent(order.price)
```

## 14. Extract complex conditions

复杂判断必须抽成有业务含义的函数。

```tsx
// Bad
{user.age > 18 && user.vip && order.amount > 100 && <Coupon />}

// Good
{canShowCoupon(user, order) && <Coupon />}
```

## 15. Preserve behavior when refactoring

重构只改变结构，不改变行为。

```ts
// Bad
// 重构时顺手改了折扣规则
const discount = amount > 200 ? 20 : 0

// Good
// 先保持原行为，再单独提交规则变更
const discount = calculateLegacyDiscount(amount)
```
