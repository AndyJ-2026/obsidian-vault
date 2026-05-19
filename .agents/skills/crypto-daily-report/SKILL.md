---
name: crypto-daily-report
description: 生成每日加密货币行情日报。当用户说“加密日报”、“加密货币日报”、“生成加密日报”、“每日加密资讯”、“加密市场日报”或“crypto daily”时使用。按旧 Claude trigger 规则获取 BTC/ETH/SOL 价格、PANEWS RSS/页面新闻，输出完整长日报，并可通过 Lark 卡片发送。
---

# 加密日报

## 触发条件

用户表达要生成加密货币日报、加密市场日报、每日加密资讯、Crypto Daily，或要求手动补发日报时，使用本技能。

## 旧 Trigger 背景

旧 Claude trigger 配置参考：
- Trigger ID: `trig_01YPnW9KCrauDePJ4tT7RHzS`
- 时间：每天北京时间 10:30，cron 为 `30 2 * * *`
- 旧模型：`claude-sonnet-4-6`
- 旧 MCP Connector：“加密日报”
- 旧 MCP Worker：`https://black-swan-mcp.ysf63453.workers.dev/mcp`
- Worker 代码：`/Users/jaker/black-swan-monitor/mcp-server/src/index.ts`
- Worker 的 `send_lark` 工具会发送 Lark interactive card，卡片 body 使用单个 markdown 元素。

## 当前推荐实现

- 当前推荐把日报生成与发送放到远端定时任务里运行，不依赖本地 worktree 是否在线。
- 当前代码仓：
  - 本地：`/Users/jaker/crypto-daily-report`
  - GitHub：`https://github.com/AndyJ-2026/crypto-daily-report`
- 当前调度源：Cloudflare Worker `black-swan-mcp` 的 Cron Trigger，cron 为 `30 2 * * *`。
- GitHub Actions 只保留 `workflow_dispatch`，由 Cloudflare Cron 触发执行。
- 远端 GitHub Actions 工作流与脚本路径：
  - `/Users/jaker/crypto-daily-report/.github/workflows/crypto-daily-report.yml`
  - `/Users/jaker/crypto-daily-report/scripts/crypto-daily-report.mjs`
- Obsidian 项目入口：
  - `crypto-daily-report/index.md`
- 模型可以更换，但日报规则和发送目标应该保持由仓库文件定义，而不是依赖某个模型私有 connector 名称。

## 工作流

1. 获取当前北京时间，日报标题使用 `加密货币日报`。
2. 获取 BTC、ETH、SOL 实时价格和 24 小时涨跌幅。
   - 首选 CoinMarketCap: `https://coinmarketcap.com/`
   - 备选 CryptoSlate: `https://cryptoslate.com/`
3. 必须优先使用 PANEWS RSS 获取完整新闻列表。
   - 快讯 RSS: `https://rss.panewslab.com/zh/tvsq/rss`
   - 精选 RSS: `https://rss.panewslab.com/zh/gtimg/rss`
4. 解析 RSS 中当天和前一天的新闻，避免因时区和发布时间遗漏。
5. 同时访问 PANEWS 页面补充：
   - `https://www.panewslab.com/zh/newsflash`
   - `https://www.panewslab.com/zh/industry`
   - `https://www.panewslab.com/zh/competition`
   - `https://www.panewslab.com/zh/capital`
6. 如果 PANEWS 内容不足，再用联网搜索补充监管政策、交易所动态、投融资新闻。
7. 去重，保留原始标题和链接。

## 分类规则

- 行业资讯：监管、宏观、政策、ETF、机构持仓、安全事件、链上数据、矿业、稳定币、重要项目动态等。不要写行情走势判断。
- 竞品动态：
  - 交易所（CEX）：Binance、OKX、Bybit、Coinbase、Kraken、Bitget、Gate、MEXC、Robinhood、MSX、FalconX、Kraken、SBI、乐天等。
  - DEX：Hyperliquid、Uniswap、PancakeSwap、Curve、dYdX、Jupiter，以及 DeFi 协议、稳定币铸造、流动性质押、链上交易基础设施等。
  - 其他：OpenSea、NFT、RWA、支付、钱包、机构加密产品、Token 套餐、AI/Agent + crypto 等。
- 投融资：融资、收购、IPO、Pre-IPO、上市、机构增持/减持、战略投资、基金、回购、可转债、重大资本动作。投融资必须尽量全部列出，不随意截断。

## 数量要求

- 行业资讯：优先展示所有重要新闻，至少 15 条；如果当天新闻很多，可以 15-25 条。
- 竞品动态：按 CEX / DEX / 其他分类展示，至少 10 条。
- 投融资：尽量全部列出，目标至少 8 条；如果确实不足，列出所有已获取到的，不编造。

## 输出要求

- 只输出日报正文，不添加执行说明、验证说明或“已完成/条数统计”。
- 每条资讯保留可点击 Markdown 超链接。
- 只保留超链接格式，不要摘要段落、来源解释或额外评论。
- 不要拆成多条消息或多张卡片；发送到 Lark 时必须是一张 interactive card。
- 如果内容过长，优先保留标题链接列表的完整性，减少解释文字，不减少主要新闻条数。

## 正文格式

```markdown
加密货币日报
截止[YYYY年M月D日 HH:mm]（北京时间）
BTC报价 $XXX,XXX (24小时 +X.XX%)
ETH报价 $X,XXX (24小时 +X.XX%)
SOL报价 $XX.XX (24小时 +X.XX%)
来自：[CoinMarketCap](https://coinmarketcap.com/)
---

一、行业资讯
[标题](链接)
[标题](链接)
...
来自：[PANEWS](https://www.panewslab.com/)
---

二、竞品动态

交易所（CEX）
[标题](链接)
...

DEX
[标题](链接)
...

其他
[标题](链接)
...
来自：[PANEWS](https://www.panewslab.com/)
---

三、投融资
[标题](链接)
[标题](链接)
...
来自：[PANEWS](https://www.panewslab.com/)
```

## Lark 卡片发送

发送到 Lark 时使用单张 interactive card：

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {"tag": "plain_text", "content": "加密货币日报"},
      "template": "blue"
    },
    "elements": [
      {"tag": "markdown", "content": "完整日报正文"}
    ]
  }
}
```

Lark 签名规则：
- `timestamp` 为 Unix 秒级时间戳字符串。
- `string_to_sign = timestamp + "\n" + secret`
- HMAC-SHA256 的 key 为 `string_to_sign`，message 为空字符串，结果 Base64 编码为 `sign`。
