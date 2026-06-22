# Rule: Systems

> 系统应分离构造与使用，隔离横切关注点，并支持渐进式演进。

## 1. Separate construction from use

对象创建和业务使用应分离。

```ts
// Bad
function submit() {
  const repo = new MySQLOrderRepository()
  repo.save(order)
}

// Good
function submit(orderRepository: OrderRepository) {
  orderRepository.save(order)
}
```

## 2. Keep bootstrap in main

启动层负责组装依赖，业务层负责业务。

```ts
// Bad
class OrderService { private repo = new MySQLOrderRepository() }

// Good
const orderService = new OrderService(new MySQLOrderRepository())
```

## 3. Use factories for complex creation

复杂创建逻辑放工厂，不污染业务。

```ts
// Bad
const client = new ApiClient(url, token, timeout, retry, logger)

// Good
const client = createApiClient(config)
```

## 4. Isolate cross-cutting concerns

日志、鉴权、缓存等不要侵入核心业务。

```ts
// Bad
function getOrders() { checkAuth(); log(); cache(); return queryOrders() }

// Good
router.use(authMiddleware)
router.use(loggingMiddleware)
```

## 5. Do not over-engineer early

不要为虚构需求增加复杂架构。

```ts
// Bad
class AbstractOrderPluginRuntimeFactory {}

// Good
function createOrder(input: OrderInput) {}
```

## 6. Use domain language in architecture

目录、模块和接口应反映业务概念。

```txt
// Bad
utils/process.ts

// Good
orders/createOrder.ts
orders/calculateOrderTotal.ts
```

## 7. Delay irreversible decisions

数据库、框架等决策可通过接口延迟绑定。

```ts
// Bad
function saveUserToMongo(user: User) {}

// Good
interface UserRepository { save(user: User): Promise<void> }
```
