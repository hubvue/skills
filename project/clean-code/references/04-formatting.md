# Rule: Formatting

> 格式统一是团队协作的基础，代码布局应帮助读者理解关系。

## 1. Use consistent formatting

统一格式，避免个人风格争论。

```ts
// Bad
function save(){const a=1;if(a){send()}}

// Good
function save() {
  const payload = buildPayload()
  if (payload) send(payload)
}
```

## 2. Keep related code close

相关变量、函数和逻辑应靠近放置。

```ts
// Bad
const price = calculatePrice(order)
// ... 80 lines
renderPrice(price)

// Good
const price = calculatePrice(order)
renderPrice(price)
```

## 3. Declare variables near usage

变量应在使用点附近声明。

```ts
// Bad
let total
// ...
total = calculateTotal(items)

// Good
const total = calculateTotal(items)
```

## 4. Put caller before callee

主流程在前，细节实现跟在后面。

```ts
// Bad
function validateOrder() {}
function submitOrder() { validateOrder(); saveOrder() }

// Good
function submitOrder() { validateOrder(); saveOrder() }
function validateOrder() {}
```

## 5. Limit line length

过长表达式必须拆行或抽函数。

```tsx
// Bad
return <Button disabled={user.age < 18 || !user.vip || order.amount <= 100 || order.status !== 'paid'} />

// Good
return <Button disabled={!canUseVipCoupon(user, order)} />
```

## 6. Use blank lines to separate concepts

空行用于分隔不同概念，不要随意堆叠。

```ts
// Bad
const user = getUser()
const order = getOrder()
send(user, order)

// Good
const user = getUser()
const order = getOrder()

send(user, order)
```

## 7. Keep indentation honest

缩进必须真实反映层级，避免一行流。

```ts
// Bad
if (isValid) { save(); notify(); redirect(); }

// Good
if (isValid) {
  save()
  notify()
  redirect()
}
```

## 8. Let tools enforce style

格式规则应交给自动化工具。

```json
// Bad
{ "scripts": { "check": "echo manually check style" } }

// Good
{ "scripts": { "format": "prettier --write .", "lint": "eslint ." } }
```
