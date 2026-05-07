# Obsidian / CLI 使用积累

## 路径
- Vault 根目录：`/Users/jaker/Documents/Obsidian Vault/`
- 本知识库：`/Users/jaker/Documents/Obsidian Vault/小白vibe coding知识库/`
- 通用需求模板：`/Users/jaker/Documents/Obsidian Vault/需求/_模板/`
- 路径含空格，CLI 操作时用引号包裹

## 读写规则
- 新建需求：从根目录 `需求/_模板/` 复制到 `需求/<需求名>/`，填充 frontmatter
- 不要修改 `.obsidian/` 下的配置文件

## Obsidian 链接
- 内部链接用 `[[文件名]]` 格式
- 跨文件夹引用用 `[[文件夹/文件名]]`

## 与 Claude Code 的配合
- 工作目录设在 Vault 根目录时，根目录 CLAUDE.md 生效（路由到子知识库）
- 工作目录设在本子知识库时，本目录 CLAUDE.md 生效
- 用 Read/Write/Edit 工具直接操作 .md 文件
- 用 Glob 搜索：`Glob("需求/**/*.md")`
- 用 Grep 搜索特定内容
