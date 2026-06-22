# User Identify Stage Contract

## Stage

- stage id: `user_identify`
- output file: `02-users.md`
- default research depth: `standard`

## Required Inputs

- 00-idea-intake.md
- 01-motivation.md
- research/01-motivation-research.md
- sources/sources.json

## Core Tasks

1. 推导可能用户群体
2. 识别核心目标用户
3. 区分主要用户、次要用户、非目标用户
4. 检索竞品面向用户、用户评论、社区讨论、招聘 JD
5. 判断第一批用户是否足够聚焦
6. 写入 02-users.md 与 research/02-users-research.md

## Required Output

The skill must produce `02-users.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/02-users-research.md` and update `sources/sources.json`.

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
