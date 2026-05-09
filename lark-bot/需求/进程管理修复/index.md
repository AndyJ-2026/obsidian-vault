---
title: "进程管理修复"
status: dev
created: "2026-05-10"
worktree: "/Users/jaker/lark-bot-进程管理修复"
repo: "lark-bot"
branch: "feat/进程管理修复"
prd: ""
api_doc: ""
design: ""
project: ""
---

# 进程管理修复

## 背景

bot 存在两套启动机制冲突：
1. `start-local.sh` — 手动启动
2. `LaunchAgent (com.jaker.lark-bot.plist)` — 开机自启 + KeepAlive

KeepAlive: true 会在进程被杀后立刻拉起新实例，导致多个 bot.py 同时运行、抢事件、重复回复。

## 目标

统一为一套启动机制，确保任何情况下只有一个 bot.py 在跑。
