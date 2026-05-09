---
title: "稳定性与新能力"
status: dev
created: "2026-05-09"
worktree: "/Users/jaker/lark-bot-稳定性与新能力"
repo: "lark-bot"
branch: "feat/稳定性与新能力"
prd: ""
api_doc: ""
design: ""
project: ""
---

# 稳定性与新能力

## 背景与目标

本次改动涉及多个功能新增和稳定性修复，此前已直接在 main 上开发并推送。现在需要排查代码逻辑冲突，确保 bot 能正常启动运行。

## 涉及的改动（已在 main 上）

1. **转写引擎选择引导** — 首次转写时选本地 SenseVoice 或云端 Whisper API
2. **音频设备自动检测** — audio_capture --auto，蓝牙强制内置麦克风
3. **日报 scheduler 修复** — 去掉 minute==0 精度问题
4. **私聊上下文对话** — 最近 10 条，1 小时过期
5. **私聊 prompt 补全** — digest/daily_report 在私聊可触发
6. **新增能力** — 任务管理、查日程、读文档
7. **卡片消息** — 任务/会议创建后发卡片+私信通知
8. **断线重连** — bot.py 自管 lark-cli，watchdog 检测+自动重连
9. **Obsidian 保存可选** — 无 vault 目录时跳过

## 当前问题

bot.py 启动后 lark-cli subscriber 没有成功运行，导致机器人无响应。需要排查 `_start_lark_ws` 和整体启动流程。

## 相关文档
- 代码仓库: /Users/jaker/lark-bot
- Meeting CLI 仓库: /Users/jaker/meeting-cli
