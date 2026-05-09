---
title: "飞书机器人提醒功能"
status: done
created: "2026-05-08"
worktree: "/Users/jaker/lark-bot-remind"
repo: "lark-bot"
branch: "feat/remind"
prd: ""
api_doc: ""
design: ""
project: ""
---

# 飞书机器人提醒功能

## 背景与目标

用户在群里或私聊跟 bot 说"明天中午提醒我写周报"，bot 到时间自动发消息提醒。当前 bot 没有提醒能力，用户说了等于白说。

## 范围

仅改动 `bot.py`，新增 `reminders.json` 持久化文件。

## 模块拆分

| 模块 | 状态 | 规格版本 | 方案版本 | 任务版本 |
|------|------|----------|----------|----------|
| remind action | draft | - | - | - |
| scheduler 扩展 | draft | - | - | - |

## 相关文档
- 代码仓库: /Users/jaker/lark-bot
