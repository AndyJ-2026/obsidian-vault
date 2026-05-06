# 关联代码仓库与 Worktree

## GitHub 账号
- 用户名：AndyJ-2026

## 仓库列表

| 仓库 | 本地路径 | 用途 |
|------|----------|------|
| lark-bot | /Users/jaker/lark-bot | 飞书机器人（私有） |
| black-swan-monitor | /Users/jaker/black-swan-monitor | 黑天鹅监控 |
| meeting-cli | /Users/jaker/meeting-cli | 会议 CLI 工具 |

## Worktree 命名约定
```
/Users/jaker/<仓库名>           ← 干净源仓，不直接开发
/Users/jaker/<仓库名>-<需求名>  ← worktree，配独立 Claude Code 会话
```

示例：
```
/Users/jaker/lark-bot              ← 源仓
/Users/jaker/lark-bot-webhook重构  ← worktree
```

## Worktree 操作速查
```bash
# 创建 worktree（从源仓执行）
cd /Users/jaker/<仓库名>
git worktree add ../<仓库名>-<需求名> -b feat/<需求名>

# 查看所有 worktree
git worktree list

# 完成后清理
git worktree remove ../<仓库名>-<需求名>
```

## 与知识库的关联
需求 index.md 的 frontmatter 中填写：
```yaml
worktree: "/Users/jaker/lark-bot-webhook重构"
repo: "lark-bot"
branch: "feat/webhook重构"
```
