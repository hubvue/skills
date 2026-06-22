# Scope Define Stage Contract

## Stage

- stage id: `scope_define`
- output file: `09-scope.md`
- default research depth: `standard`

## Required Inputs

- 06-feasibility.md
- 07-goals.md
- 08-solution.md
- research/08-solution-research.md
- sources/sources.json

## Core Tasks

1. 拆分功能清单
2. 判断 MVP 必需功能
3. 定义本次范围与非本次范围
4. 检索竞品基础版、价格页、用户评论、开源功能列表
5. 判断范围是否过大
6. 写入 09-scope.md 与 research/09-scope-research.md

## Required Output

The skill must produce `09-scope.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/09-scope-research.md` and update `sources/sources.json`.

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
