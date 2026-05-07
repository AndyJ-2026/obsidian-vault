# 关联代码仓库与 Worktree

## Worktree 命名约定
```
<仓库路径>/              ← 干净源仓，不直接开发
<仓库路径>-<需求名>/     ← worktree，配独立 Claude Code 会话
```

示例：
```
~/my-project              ← 源仓
~/my-project-新功能       ← worktree
```

## Worktree 操作速查
```bash
# 创建 worktree（从源仓执行）
cd <仓库路径>
git worktree add ../<仓库名>-<需求名> -b feat/<需求名>

# 查看所有 worktree
git worktree list

# 完成后清理
git worktree remove ../<仓库名>-<需求名>
```

## 与知识库的关联
需求 index.md 的 frontmatter 中填写：
```yaml
worktree: "<worktree 绝对路径>"
repo: "<仓库名>"
branch: "feat/<需求名>"
```
