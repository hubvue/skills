# Rule: Classes

> 类必须小而内聚，只有一个改变理由，依赖抽象而不是具体实现。

## 1. Keep classes small

类越小，职责越清楚。

```ts
// Bad
class UserService { validate() {}; save() {}; sendEmail() {}; renderHtml() {} }

// Good
class UserValidator {}
class UserRepository {}
class UserNotifier {}
```

## 2. Follow Single Responsibility Principle

一个类只能有一个改变理由。

```ts
// Bad
class OrderService { calculatePrice() {}; writeToFile() {} }

// Good
class OrderPriceCalculator {}
class OrderFileWriter {}
```

## 3. Use cohesive fields and methods

类方法应围绕同一组数据工作。

```ts
// Bad
class User { updateProfile() {}; calculateOrderTotal(order: Order) {} }

// Good
class User { updateProfile() {} }
class Order { calculateTotal() {} }
```

## 4. Depend on abstractions

高层业务不应依赖底层具体实现。

```ts
// Bad
class UserService { constructor(private repo: MySQLUserRepository) {} }

// Good
class UserService { constructor(private repo: UserRepository) {} }
```

## 5. Isolate change

易变规则要单独封装。

```ts
// Bad
class Order { calculateDiscount() { return this.amount > 100 ? 10 : 0 } }

// Good
class Order { constructor(private discountPolicy: DiscountPolicy) {} }
```

## 6. Open for extension, closed for modification

新增行为优先扩展，不大改旧代码。

```ts
// Bad
if (type === 'vip') discount = 20
else if (type === 'new-user') discount = 10

// Good
discountPolicyMap[type].calculate(order)
```

## 7. Avoid God classes

不要把流程、规则、存储、通知全塞一个类。

```ts
// Bad
class AppManager { login() {}; pay() {}; render() {}; report() {} }

// Good
class AuthService {}
class PaymentService {}
class ReportService {}
```

## 8. Name classes by responsibility

类名要准确表达职责边界。

```ts
// Bad
class Helper {}

// Good
class PriceFormatter {}
```
