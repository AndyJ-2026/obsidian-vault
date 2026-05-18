---
title: "black-swan-monitor"
repo: "black-swan-monitor"
local_path: "/Users/jaker/black-swan-monitor"
github: "https://github.com/AndyJ-2026/black-swan-monitor"
private: false
status: paused
deploy: remote-trigger
delivery: lark-alert
---

# black-swan-monitor

加密货币黑天鹅事件监控，监控 Binance/OKX/Bybit + 链上数据，异常时推送飞书告警。

## 当前状态

- 当前不在持续运行
- 监控逻辑尚未收完，重复信息过滤和 Twitter 扫描策略仍待完善
- 已确认后续会接入 DataWind API 作为动态币种清单来源

## 运行链路

```text
remote trigger
  -> /Users/jaker/black-swan-monitor/monitor.py
  -> /Users/jaker/black-swan-monitor/mcp-server/src/index.ts
  -> Lark 告警
```

## 项目边界

- Obsidian 入口：当前文档
- 本地代码仓：`/Users/jaker/black-swan-monitor`
- GitHub 仓库：`AndyJ-2026/black-swan-monitor`
- 项目类型：独立仓库型自动运营项目
