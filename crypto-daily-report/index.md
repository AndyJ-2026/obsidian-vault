---
title: "crypto-daily-report"
repo: "crypto-daily-report"
local_path: "/Users/jaker/crypto-daily-report"
github: "https://github.com/AndyJ-2026/crypto-daily-report"
private: false
status: running
deploy: github-actions
delivery: cloudflare-relay
---

# crypto-daily-report

独立的加密货币日报生成与发送项目。每天定时抓取价格与 PANEWS 内容，组装为固定格式日报，并通过 Cloudflare Worker relay 发送单张 Lark interactive card。

## 当前状态

- 现在已经独立运行
- 代码与 workflow 已迁移到独立仓库
- Obsidian Vault 只保留项目入口、规则说明和协作文档
- 原 `obsidian-vault` 内的日报 workflow 已进入退场流程，避免双发

## 项目边界

- Obsidian 入口：当前文档
- 当前代码位置：`/Users/jaker/crypto-daily-report`
- 当前 GitHub 仓库：`AndyJ-2026/crypto-daily-report`
- 当前项目类型：独立仓库型自动运营项目

## 架构

```text
GitHub Actions (10:30 BJT)
  -> /Users/jaker/crypto-daily-report/scripts/crypto-daily-report.mjs
    -> CoinMarketCap / CryptoSlate
    -> PANEWS RSS + 页面
    -> Cloudflare Worker /send-lark
    -> Lark webhook
```

## 代码结构

```text
/Users/jaker/crypto-daily-report/
  README.md                       <- 项目说明
  scripts/
    crypto-daily-report.mjs       <- 日报生成与发送脚本
  .github/workflows/
    crypto-daily-report.yml       <- 远端定时任务入口
```

## 运行规则

- 调度时间：北京时间每天 `10:30`
- 发送方式：只发送一条消息、只发送一张卡片
- 转发方式：必须经由 Cloudflare relay，不直接 POST Lark webhook
- 正文格式：由 `.agents/skills/crypto-daily-report/SKILL.md` 定义

## 配置

GitHub Actions 依赖以下仓库 secrets：

- `CRYPTO_DAILY_RELAY_URL`
- `CRYPTO_DAILY_RELAY_SECRET`
- `CRYPTO_DAILY_LARK_WEBHOOK_URL`
- `CRYPTO_DAILY_LARK_WEBHOOK_SECRET`
