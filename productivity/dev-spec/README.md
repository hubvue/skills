# dev-spec

## Overview
`dev-spec` 是一个规格驱动的软件交付工作流技能，用来把需求从 intake 一路推进到 research、plan、todo、implement、test、bugfix、review，并用持久化工件记录每一步成果。

## When to Use
- 需要把需求转为可执行工程流程并留下清晰记录。
- 需要多阶段协作（产品/工程/测试）边界清晰的流程。
- 需要在测试-缺陷-回归之间进行闭环管理。

## When Not to Use
- 只需一次性回答问题或做小幅改动，无需完整流程记录。
- 需求高度不确定，短期内无法确定验收目标。

## Quick Start
最小用法：指定目标并让技能启动工作流。

```bash
/dev-spec 这里是需求描述或 PRD
```

如果你想直接进入某个阶段，可显式指定目标阶段（如 plan/implement/test），技能会补齐前置阶段再执行到目标阶段。（Confirmed）

## Core Capabilities
- 以阶段为单位产出可追踪工件（task/research/plan/todo/implementation-log/test/bug/review）。
- 自动执行“依赖补齐”和“前序阶段修复回流”（reflow）规则。（Confirmed）
- 在测试发现缺陷时进入 bugfix 循环，并要求回归验证。（Confirmed）
- 使用 `status.json` 维护机器可读的工作流状态。（Confirmed）

## Typical Usage Flow
1. intake：把需求整理为 `task.md` 并初始化 `status.json`。
2. research：理解现状、影响面、风险与未知。
3. plan：形成可执行技术方案与验证策略。
4. todo：拆解工程任务并标记依赖关系。
5. implement：实施与自检，并记录变更。
6. test：设计与执行测试，记录缺陷。
7. bugfix：修复缺陷并回归。
8. review：工程评审与交付结论。

## Project Structure
```
/.ai/tasks/<TASK-ID>/
  task.md
  research.md
  plan.md
  todo.md
  implementation-log.md
  test-cases.md
  test-report.md
  bug-list.md
  review-notes.md
  status.json
```

## Public API Overview
本技能通过 `/dev-spec` 命令触发工作流。（Confirmed）

## Best Practices
- 明确验收标准再进入 plan 阶段。（Confirmed）
- 测试失败必须进入 bugfix 回路，且必须回归验证。（Confirmed）
- 上游阶段修改后要前向回流更新下游工件，避免信息不一致。（Confirmed）

## Caveats and Limitations
- 未提供 PRD 时需依赖用户输入推导验收标准。（Needs Verification：依赖具体任务输入质量）
- 工件默认创建在 `/.ai/tasks/` 目录，需要写权限。（Needs Verification）

## Example
```bash
/dev-spec 增加登录页的“记住我”功能，并要求适配移动端
```

## Needs Verification
- 运行环境是否允许写入 `/.ai/tasks/` 目录。
