# Idea Intake Stage Contract

## Stage

- stage id: `idea_intake`
- output file: `00-idea-intake.md`
- default research depth: `light`

## Required Inputs

- 一句话想法
- 想法来源（可选）
- 提出人（可选）
- 补充背景（可选）

## Core Tasks

1. 记录原始想法
2. 识别关键概念
3. 必要时检索新概念含义
4. 生成 ideaId
5. 创建工作目录
6. 初始化 status.json、sources.json
7. 写入 00-idea-intake.md

## Required Output

The skill must produce `00-idea-intake.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/00-idea-intake-research.md` and update `sources/sources.json`.

## Decision Rules

- `continue`: 当前阶段信息充分，且结论支持进入下一阶段。
- `revise`: 当前阶段发现上游定义有问题，需要回退修改。
- `need_data`: 当前阶段无法做出可靠判断，需要用户补充、访谈、数据或更多调研。
- `stop`: 当前阶段判断想法不适合继续成为需求。

## Status Mapping

- decision `continue` -> status `passed`
- decision `revise` -> status `need_more_info`
- decision `need_data` -> status `need_more_info` or `blocked`
- decision `stop` -> status `rejected`
