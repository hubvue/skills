# Rule: Concurrency

> 并发逻辑必须隔离、减少共享状态，并让失败可观察。

## 1. Separate concurrency from business logic

并发控制不要混入业务规则。

```ts
// Bad
orders.map(async order => { validate(order); await save(order) })

// Good
await runWithConcurrency(orders, 5, processOrder)
```

## 2. Limit shared mutable state

共享可变状态是并发问题根源。

```ts
// Bad
let total = 0
await Promise.all(items.map(async item => { total += await getPrice(item) }))

// Good
const prices = await Promise.all(items.map(getPrice))
const total = prices.reduce((sum, price) => sum + price, 0)
```

## 3. Use immutable snapshots

并发任务应处理自己的数据副本。

```ts
// Bad
await Promise.all(users.map(user => enrichUserInPlace(user)))

// Good
await Promise.all(users.map(user => enrichUser({ ...user })))
```

## 4. Handle async failures explicitly

并发失败不能静默丢失。

```ts
// Bad
items.forEach(async item => await save(item))

// Good
const results = await Promise.allSettled(items.map(save))
handleBatchResults(results)
```

## 5. Support cancellation

长任务应支持取消和资源清理。

```ts
// Bad
fetch('/api/orders')

// Good
fetch('/api/orders', { signal: abortController.signal })
```

## 6. Stress test concurrent paths

并发问题需要高频、批量测试暴露。

```ts
// Bad
test('save one order', async () => save(order))

// Good
test('save orders concurrently', async () => {
  await Promise.all(createOrders(100).map(save))
})
```
