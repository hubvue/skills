# Rule: Code Smells - Functions

> 函数坏味道集中在参数、副作用、职责混乱和死代码。

## 1. Too many arguments

参数过多时应改为参数对象。

```ts
// Bad
createUser(name, age, city, phone, email)

// Good
createUser({ name, age, city, phone, email })
```

## 2. Output arguments

不要通过修改入参传递结果。

```ts
// Bad
function addTotal(order: Order) { order.total = calculateTotal(order) }

// Good
function withTotal(order: Order) {
  return { ...order, total: calculateTotal(order) }
}
```

## 3. Flag arguments

布尔参数说明函数承担多个行为。

```ts
// Bad
renderUser(user, true)

// Good
renderEditableUser(user)
```

## 4. Dead functions

未使用函数必须删除。

```ts
// Bad
function oldCheckout() {}

// Good
// deleted oldCheckout; use Git history when needed
```

## 5. Hidden temporal coupling

调用顺序依赖必须通过接口显式表达。

```ts
// Bad
client.connect()
client.send(data)

// Good
const session = await client.createSession()
session.send(data)
```

## 6. Side-effecting queries

查询函数不应修改状态。

```ts
// Bad
function getUser() { markRead(); return user }

// Good
function getUser() { return user }
function markUserAsRead() {}
```
