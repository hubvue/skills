# Rule: Code Smells - Environment

> 构建、测试、运行环境必须简单、自动化、可复现。

## 1. Build should be one command

项目构建必须一条命令完成。

```json
// Bad
{ "scripts": { "build": "echo run these five manual steps" } }

// Good
{ "scripts": { "build": "pnpm lint && pnpm test && vite build" } }
```

## 2. Tests should be one command

测试必须一条命令可运行。

```json
// Bad
{ "scripts": { "test": "echo open browser and click manually" } }

// Good
{ "scripts": { "test": "vitest run" } }
```

## 3. Document required environment

环境变量和依赖必须可发现。

```txt
// Bad
Missing secret config only known by one developer.

// Good
.env.example documents required variables.
```

## 4. Avoid machine-specific assumptions

不要依赖个人电脑路径或本地服务。

```ts
// Bad
const chromePath = '/Users/kim/Applications/Chrome.app'

// Good
const chromePath = process.env.CHROME_PATH
```
