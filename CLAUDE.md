# Obsidian 知识库 — AI 工作约定

本知识库是 AI Agent 的主工作目录。业务上下文在这里，代码在 worktree 里。

## 核心原则
1. **规格驱动**：规格 → 技术方案 → 任务清单，每阶段审阅通过才进入下一阶段
2. **小原子渐进**：需求拆成最小可交付模块，每模块独立走三件套循环
3. **版本追踪**：based_on 与上游 version 不匹配 = 需要先同步再继续
4. **上下文分区**：context 窗口专注执行，业务上下文读写知识库

## 子模块（按需阅读）
- @ai/meta.md — 项目定位与目录结构
- @ai/workflow.md — 研发流程与阶段门禁
- @ai/repo.md — 关联代码仓库与 worktree 命名
- @ai/frontmatter.md — 各类文档 frontmatter 约定
- @ai/mermaid.md — Mermaid 图规范
- @ai/obsidian.md — Obsidian/CLI 使用积累
- @ai/lark.md — 飞书 CLI/Skills 使用积累

## 工作模式
### 从知识库出发（默认）
工作目录在此，适合需求梳理、方案设计、调研。需要改代码时，读 index.md frontmatter 的 worktree 字段跨过去。

### 从代码出发
工作目录在 worktree，适合深度编码。通过飞书 Skills 或绝对路径读取知识库。
