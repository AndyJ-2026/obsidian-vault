---
title: "meeting-cli"
repo: "meeting-cli"
local_path: "/Users/jaker/meeting-cli"
github: "https://github.com/AndyJ-2026/meeting-cli"
private: false
status: running
deploy: local
---

# meeting-cli — 会议纪要工具

一键录音 + 本地转写 + AI 生成纪要，纪要自动存入 Obsidian。

## 功能

| 功能 | 说明 |
|------|------|
| 音频采集 | ScreenCaptureKit 录制系统音频 + 麦克风（Swift） |
| 自动设备检测 | `--auto` 模式检测有线/蓝牙/外放，自动选最佳录音策略 |
| 蓝牙适配 | 蓝牙耳机时强制使用内置麦克风，避免 HFP 降质 |
| 本地转写 | FunASR Paraformer-large 实时语音转文字 |
| AI 纪要 | Claude 根据转写内容生成结构化纪要 |
| Obsidian 存档 | 纪要自动保存到「会议纪要」文件夹 |

## 架构

```
meeting start（shell）
  → audio_capture（Swift，ScreenCaptureKit 采集 PCM）
  → transcribe.py（FunASR 实时转写）
  → Ctrl+C 停止
  → Claude /meeting 生成纪要
  → 存入 Obsidian 会议纪要/
```

## 技术栈

- 入口：meeting.sh（Bash）
- 音频采集：Swift（ScreenCaptureKit，16-bit PCM 16kHz）
- 转写：Python 3 + FunASR Paraformer-large（本地模型，不联网）
- 纪要生成：Claude Code /meeting skill
- 存储：Obsidian 知识库

## 代码结构

```
meeting.sh          ← 入口脚本：启停录音、触发纪要生成
audio_capture.swift ← Swift 音频采集（ScreenCaptureKit + AVAudioEngine）
audio_capture       ← 编译后的二进制
transcribe.py       ← FunASR 实时转写
setup.sh            ← 安装脚本
```

### audio_capture 模式

| 参数 | 模式 | 说明 |
|------|------|------|
| `--auto` | 自动检测 | 检测输出设备，自动选最佳策略（推荐） |
| （默认） | both | 系统音频 + 麦克风混合 |
| `--system-only` | 仅系统音频 | 不录麦克风 |
| `--mic-only` | 仅麦克风 | 不录系统音频 |

`--auto` 行为：有线耳机→both，蓝牙→both+强制内置麦克风，外放→both（有回声但不丢声音）

## 使用

```bash
meeting start    # 开始录音+转写
Ctrl+C           # 停止，自动生成纪要
```

详见 [[Meeting CLI 使用指南]] 和 [[Meeting CLI 安装指南]]

## 更新记录

- 2026-05-09: `--auto` 模式：自动检测音频设备，蓝牙时强制内置麦克风避免 HFP 降质
- 2026-05-09: 混音系数 0.7→0.85（减少响度损失），降采样质量 medium→max

## 文档

- [[Meeting CLI 使用指南]] — 使用方法
- [[Meeting CLI 安装指南]] — 安装步骤
