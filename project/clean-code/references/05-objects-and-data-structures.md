# Rule: Objects and Data Structures

> 对象暴露行为并隐藏数据；数据结构承载数据并尽量简单。不要混淆二者。

## 1. Hide object internals

对象应暴露行为，而非内部结构。

```ts
// Bad
const city = user.profile.address.city

// Good
const city = user.getShippingCity()
```

## 2. Keep DTO simple

DTO 只表达传输数据，不承载复杂业务。

```ts
// Bad
class UserDTO { calculateVipLevel() {} }

// Good
type UserDTO = { id: string; name: string; vipLevel: number }
```

## 3. Do not mix object and data models

同一模型不要既暴露数据又堆满行为。

```ts
// Bad
class Order { public items = []; saveToDatabase() {} }

// Good
class Order { getTotalAmount() {} }
class OrderRepository { save(order: Order) {} }
```

## 4. Follow Law of Demeter

模块只和直接依赖通信，不层层挖内部。

```ts
// Bad
order.getCustomer().getWallet().getBalance()

// Good
order.getCustomerBalance()
```

## 5. Avoid train wrecks

长链调用通常说明暴露了过多内部结构。

```ts
// Bad
app.config().user().permission().canEdit()

// Good
permissionService.canEditCurrentUser()
```

## 6. Prefer objects when adding types

新增类型频繁时，多态对象更合适。

```ts
// Bad
if (shape.type === 'circle') areaCircle(shape)

// Good
shape.area()
```

## 7. Prefer data when adding operations

新增操作频繁时，简单数据结构更合适。

```ts
// Bad
class User { exportCsv() {}; exportJson() {}; exportXml() {} }

// Good
exportUserAsCsv(user)
exportUserAsJson(user)
```

## 8. Do not expose persistence details

业务对象不应暴露数据库字段细节。

```ts
// Bad
user.tbl_user_created_at

// Good
user.createdAt
```
