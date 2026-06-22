---
name: clean-code
description: Clean Code 规范总览与路由，覆盖命名、函数、注释、格式、对象与数据结构、错误处理、边界、测试、类、系统、并发、简单设计、渐进式重构及各类代码坏味道。当用户进行代码审查、重构、写新代码或询问 Clean Code / 整洁代码 / 代码坏味道相关规范时使用，并按主题加载 references 中的对应规则文件。Use for code review, refactor, writing new code, or any clean code / code smell / readability question; routes to the matching rule file under references.
---

# Clean Code

这是 Clean Code 规范的总览与路由 skill。每条规则的完整内容（含正反例）单独存放在 `references/` 下，本文件只负责**判断主题并路由到对应文件**，避免一次性加载全部规则。

## 使用流程

1. 判断当前任务涉及哪些主题（可同时命中多个）。
2. 用下方路由表，只读取相关的 `references/*.md`，不要全量加载。
3. 按规则中的 Bad/Good 示例审查或修改代码：标出违反项 → 给出符合规则的写法 → 重构时保持行为不变。
4. 拿不准主题时，优先读取 `references/17-code-smells-general.md` 作为通用兜底。

审查输出建议统一为下表，便于定位与对照：

| 位置 | 违反规则 | 建议写法 |
|---|---|---|
| `文件:行` | 规则名（如 02-functions #6 过多参数） | 简述符合规则的改法 |

## 路由表

| 主题 / 触发场景 | 参考文件 |
|---|---|
| 命名、变量/函数/类名、布尔命名、领域术语 | `references/01-meaningful-names.md` |
| 函数大小、单一职责、参数、副作用、抽象层级 | `references/02-functions.md` |
| 注释、TODO、解释原因 vs 行为、删注释代码 | `references/03-comments.md` |
| 代码格式、布局、缩进、空行、行宽、自动化格式 | `references/04-formatting.md` |
| 对象 vs 数据结构、得墨忒耳定律、隐藏内部、DTO | `references/05-objects-and-data-structures.md` |
| 错误处理、异常 vs 错误码、空 catch、返回/传 null | `references/06-error-handling.md` |
| 第三方库/SDK 隔离、外部数据转换、边界接口 | `references/07-boundaries.md` |
| 单元测试质量、FIRST、独立可重复、边界覆盖 | `references/08-unit-tests.md` |
| 类设计、SRP、内聚、依赖抽象、开闭、上帝类 | `references/09-classes.md` |
| 系统架构、构造与使用分离、横切关注点、延迟决策 | `references/10-systems.md` |
| 简单设计、消除重复、表达意图、减少多余元素 | `references/11-simple-design.md` |
| 并发、共享状态、不可变快照、异步失败、取消 | `references/12-concurrency.md` |
| 渐进式重构、小步、保持行为、固化测试 | `references/13-progressive-refinement.md` |
| 坏味道 - 注释类 | `references/14-code-smells-comments.md` |
| 坏味道 - 环境/构建/测试运行 | `references/15-code-smells-environment.md` |
| 坏味道 - 函数类 | `references/16-code-smells-functions.md` |
| 坏味道 - 通用（重复、魔法值、耦合、晦涩意图等） | `references/17-code-smells-general.md` |
| 坏味道 - 命名类 | `references/18-code-smells-names.md` |
| 坏味道 - 测试类 | `references/19-code-smells-tests.md` |

## 常见任务的推荐组合

- **代码审查（review）**：先读 `17-code-smells-general`，再按改动内容补充 `02-functions`、`01-meaningful-names`、`06-error-handling`。
- **重构（refactor）**：`13-progressive-refinement` + `11-simple-design` + 相关主题文件，务必保持行为不变。
- **写新业务代码**：`01-meaningful-names` + `02-functions` + `09-classes`（含类时）。
- **写测试**：`08-unit-tests` + `19-code-smells-tests`。

## 原则

- 规则是“短、硬、可执行”的默认约束；示例中的 Bad/Good 是判定依据。
- 路由优先，按需加载，避免无关规则占用上下文。
- 重构只改结构不改行为；规则变更要单独提交。
