# Meeting CLI 安装指南

这个指南帮你从零装好会议纪要工具。整个过程大概 10-15 分钟，主要是等下载。

装好之后看 [[Meeting CLI 使用指南]] 了解怎么用。

---

## 0. 确认系统版本

点屏幕左上角的苹果图标 →「关于本机」，看 macOS 版本号。

**必须是 macOS 13 (Ventura) 或更高**（Sonoma、Sequoia 都行）。低于 13 需要先升级：「系统设置 → 通用 → 软件更新」。

## 1. 打开终端

按 `Command + 空格`，输入"终端"或"Terminal"，回车打开。

后面所有操作都在终端里进行。每行命令输完按回车，等它跑完再输下一行。

## 2. 安装 Xcode 命令行工具

```
xcode-select --install
```

会弹出窗口，点"安装"，等几分钟。提示"已经安装过"就跳过。

## 3. 确认 Python

```
python3 --version
```

显示版本号（如 `Python 3.11.x`）就行。如果找不到，装一下：

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install python
```

第一行装 Homebrew（可能要输 Mac 开机密码，输入时不显示，输完回车）。第二行装 Python。

## 4. 安装 Claude Code CLI

```
curl -fsSL https://claude.ai/install.sh | bash
```

装完后**关掉终端重新打开**，输入 `claude` 回车，按提示登录 Anthropic 账号。登录一次以后不用再登。

## 5. 下载工具并安装

```
cd ~
git clone https://github.com/AndyJ-2026/meeting-cli.git
cd meeting-cli && ./setup.sh
```

第三行会自动编译和安装依赖。首次运行时语音模型会自动下载（约 2.8GB），需要等几分钟。

看到"安装完成"就装好了。

## 6. 首次授权

```
cd ~/meeting-cli
./meeting.sh start
```

会弹两个权限请求：
- **屏幕录制权限** — 点"允许"（录电脑声音用）
- **麦克风权限** — 点"允许"（录你说话用）

授权后可能需要重启终端再跑一次。看到"会议录音+转写 已开始"说明一切正常。

按 `Ctrl + C` 停掉即可，安装完成。

---

## 更新到最新版本

```
cd ~/meeting-cli
git pull && ./setup.sh
```

## 遇到问题

- 安装报错 → 截图发给 Jake
- 大部分是网络问题，重跑 `./setup.sh` 就好
- 权限点了拒绝 → 去「系统设置 → 隐私与安全性 → 屏幕录制/麦克风」手动打开
