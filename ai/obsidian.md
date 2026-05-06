# Obsidian / CLI 使用积累

## 读写规则
- 知识库路径：`/Users/jaker/Documents/Obsidian Vault/`
- 路径含空格，CLI 操作时用引号包裹
- 新建需求：复制 `需求/_模板/` 为 `需求/<需求名>/`，填充 frontmatter
- 不要修改 `.obsidian/` 下的配置文件

## Obsidian 链接
- 内部链接用 `[[文件名]]` 格式
- 跨文件夹引用用 `[[文件夹/文件名]]`

## 与 Claude Code 的配合
- 工作目录设在知识库根目录时，CLAUDE.md 自动生效
- 用 Read/Write/Edit 工具直接操作 .md 文件
- 用 Glob 搜索知识库内容：`Glob("需求/**/*.md")`
- 用 Grep 搜索特定内容
