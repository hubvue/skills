# Workflow Contract

## Input

```ts
interface WorkflowInput {
  idea?: string
  ideaId?: string
  workspacePath: string
  mode: 'auto' | 'interactive' | 'review'
  allowWebSearch: boolean
  defaultResearchDepth: 'none' | 'light' | 'standard' | 'deep'
  stageResearchDepth?: Record<string, 'none' | 'light' | 'standard' | 'deep'>
  startStage?: string
  endStage?: string
  skipStages?: string[]
}
```

## Output

```ts
interface WorkflowOutput {
  ideaId: string
  workflowStatus: 'done' | 'paused' | 'blocked' | 'rejected'
  decision: 'approved_requirement' | 'idea_pool' | 'deferred' | 'rejected'
  finalRequirementFile?: string
  decisionFile: string
  statusFile: string
  evidenceSummaryFile?: string
  missingInformation?: string[]
  nextActions?: string[]
}
```

## Required Behavior

1. Bootstrap workspace if this is a new idea.
2. Load `status.json` if resuming.
3. Run stages according to `stage-order.md`.
4. Respect `startStage`, `endStage`, and `skipStages`.
5. Pass upstream docs and research docs into each node.
6. Let each node decide whether to search.
7. Persist every node result.
8. Stop only after writing a decision document.
