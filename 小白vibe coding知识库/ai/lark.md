# 飞书 CLI / Skills 使用积累

## 可用 Skills
当前会话中可通过 Skill 工具调用以下飞书能力：
- **documents** — 读写飞书文档（获取内容/创建/追加）
- **sheets** — 读取飞书表格
- **bitable** — 读取多维表格
- **calendar** — 日历管理（查看/创建/删除日程）
- **contacts** — 通讯录查询（查人/查部门）
- **messages** — 消息收发与表情回复
- **minutes** — 会议录音与纪要
- **email** — 邮件读取与搜索

## 常见用法
### 拉取 PRD 到本地
1. 从需求 index.md 读取 prd 链接
2. 用 documents skill 拉取内容
3. 保存到 `需求/<需求名>/调研/PRD.md`

### 方案回写到飞书
1. 本地方案写好后
2. 用 documents skill 创建或追加到线上文档
3. 将文档链接更新到 index.md frontmatter

### 拉取会议纪要
1. 用 minutes skill 获取录音转写
2. 保存到 `会议纪要/` 目录

## MCP 工具
除 Skills 外，还可通过 MCP 工具直接调用：
- `mcp__claude_ai__fetch_url` — 抓取飞书页面
- `mcp__claude_ai__scrape_page` — 结构化提取页面内容
- `mcp__claude_ai__send_lark` — 发送飞书消息
