---
title: "lark-bot"
repo: "lark-bot"
local_path: "/Users/jaker/lark-bot"
github: "https://github.com/AndyJ-2026/lark-bot"
private: true
status: running
deploy: local
app_id: "cli_a97a30b1a70a9db9"
brand: lark
---

# lark-bot — 飞书 AI 助手"小J"

代替 Jake 在飞书群里跟同事互动的 AI 机器人。

## 功能

| 功能 | 触发方式 | 说明 |
|------|----------|------|
| 群聊回复 | 群里 @bot | AI 生成回复，可执行操作 |
| 私聊对话 | 1v1 发消息 | 仅限 Jake |
| 约会议 | @bot "帮我约个会" | 解析时间/参与者，调日历 API |
| 取消会议 | @bot "取消那个会议" | 按关键词匹配删除 |
| 查人 | @bot "查一下 xxx" | 搜索飞书通讯录 |
| 消息汇总 | @bot "汇总一下" | 拉近 2 天消息，AI 总结 |
| 工作日报 | 每天 20:00 | 汇总当天日历+消息，私信 Jake |

## 架构

```
飞书服务器
  ↓ WebSocket 长连接
lark-cli event +subscribe
  ↓ 写 JSON 到 events/
bot.py（轮询 events/ → 调 MiniMax AI → 执行 action → lark-cli 回复）
```

## 技术栈

- 事件接收：lark-cli WebSocket（`lark-cli event +subscribe`）
- 消息处理：Python 3，轮询 `events/` 目录（1 秒间隔）
- AI：MiniMax M2.5（OpenAI 兼容 API）
- API 调用：lark-cli 命令行（发消息、查日历、查通讯录）
- 凭证存储：macOS Keychain（lark-cli 自管理，不可直接查看）

## 代码结构

```
bot.py              ← 主程序（所有逻辑在一个文件）
start-local.sh      ← 本地启动：起 lark-cli 订阅 + bot.py
start.sh            ← 云端启动（Docker 用）
Dockerfile          ← 容器构建
requirements.txt    ← Python 依赖：lark-oapi, openai
events/             ← lark-cli 写入的事件 JSON（运行时生成）
```

### bot.py 内部模块

| 模块 | 行数范围 | 职责 |
|------|----------|------|
| Config | 10-30 | 环境变量、MiniMax 客户端 |
| Prompts | 31-83 | 四个 prompt（群聊/私聊/日报/汇总） |
| AI | 84-115 | call_ai() + parse_ai()，返回 JSON |
| Lark CLI | 116-150 | lark_cmd() 封装、reply_in_chat()、send_dm() |
| Actions | 151-310 | do_meeting / do_cancel / do_search / do_digest |
| Detection | 320-330 | is_bot_mentioned() / extract_text() |
| Event Process | 330-380 | process_event()，message_id 去重，p2p/group 分流 |
| Scheduler | 410-430 | 20:00 触发 send_daily_report() |
| Main Loop | 430-460 | watch_event_dir()，轮询 events/ |

## 部署

当前：**本地 Mac 运行**（手动启动）

```bash
# 启动
cd ~/lark-bot
./start-local.sh

# 或手动分步
lark-cli event +subscribe --as bot --event-types "im.message.receive_v1" --compact --quiet --output-dir ./events &
python3 -u bot.py
```

详见 [[部署指南]]

## 已知问题与注意事项

- lark-cli 凭证存 macOS Keychain，**绝对不要用 `security delete-generic-password` 删除 lark-cli 相关条目**，否则 secret 永久丢失
- lark-cli 偶尔对同一消息写入多个事件文件，bot.py 已加 message_id 去重
- 多个 bot.py 进程同时运行会导致重复回复，启动前先确认无残留进程
- 合上电脑 bot 停止运行
- 云端部署需用 Python SDK（`lark_oapi.ws.Client`）替代 lark-cli，因容器无 Keychain

## 文档

- [[部署指南]] — 部署步骤、环境配置、云端方案对比
