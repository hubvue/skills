# Skill Contract

每个 Skill 都必须遵守统一契约。

## Input

```ts
interface SkillInput {
  ideaId: string
  workspacePath: string
  stage: string
  upstreamDocs: string[]
  upstreamResearchDocs: string[]
  sourcesFile: string
  userExtraInput?: string
  mode: 'auto' | 'interactive' | 'review'
  allowWebSearch: boolean
  researchDepth: 'none' | 'light' | 'standard' | 'deep'
}
```

## Output

```ts
interface SkillOutput {
  stage: string
  status: 'passed' | 'need_more_info' | 'blocked' | 'rejected'
  decision: 'continue' | 'revise' | 'need_data' | 'stop'
  summary: string
  outputFile: string
  researchFile?: string
  updatedSourcesFile?: string
  nextStage?: string
  questions?: string[]
  risks?: string[]
  evidenceLevel: 'high' | 'medium' | 'low'
}
```

## Required Behavior

1. 检查上游文件是否存在。
2. 读取上游文档和 research 文档。
3. 判断是否需要 Web Search。
4. 需要时生成 Research Plan 并执行搜索。
5. 写入当前阶段文档。
6. 需要时写入当前阶段 research 文档。
7. 更新 sources.json。
8. 更新 status.json。
9. 返回结构化执行结果。

## Failure Behavior

即使无法完成，也必须落盘当前阶段文档，说明：

- 已读取的信息。
- 缺失的信息。
- 阻塞原因。
- 建议下一步。
- 当前是否应继续、回退、暂缓或停止。
