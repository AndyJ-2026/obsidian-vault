---
title: "飞书机器人消息分析修复与增强"
status: done
created: "2026-05-07"
worktree: "/Users/jaker/lark-bot-digest-fix"
repo: "lark-bot"
branch: "feat/digest-fix"
prd: ""
api_doc: ""
design: ""
project: ""
---

# 飞书机器人消息分析修复与增强

## 背景与目标

飞书群机器人（小J）在处理消息汇总/分析请求时存在 3 个问题：
1. AI 返回混合文本+JSON 时解析失败，action 不执行，原始 JSON 被当文本发到群里
2. 拉取群消息时字段路径错误（`body.content` vs `content`），导致消息内容永远为空，汇总结果始终是"没人找你"
3. digest 只能做 Jake 相关的通用汇总，不支持按人/按话题做定向分析

目标：修复以上 bug，并让机器人能响应「帮我看看 XX 提了什么需求」「分析一下 trigger 发的内容」等个性化分析请求。

## 范围

仅改动 `bot.py`，不涉及部署架构变更。

## 模块拆分

| 模块 | 状态 | 规格版本 | 方案版本 | 任务版本 |
|------|------|----------|----------|----------|
| parse_ai 修复 | done | v1 | v1 | v1 |
| digest 消息拉取修复 | done | v1 | v1 | v1 |
| digest 定向分析增强 | done | v1 | v1 | v1 |
| 日报同步修复 | done | v1 | v1 | v1 |

## 相关文档
- 代码仓库: /Users/jaker/lark-bot
- 问题复现截图: 群里机器人把 JSON 原文发出来了
