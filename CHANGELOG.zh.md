# 更新日志

本项目的所有重要更改都将记录在此文件中。

## 1.0.1 - 2026-01-22

### 文档
- 更新 README，改进格式和结构

## 1.0.0 - 2026-01-22

### 初始发布

kim-skills Claude Code 插件的首次正式发布。

### 功能特性

**前端分析 (fe-analysis)**
- `architecture-analysis` - 综合前端架构分析器，可识别技术栈、构建工具和架构模式。支持检测 Vue/React/Angular 框架、Node.js 环境、包管理器、TypeScript 使用情况、代码检查工具和架构模式。提供多种输出格式，包括 JSON、Markdown、执行摘要和评分卡。

- `dependency-analysis` - 增强的依赖分析器，提供全面的 Markdown 报告和可操作的建议。执行安全扫描、未使用包检测、幽灵依赖识别、循环依赖检测和清理脚本生成。支持 JavaScript、TypeScript、Vue、React、Angular 和现代构建工具，具有并行处理和增量分析功能。

- `unit-test-generator` - 智能单元测试生成器，可检测现有测试框架并为函数、组件和模块生成综合测试。通过分析现有测试模式保持框架一致性。支持 Jest、Vitest、Mocha 以及 React、Vue、Angular 框架。

**项目 (project)**
- `resume-project-analyzer` - 通过 5 步工作流程将代码库转换为真实、可防御的简历项目经验。分析项目结构、提取工程价值、对信心级别进行分类、进行反思性提问并生成结构化输出。

- `prd-gatekeeper` - 工程 PRD 看门人，通过 5 个严格质量门槛验证 PRD，确保为工程师提供生产就绪的文档。当存在工程风险时阻止进度，确保没有隐含的产品决策被推送到实现阶段。

**生产力 (productivity)**
- `prompt-interviewer` - 高级提示工程师和提示面试官，通过结构化分析和迭代式提问来帮助用户完善和完成提示。作为面试官而不是提示重写器，确保提示在执行前明确且结构良好。

- `release-skills` - 自动化 kim-skills 插件的发布流程：分析自上次标签以来的更改、更新 CHANGELOG（中英文）、更新 marketplace.json 版本、提交并创建版本标签。
