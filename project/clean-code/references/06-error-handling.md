# Rule: Error Handling

> 错误处理必须清晰、可观察、可恢复，不能污染主流程。

## 1. Prefer exceptions over error codes

错误码会扩散到每层调用，异常边界更清晰。

```ts
// Bad
const result = await saveUser(user)
if (!result.ok) return result.code

// Good
await saveUser(user) // throws SaveUserError when failed
```

## 2. Add context to errors

错误信息必须帮助定位业务对象和操作。

```ts
// Bad
throw new Error('save failed')

// Good
throw new Error(`save user failed: userId=${user.id}`)
```

## 3. Do not swallow errors

禁止空 catch，必须记录、处理或上抛。

```ts
// Bad
try { await syncUser() } catch (error) {}

// Good
try { await syncUser() } catch (error) {
  logger.error('sync user failed', error)
  throw error
}
```

## 4. Avoid returning null

优先返回空对象、空数组或抛明确异常。

```ts
// Bad
function getOrders(): Order[] | null { return null }

// Good
function getOrders(): Order[] { return [] }
```

## 5. Avoid passing null

不要要求调用方传 null 表达特殊逻辑。

```ts
// Bad
createUser(null, profile)

// Good
createUser({ profile })
```

## 6. Keep error handling separate

不要让错误处理掩盖主流程。

```ts
// Bad
async function submit() { try { await save(); redirect() } catch (e) { toast(e) } }

// Good
async function submit() {
  await saveOrderSafely()
  redirect()
}
```

## 7. Use domain-specific errors

错误类型应服务于调用方的处理策略。

```ts
// Bad
throw new Error('invalid')

// Good
throw new OrderValidationError('order amount must be positive')
```

## 8. Make user-facing failures observable

前端错误要有用户反馈或可观测日志。

```ts
// Bad
await submitOrder().catch(console.error)

// Good
await submitOrder().catch(error => {
  logger.error('submit order failed', error)
  toast.error('订单提交失败，请稍后重试')
})
```
