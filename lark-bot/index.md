---
title: "lark-bot"
repo: "lark-bot"
local_path: "/Users/jaker/lark-bot"
github: "https://github.com/AndyJ-2026/lark-bot"
private: false
status: running
deploy: local
app_id: "cli_a97a30b1a70a9db9"
brand: lark
---

# lark-bot — 飞书 AI 助手

可配置的飞书 AI 机器人。clone 后一键安装，聊天内完成配置，零编码上手。

## 快速开始

```bash
git clone https://github.com/AndyJ-2026/lark-bot.git
cd lark-bot
./setup.sh        # 一键安装所有依赖
./start-local.sh  # 启动机器人
```

启动后在飞书私聊机器人，按提示完成配置（取名字、填 API Key）。

## 功能

| 功能 | 触发方式 | 说明 |
|------|----------|------|
| 群聊回复 | 群里 @bot | AI 生成回复，可执行操作 |
| 私聊对话 | 1v1 发消息 | 带上下文（最近 10 条，1 小时过期），所有人可用 |
| 约会议 | "帮我约个会" | 解析时间/参与者，发卡片通知，参会人收飞书日历邀请 |
| 取消会议 | "取消那个会议" | 按关键词匹配删除 |
| 查人 | "查一下 xxx" | 搜索飞书通讯录 |
| 消息汇总 | "汇总一下" | 拉近 2 天 owner 相关消息，AI 总结（仅 owner） |
| 定向分析 | "帮我看看 XX 提了什么" | 按人/话题分析群消息 |
| 设提醒 | "明天中午提醒我写周报" | AI 解析时间，到时间自动发消息 |
| 创建任务 | "帮我建个任务 XXX" | 创建飞书任务，被指派人通过任务助手收到通知 |
| 查看待办 | "我的待办"/"有什么任务" | 列出待办任务列表 |
| 完成任务 | "完成任务 XXX" | 按 task_id 标记完成 |
| 查日程 | "明天有什么会"/"下周三有空吗" | 查看指定日期范围的日历 |
| 读文档 | 发送飞书文档链接或 ID | 读取内容，过长自动 AI 概括 |
| 会议转写 | "帮我转写" | 录音+ASR转写+AI纪要+飞书云文档，首次引导选引擎 |
| 工作日报 | 每天 20:00 自动 / 说"日报" | 汇总当天日历+消息，仅 owner 可用 |
| 查群列表 | "哪些群"/"在哪些群" | 列出 bot 已加入的群 |
| 帮助 | "帮助"/"help"/"你能做什么" | 发送功能清单卡片 |

## 架构

```
飞书服务器
  ↓ WebSocket 长连接
lark-cli event +subscribe（由 bot.py 管理，断线自动重连）
  ↓ 写 JSON 到 events/
bot.py（轮询 events/ → AI 解析 → 执行 action → lark-cli 回复）
  ↓ 每 30 秒 watchdog 检查 lark-cli 存活
  ↓ 启动/重连时私发"已上线"卡片
```

## 技术栈

- 事件接收：lark-cli@1.0.0 WebSocket（bot.py 内管理，自动重连）
- 消息处理：Python 3.12，轮询 events/ 目录
- AI：可配置（MiniMax / DeepSeek / 通义千问等 OpenAI 兼容 API）
- API 调用：lark-cli 命令行（im / calendar / task / docs / contact）
- 会议转写：ScreenCaptureKit 录音 + SenseVoice 或云端 Whisper API（首次引导选择）
- 音频采集：自动检测音频设备（有线/蓝牙/外放），蓝牙时强制内置麦克风
- 凭证存储：macOS Keychain（lark-cli 自管理）

## 代码结构

```
bot.py              ← 主程序（v8，可配置）
config.json         ← 运行时配置（首次聊天自动生成）
config.example.json ← 配置模板
setup.sh            ← 一键安装脚本
start-local.sh      ← 启动脚本（自动清理旧进程）
transcribe_qwen.py  ← ASR 转写脚本（SenseVoice）
requirements.txt    ← Python 依赖
events/             ← 事件 JSON（运行时生成）
meeting-cli/        ← 会议录音工具（setup.sh 自动 clone）
.venv/              ← Python 虚拟环境（setup.sh 自动创建）
```

### bot.py 内部模块

| 模块 | 职责 |
|------|------|
| Config | config.json 读写、LLM 延迟初始化 |
| Setup | 首次配置状态机（不需要 LLM） |
| Onboarding | 新用户引导、快速开始卡片、ASR 引擎选择引导 |
| Prompts | 模板化 prompt（使用 config 变量） |
| AI | call_ai() + parse_ai()，私聊带上下文历史 |
| Lark CLI | lark_cmd() 封装 |
| Actions | 约会议/取消/查人/汇总/提醒/转写/任务/日程/读文档 |
| Cards | 任务卡片、会议卡片、转写卡片、上线通知卡片 |
| Transcribe | 录音+转写(本地/云端)+纪要+飞书文档+卡片状态 |
| WS Manager | lark-cli WebSocket 启动/监控/断线自动重连 |
| Scheduler | 20:00 日报 + 提醒检查 + lark-cli watchdog |
| Event Loop | watch_event_dir() 轮询处理 |

## 部署

当前：**本地 Mac 运行**

```bash
cd ~/lark-bot && ./start-local.sh
```

start-local.sh 会自动清理旧进程，确保只有一个 bot 在跑。

## 已知问题与注意事项

- lark-cli 凭证存 macOS Keychain，**绝对不要删除相关条目**
- lark-cli 锁定 1.0.0 版本，新版不兼容海外版
- bot.py 自管 lark-cli 进程，断网后 30 秒内自动重连
- 合上电脑 bot 停止运行，打开后 LaunchAgent 自动重启
- 首次转写会引导选择 ASR 引擎（本地 SenseVoice 或云端 Whisper API）
- 首次使用本地 ASR 会下载模型（约 800MB）
- 蓝牙耳机录音时自动切换到内置麦克风（避免 HFP 降质）

## 需求记录

- [[需求/小J-help命令/index|小J-help命令]] — help 功能
- [[需求/lark-bot-digest-fix/index|消息分析修复与增强]] — parse_ai 修复 + 定向分析
- [[需求/提醒功能/index|提醒功能]] — 定时提醒，scheduler 轮询 reminders.json
- [[需求/会议自动转写/index|会议自动转写]] — 录音+SenseVoice转写+AI纪要+飞书云文档+卡片状态
- [[需求/新手引导/index|新手引导]] — 首次配置+快速开始卡片+去硬编码(v8)
- [[需求/一键安装/index|一键安装]] — setup.sh 自动检测安装所有依赖

## 文档

- [[部署指南]] — 部署步骤、环境配置、云端方案对比
- [飞书文档](https://l7jipx1bfq.larksuite.com/wiki/WcLswYoMHijtglkw1hLu23hVsLf) — 小J飞书助手说明
