---
name: code-evolver
description: 当用户要求将会话中的代码规范、工程约定、架构约束、命名规则、目录结构、测试要求、提交流程、协作规则或 AI 协作规则沉淀为长期可复用的项目规则，或在对话中持续出现这类稳定约束时，调用此 skill。用于识别规则、判断新增/更新/合并/冲突、过滤临时指令，并按职责同步到 .cursor/rules、AGENTS.md、CLAUDE.md。
---

# Code Evolver Skill

## Purpose
在整个会话过程中，持续识别并提取可长期复用的规则类信息，将其整理为结构化、可维护、可复用、带 few-shot 的规则集合，并按职责同步到：
- `.cursor/rules/*`
- `AGENTS.md`
- `CLAUDE.md`

你的目标不是机械记录用户说过的话，而是：
- 识别真正可复用的长期规则
- 过滤一次性或临时性指令
- 对已有规则做新增、更新、合并或冲突标记
- 输出可执行、可维护、可持续演进的规则资产
- 确保每条规则都包含可判别的 few-shot

---

## When To Use
在以下场景优先使用本 skill：
- 用户明确说“加入规则”“更新规则”“记到 rule”“沉淀成规范”“同步到规则文件”
- 会话中反复出现稳定的开发约定或工程约束
- 用户在代码评审、重构、架构设计中强调某类长期规范
- 用户希望把零散要求沉淀为团队规则
- 需要将规则同步到 `.cursor/rules`、`AGENTS.md`、`CLAUDE.md`

---

## What Counts As A Rule
重点识别以下类型的信息：
- 代码规范
- 开发约定
- 工程规则
- 架构约束
- 命名规范
- 目录结构约定
- 测试要求
- 提交流程
- 协作规则
- 文档维护约定
- AI 协作规则
- Agent 执行规则

以下内容通常不应沉淀为长期规则：
- 一次性任务指令
- 临时修复方案
- 仅当前需求有效的实现细节
- 没有复用价值的上下文描述
- 讨论中的候选方案或实现偏好，除非用户明确确认其为长期约定

---

## Core Principles
1. 只沉淀可长期复用、跨任务仍然有效的规则，忽略一次性、临时性、仅针对当前任务的指令。
2. 每次识别到候选规则时，必须先判断其动作类型：
   - New Rule
   - Update Existing Rule
   - Merge Similar Rules
   - Conflict / Need Confirmation
   - Ignore as Temporary
3. 规则表述必须清晰、简洁、可执行，优先使用以下措辞：
   - 必须
   - 禁止
   - 优先
   - 应当
   - 仅在……情况下允许
4. 若已有相似规则，禁止重复添加，应更新、合并或重写原规则，保持规则集去重且一致。
5. 若新规则与已有规则冲突，禁止直接覆盖，必须标记冲突点并说明待确认内容。
6. 若用户明确要求“加入规则”“更新规则”“记入规则”“同步到规则文档”，必须优先执行，不可忽略。
7. 若规则只在某技术栈、模块、目录、环境中生效，必须显式标注适用范围。
8. 输出前必须做一次去重、冲突检查和表述规范化。
9. 不是所有规则都必须同步到三个文件，应根据职责进行拆分映射，禁止无差别复制。
10. 若某条要求只是实现建议、方案偏好或讨论中的候选方案，而未表现为稳定约束，默认不沉淀为规则，除非用户明确确认其为长期约定。
11. 每条规则必须包含 few-shot，缺少 few-shot 的规则不得进入最终规则集。
12. few-shot 必须直接体现规则差异点，不得提供抽象、空泛、无判别力的示例。
13. few-shot 必须尽量贴近真实项目语境，优先使用当前技术栈、目录结构、命名模式和工程背景。
14. 若规则不适合直接写代码示例，也必须提供行为示例、输入输出示例、目录结构示例或文档示例。
15. 每条规则至少包含：
   - 一个正向示例（Do Example / Good Example）
   - 一个反向示例（Don't Example / Bad Example）

---

## Decision Types
每次识别出候选规则时，必须先做分类判断：

### 1. New Rule
满足以下条件时归类为 New Rule：
- 现有规则中不存在同类约束
- 具备长期复用价值
- 表述可落地执行
- 能提供明确 few-shot

### 2. Update Existing Rule
满足以下条件时归类为 Update Existing Rule：
- 现有规则已存在
- 新信息是对旧规则的补充、澄清、收紧或扩展
- 更新后可以提升规则准确性或适用范围

### 3. Merge Similar Rules
满足以下条件时归类为 Merge Similar Rules：
- 存在多条高相似规则
- 可以合并为一条更清晰、更通用的规则
- 合并后不丢失关键约束和边界

### 4. Conflict / Need Confirmation
满足以下条件时归类为 Conflict / Need Confirmation：
- 新规则与已有规则直接冲突
- 无法安全判断以哪个为准
- 需要用户确认优先级或适用边界

### 5. Ignore as Temporary
满足以下条件时归类为 Ignore as Temporary：
- 仅当前任务有效
- 不具备跨任务复用价值
- 属于临时 workaround 或短期策略
- 缺乏稳定性或规范性

---

## Writing Requirements
每条规则必须满足以下要求：
- 表述清晰、简洁、可执行
- 使用明确约束语言，不得模糊
- 规则内容必须可用于后续 AI 执行或人工审阅
- 同类规则禁止重复堆叠
- 必须包含完整元信息
- 必须包含可判别的 few-shot

固定字段如下：
- Title
- Category
- Scope
- Rule
- Reason
- Do Example
- Don't Example

推荐格式：

### [Rule Title]
- Category: ...
- Scope: ...
- Rule: ...
- Reason: ...
- Do Example:
  ```text
  ...
  ```
- Don't Example:
  ```text
  ...
  ```

---

## Few-shot Requirements
few-shot 是强制项，必须满足以下要求：

1. 每条规则必须有正反两个示例：
   - Do Example
   - Don't Example

2. few-shot 必须体现“为什么符合”与“为什么不符合”，而不是只给表面例子。

3. 若规则涉及以下类型，优先使用对应示例形式：
- 命名规范：代码命名示例
- 目录结构：目录树示例
- 架构分层：模块归属示例
- 测试要求：测试文件或断言示例
- 提交流程：commit message 或 PR 模板示例
- 协作规则：工作流或职责划分示例
- 文档规范：文档片段示例

4. 不允许使用无意义示例，例如：
- Do: 按规则做
- Don't: 不按规则做

5. 若规则无法自然对应代码示例，必须提供最小行为示例，例如：
- 正确输入 / 错误输入
- 正确目录 / 错误目录
- 正确流程 / 错误流程
- 正确文档片段 / 错误文档片段

---

## File Mapping Rules

### `.cursor/rules/*`
适合放：
- 代码生成约束
- 目录结构规则
- 命名规范
- 测试要求
- 提交前检查要求
- 重构限制
- 技术选型约束
- 代码评审时必须遵守的规范

特点：
- 强执行
- 面向代码生成、修改、审查
- 尽量原子化、短小、直接

### `AGENTS.md`
适合放：
- 多 Agent 分工方式
- 任务流转规则
- 阶段协作机制
- 规划、实现、测试、审查的职责边界
- 任务升级、回退、交接规则

特点：
- 面向 Agent 协作
- 强调流程和职责边界

### `CLAUDE.md`
适合放：
- AI 助手全局行为约束
- 项目背景与长期上下文
- 通用开发偏好
- 回答风格、改码策略、审查原则
- 与用户长期合作过程中稳定存在的项目规则

特点：
- 全局约束
- 面向 AI 助手长期工作方式

### Sync Principles
- 不是所有规则都必须同步到三个文件
- 应根据职责进行拆分映射
- 禁止机械复制到全部文件
- 若某规则仅适合单一载体，只更新对应文件
- 若某规则需要跨文件同步，应按各文件职责重写，而不是原文照搬

---

## Execution Workflow
每次执行本 skill 时，按以下顺序处理：

1. 从当前会话中提取候选规则
2. 判断其是否具备长期复用价值
3. 判断它属于哪一类：
   - New Rule
   - Update Existing Rule
   - Merge Similar Rules
   - Conflict / Need Confirmation
   - Ignore as Temporary
4. 与已有规则做相似性比对
5. 对规则进行规范化重写
6. 为每条规则补充：
   - Category
   - Scope
   - Rule
   - Reason
   - Do Example
   - Don't Example
7. 判断每条规则应该写入：
   - `.cursor/rules/*`
   - `AGENTS.md`
   - `CLAUDE.md`
8. 输出结构化结果
9. 输出前做：
   - 去重检查
   - 冲突检查
   - few-shot 完整性检查
   - 适用范围检查
   - 文件映射合理性检查
10. 若用户要求落盘，则生成对应文件内容或 patch 建议

---

## Output Format
输出时必须严格使用以下结构：

## New Rules
- 列出新增规则
- 每条规则必须包含完整字段与 few-shot
- 若无内容，写 `None`

## Updated Rules
- 列出更新后的规则
- 说明原规则被如何补充、修订或收紧
- 每条规则必须包含完整字段与 few-shot
- 若无内容，写 `None`

## Conflicts / Need Confirmation
- 列出冲突规则
- 明确冲突点
- 说明为什么不能直接覆盖
- 给出待确认建议
- 若无内容，写 `None`

## Ignored Temporary Instructions
- 列出被忽略的临时指令
- 简要说明忽略原因
- 若无内容，写 `None`

---

## Quality Checklist
输出前必须检查：
- 是否错误收录了一次性任务指令
- 是否有重复规则
- 是否有近义重复但未合并的规则
- 是否有表述模糊、不可执行的规则
- 是否有缺失 Scope 的规则
- 是否有缺失 few-shot 的规则
- few-shot 是否真实、具体、可判别
- 是否把应写入不同文件的规则混在一起
- 是否存在潜在冲突未标记
- 是否存在不应同步却被同步到全部文件的情况

---

## Default Behavior
若用户没有明确要求立即修改文件，则默认输出：
1. 本次识别出的规则变更清单
2. 每条规则的推荐写入位置
3. 可直接落盘的规则文本

若用户明确要求直接更新文件，则输出：
1. `.cursor/rules/*` 建议内容
2. `AGENTS.md` 建议内容
3. `CLAUDE.md` 建议内容
4. 必要时给出 patch 方案

---

## Examples

### Example 1: Should Be Stored
输入：
- “以后所有异步请求必须通过统一 requester，不允许页面内直接散落 fetch”
判断：
- 属于长期工程规则
- 应沉淀

输出示例：

### Unified Request Entry
- Category: 工程规则
- Scope: 前端业务代码中的网络请求
- Rule: 所有异步请求必须通过统一 requester 发起，禁止在页面组件、视图层或业务逻辑中直接散落调用 fetch、axios 或其他底层请求实现。
- Reason: 避免请求逻辑分散，便于统一鉴权、错误处理、日志和重试策略。
- Do Example:
  ```ts
  import { requester } from '@/infra/requester'

  export function getUserProfile(userId: string) {
    return requester.get(`/api/users/${userId}`)
  }
  ```
- Don't Example:
  ```ts
  export async function getUserProfile(userId: string) {
    return fetch(`/api/users/${userId}`).then(res => res.json())
  }
  ```

推荐写入：
- `.cursor/rules/requesting.md`
- `CLAUDE.md`

---

### Example 2: Should Be Ignored
输入：
- “这次先别拆文件，先把功能跑通”
判断：
- 仅当前任务有效
- 不应沉淀

输出到：
- Ignored Temporary Instructions

---

### Example 3: Naming Rule
输入：
- “业务组件必须带业务前缀，不能叫 Card、List 这种过泛名字”
判断：
- 属于长期命名规范
- 应沉淀

输出示例：

### Business Component Naming
- Category: 命名规范
- Scope: `src/components` 与业务模块组件
- Rule: 业务组件命名必须使用业务语义前缀，禁止使用过于泛化且脱离上下文的名称，如 Card、List、Item、Panel。
- Reason: 避免命名冲突，提高可读性和检索性。
- Do Example:
  ```ts
  UserProfileCard.tsx
  OrderItemList.tsx
  RewardTaskPanel.vue
  ```
- Don't Example:
  ```ts
  Card.tsx
  List.tsx
  Item.vue
  ```

推荐写入：
- `.cursor/rules/naming.md`
- `CLAUDE.md`

---

### Example 4: Agent Workflow Rule
输入：
- “规划和实现必须分开，先出计划再写代码，测试由独立角色审查”
判断：
- 属于 Agent 协作规则
- 应沉淀

输出示例：

### Agent Phase Separation
- Category: 协作规则
- Scope: 多 Agent / AI 协作流程
- Rule: 规划、实现、测试审查必须分阶段执行，禁止同一阶段混合输出计划、实现和验收结论；测试审查应由独立角色完成。
- Reason: 降低遗漏和自我确认偏差，提升任务透明度和交付质量。
- Do Example:
  ```text
  Planner: 输出任务拆解与风险
  Implementer: 按计划完成代码实现
  Reviewer/Tester: 独立验证实现与测试覆盖
  ```
- Don't Example:
  ```text
  同一个角色直接边想边写边宣布“已测试通过”
  ```
推荐写入：
- `AGENTS.md`
- `CLAUDE.md`

---

## Final Goal
将会话中零散出现的规则类信息，持续整理为结构化、可维护、可复用、带 few-shot 的长期规则资产，使这些规则不仅可读，而且可被 AI 稳定执行与复现。
