# 飞书 Bot 部署指南

## 项目概述

飞书 AI 助手"小J"，代替 Jake 在群里跟同事互动。

功能：
- 群里 @bot → AI 回复 + 执行操作（约会议、查人、汇总消息）
- 1v1 私聊 → 直接对话
- 每天 20:00 → 自动发工作日报

技术栈：Python + lark-cli（WebSocket 长连接） + MiniMax AI

## 架构

```
飞书服务器
  ↓ WebSocket 长连接
lark-cli event +subscribe（接收消息，写入 JSON 文件）
  ↓ 文件
bot.py（轮询 events 目录，处理消息，调 AI，回复）
```

lark-cli 负责两件事：
1. WebSocket 订阅事件（收消息）
2. API 调用（发消息、查日历、查人等）

## 本地部署（当前方案）

项目目录：`~/lark-bot`

### 环境依赖

```bash
# lark-cli（Node.js 工具）
npm install -g @larksuite/cli@latest

# Python 依赖
pip3 install lark-oapi openai
```

### 配置 lark-cli

```bash
echo "你的APP_SECRET" | lark-cli config init \
  --app-id cli_a97a30b1a70a9db9 \
  --app-secret-stdin \
  --brand lark
```

注意：lark-cli 把 secret 存在 macOS Keychain 里，不是明文文件。

### 开机自启（launchd）

配置文件：`~/Library/LaunchAgents/com.jaker.lark-bot.plist`

```bash
# 启动
launchctl load ~/Library/LaunchAgents/com.jaker.lark-bot.plist

# 停止
launchctl unload ~/Library/LaunchAgents/com.jaker.lark-bot.plist

# 看日志
tail -f ~/lark-bot/bot.log

# 看错误
tail -f ~/lark-bot/bot.err
```

特性：
- 登录 Mac 自动启动
- 崩溃自动重启（KeepAlive）
- 合上电脑会断

### 需要的环境变量

在 plist 的 EnvironmentVariables 里设置：
- `LARK_APP_ID` - 飞书应用 ID
- `LARK_APP_SECRET` - 飞书应用密钥
- `MINIMAX_API_KEY` - MiniMax AI 的 API Key
- `PATH` - 需要包含 lark-cli 所在目录

## 云端部署（Railway）

### 为什么需要云端

本地部署的问题：电脑合上就断了，手机上用不了。

### 遇到的坑

1. **Fly.io** - 免费版需要绑信用卡
2. **Render.com** - 免费版会休眠，WebSocket 断连
3. **Cloudflare Workers** - 无状态 serverless，不支持 WebSocket 长连接
4. **Railway** - 有 $5 试用额度，够跑 2-3 个月

### Railway 的核心问题：lark-cli Keychain

lark-cli 把 secret 存在 OS 的 Keychain（macOS 用 Keychain，Linux 用 gnome-keyring）。Docker 容器里没有 Keychain，导致：
- `config init --app-secret-stdin` 写入时报成功
- 但实际读不到 secret
- WebSocket 连接报错：`app_id or app_secret is invalid`

尝试过的方案（都失败了）：
- 直接写 config.json 明文 → lark-cli 不认
- 装 gnome-keyring + dbus → 容器里 keyring daemon 起不来

### 正确的解决方案：用 Python SDK 替代 lark-cli 做事件订阅

`lark-oapi` Python 包自带 WebSocket 客户端（`lark_oapi.ws.Client`），可以直接连飞书服务器接收事件，不需要 lark-cli。

改造思路：
- 事件订阅：lark-cli → `lark_oapi.ws.Client`（纯 Python，不依赖 Keychain）
- 发消息/API 调用：lark-cli → `lark_oapi` SDK（同上）
- 这样 Dockerfile 不再需要 Node.js 和 lark-cli

改造后的 Dockerfile 可以简化为：

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python3", "-u", "bot.py"]
```

### Railway 部署步骤

```bash
# 安装 CLI
brew install railway

# 登录
railway login

# 初始化项目
cd ~/lark-bot
railway init --name jaker-lark-bot

# 链接服务
railway service jaker-lark-bot

# 设置环境变量
railway variables set \
  LARK_APP_ID=cli_a97a30b1a70a9db9 \
  LARK_APP_SECRET=xxx \
  MINIMAX_API_KEY=xxx \
  LARK_DOMAIN=https://open.larksuite.com

# 部署
railway up --detach

# 看日志
railway logs
```

### 费用

Railway 试用期 30 天 / $5 额度。这个 bot 大概 $1-2/月，试用额度够跑 2-3 个月。之后 $5/月起。

## 关键文件

| 文件 | 作用 |
|------|------|
| `bot.py` | 主程序：AI 对话 + 动作执行 + 定时日报 |
| `start.sh` / `start-local.sh` | 启动脚本（配置 lark-cli + 启动订阅 + 启动 bot） |
| `Dockerfile` | 容器构建（Node.js + Python + lark-cli） |
| `requirements.txt` | Python 依赖（lark-oapi, openai） |
| `fly.toml` / `railway.json` | 云平台部署配置 |

## 待完成

- [ ] 用 `lark_oapi.ws.Client` 替代 lark-cli 做事件订阅（解决容器 Keychain 问题）
- [ ] 用 `lark_oapi` SDK 替代 lark-cli 做 API 调用（发消息、查日历等）
- [ ] 部署到 Railway 验证
