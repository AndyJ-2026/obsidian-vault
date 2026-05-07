# Frontmatter 约定

## 需求 index.md
```yaml
---
title: "需求名称"
status: draft | spec | design | dev | review | done
created: "YYYY-MM-DD"
worktree: "<worktree 绝对路径>"
repo: "<仓库名>"
branch: "feat/<需求名>"
prd: "飞书链接"
api_doc: "飞书链接"
design: "飞书链接"
project: "飞书链接"
---
```

## 规格.md
```yaml
---
title: "模块名 规格"
version: 1
status: draft | review | approved
parent: "[[index]]"
---
```

## 技术方案.md
```yaml
---
title: "模块名 技术方案"
version: 1
based_on: "规格v1"
status: draft | review | approved
---
```

## 任务清单.md
```yaml
---
title: "模块名 任务清单"
version: 1
based_on: "技术方案v1"
status: active | completed
---
```

## 调研文档
```yaml
---
title: "调研主题"
created: "YYYY-MM-DD"
sources:
  - "URL 或文档名"
status: draft | done
---
```

## 版本追踪规则
- version 从 1 开始，每次实质修改 +1
- based_on 格式：`<文档类型>v<版本号>`（如 `规格v2`）
- based_on 与上游 version 不匹配 = 过期，需先同步
