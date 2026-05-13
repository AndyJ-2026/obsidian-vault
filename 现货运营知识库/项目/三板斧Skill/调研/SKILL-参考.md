---
name: sanbanfu
version: 1.2.0
description: "制作三板斧决策表格并发布到飞书文档。当用户说"做三板斧"、"发起三板斧"、"写三板斧"、"填三板斧"时触发。通过嵌入 spreadsheet 模板方式插入三板斧，支持自动分析利弊或填写已有框架的利弊列。"
---

# 三板斧 Skill

> **前置条件**：执行前先用 Read 工具读取 [`../lark-shared/SKILL.md`](../lark-shared/SKILL.md)（认证与权限处理）。

## 什么是三板斧

三板斧是 MEXC 内部用于**结构化决策**的工具，通过列出多个选项并分析利弊来达成共识。每张三板斧表格对应一个具体的决策命题。

---

## 标准表格格式

**来源**：HqQWscq4WhmyLPtezsGuIE0MsYc（sheet HVpAUK），实际尺寸 **9行 × 5列**。

表格分两个区域：

**区域一：信息头部（行1-4）**

| A列（标签） | B列（内容） | 合并说明 |
|------------|------------|---------|
| 命题 | [命题内容] | B-C合并，D=参与成员，E=成员名单 |
| 背景介绍 | [背景描述] | B-D合并 |
| 期望结果 | [期望达成目标] | B-C合并 |
| 完成时间 | [日期] | 无合并 |

**区域二：选项区域（行5-9）**

| A列 | B列 | C列 | D列 | E列 |
|-----|-----|-----|-----|-----|
| 序号/提议人 | 建议/选项 | 利 | 弊 | 投票人 |
| 1 | [选项1] | [利1] | [弊1] | （留空） |
| 2 | [选项2] | [利2] | [弊2] | （留空） |
| 3 | [选项3] | [利3] | [弊3] | （留空） |
| 4 | 其他方案 | | | |

**核心方案描述列（复杂情况专用）**：当选项名称无法自解释时，在B列（选项）和C列（利）之间额外插入一列描述机制细节。仅在选项名本身不足以说清"怎么做"时使用，如"类FTX方案"需要补充"用户充值后平台自动转为MUSD，覆盖现货+理财+合约+活动全场景"。选项名已清晰时（如"5月15日上线"）不加。

---

## 内容写作规范

### 1. 核心方案描述列（仅复杂情况）

当选项名称无法自解释时，在方案列和利列之间插入一列补充说明机制细节。

**加列条件**（两者同时满足）：
- 选项名本身不足以说清楚"怎么做"（如"类FTX方案"）
- 描述内容超出选项名能承载的范围

**不加列**：选项名已清晰（如"5月15日上线"）、描述只是换个说法重复选项名。

> 真实案例：MEXC稳定币方案优先级矩阵中，"类FTX方案（全场景自动兑换）"配了描述列："用户充值后平台自动转为MUSD，覆盖现货+理财+合约+活动全场景"

### 2. 利弊写作格式

每条利/弊固定格式：**`①关键词：`**（加粗）+ 一句话解释（结尾加 `；`）

```
①趁热打铁：CNBC报道（5/9）+OKX新合约（5/6）热度仍在，FOMO情绪未散；
②避免落后：抢先Gate/BG的下一轮Pre-IPO Launchpad
```

### 3. 条数控制

每个方案利和弊各写 **2～3 条**，严格筛选：

- **删掉影响力弱的条目**：选项本身的固有特征不是弊（如"认购窗口仅3天"）
- **删掉不可改变的条目**：已决策项不构成该方案的弊（如"定价650U用户获利空间有限"）
- **宁少勿多**：2条真正重要的 > 5条稀释权重的

### 4. 业务语言，不堆技术数据

- ❌ `OI仅591万U，成交额/OI=4.77x，资金费率0%`
- ✅ `价格不占大优势：650U认购价接近目前Gate现货价，破发风险仍存`

数据放背景/分析文档，三板斧只写业务结论。

### 5. 准确性：不确定结果加"可能"

- ❌ `错过当前热度窗口`
- ✅ `有可能错过当前IPO消息热度窗口`

### 6. 利弊要评估真实影响量级

问自己：**"这条弊，真的会改变决策吗？"**

- 影响执行资源调配 → 值得写
- 影响用户体验或转化率 → 值得写
- 只是理论上的小风险 → 删掉

---

## 执行步骤

### Step 1：收集信息

询问用户以下内容（**利弊由 AI 负责分析，不需要用户提供**）：

1. **命题**：这次三板斧要决定什么？
2. **背景介绍**：为什么提这个命题？
3. **期望结果**：希望达成什么目标？
4. **完成时间**：何时需要决策？
5. **参与成员**：谁参与投票？（第一个默认为第一责任人）
6. **选项**：列出 3～5 个备选方案（描述即可，不需要利弊）
7. **目标文档**（可选）：是否插入到已有飞书文档？

若用户只说"做三板斧"但未提供内容：
> 请告诉我这次三板斧的**命题**是什么？同时提供背景、期望结果、完成时间和参与成员，我来帮你建表。

### Step 2：嵌入三板斧 sheet

**不要**用 `sheets +create`——默认 200×20，嵌入后大量空白行列。
**不要**用原生 `<table>`——不支持合并单元格。
**正确做法**：嵌入已有格式正确的模板 sheet，Feishu 会完整复制尺寸和合并格式。

**Step 2a：嵌入模板**

```bash
# append 到文档末尾（默认）
lark-cli docs +update --api-version v2 --doc "[doc_token]" \
  --command append \
  --content '<sheet token="HqQWscq4WhmyLPtezsGuIE0MsYc" sheet-id="HVpAUK"></sheet>'

# 或插入到指定 block 之后
lark-cli docs +update --api-version v2 --doc "[doc_token]" \
  --command block_insert_after \
  --block-id "[target_block_id]" \
  --content '<sheet token="HqQWscq4WhmyLPtezsGuIE0MsYc" sheet-id="HVpAUK"></sheet>'
```

返回值 `block_token` 格式：`[spreadsheet_token]_[new_sheet_id]`
- spreadsheet_token = 下划线前部分
- new_sheet_id = 下划线后部分

**Step 2b：验证格式**

```bash
lark-cli sheets +info --url "https://l7jipx1bfq.larksuite.com/sheets/[spreadsheet_token]" 2>/dev/null
# 确认：row_count=9, column_count=5, merges 含 B1:C1 / B2:D2 / B3:C3
```

**Step 2c：写入内容**

```bash
lark-cli sheets +write --url "https://l7jipx1bfq.larksuite.com/sheets/[spreadsheet_token]" \
  --sheet-id "[new_sheet_id]" \
  --range "A1:E9" \
  --values '[
    ["命题", "[命题内容]", null, "参与成员", "[成员名单]"],
    ["背景介绍", "[背景内容]", null, null, null],
    ["期望结果", "[期望结果内容]", null, null, null],
    ["完成时间", "[完成时间]", null, null, null],
    ["序号/提议人", "建议/选项", "利", "弊", "投票人"],
    [1, "[选项1]", "[利1]", "[弊1]", ""],
    [2, "[选项2]", "[利2]", "[弊2]", ""],
    [3, "[选项3]", "[利3]", "[弊3]", ""],
    [4, "其他方案", null, null, null]
  ]'
```

> 合并区域只需写左上角单元格，其他格填 `null`。

### Step 3：发送链接

```bash
lark-cli im +messages-send --as bot \
  --user-id "ou_72c0159d2f597e67970b6707c70998e2" \
  --text "三板斧已完成 ✅\n文档链接：[URL]"
```

---

## ⚠️ 已知坑点

### 1. 格式以真实案例为准，不是官方模板
官方模板（FLG7swP2mhVAAJtJvuyu3Wq6sXe ecfb5a）合并方式是 B1:E1，与实际使用不符。
真实案例（HVpAUK）：参与成员在 D1/E1，Row5 表头是 `序号/提议人 | 建议/选项`，合并是 B1:C1 / B2:D2 / B3:C3。

### 2. block_move_after 的 --src-block-ids 有 bug
CLI v1.1.23 中 `block_move_after` 命令的 `--src-block-ids` 参数服务端收到时为空。
**绕过方式**：先 `block_delete` 删掉错误位置的块，再 `block_insert_after` 在正确位置重新插入。

### 3. 嵌入 sheet 后 token 会变
`docs +update --command append` 成功后，Feishu 把 sheet 复制到文档自身的 spreadsheet，block_token 变成文档自己的 token，原始模板 token 失效。要用返回的新 token 操作。

### 4. im 消息发送命令
正确命令：`lark-cli im +messages-send --user-id ... --text ...`
错误用法：`im messages create`（不存在）

### 5. 填写已有框架时先读内容再写
用户已写好选项的三板斧，要先 `sheets +read` 或读取 docx 块内容确认已有选项，不要自己另起一套方案。

---

## 参考资源

**可用模板 sheet（9行×5列，含正确合并）**：
- `token=HqQWscq4WhmyLPtezsGuIE0MsYc` / `sheet-id=HVpAUK`（主模板）
- `token=HqQWscq4WhmyLPtezsGuIE0MsYc` / `sheet-id=TrJ4C5`（备用）

**官方模板**：https://l7jipx1bfq.larksuite.com/sheets/FLG7swP2mhVAAJtJvuyu3Wq6sXe

**真实三板斧案例**：
- 明星项目和国家线协作三板斧：https://l7jipx1bfq.larksuite.com/wiki/FdiDwhOVeiaBmYkj6YpuS0rWsrg
- USD1专项组整合活动三板斧：https://l7jipx1bfq.larksuite.com/wiki/V3jEwA94Gibj50k08B9ucNdxsYg
- 现货活动精进+三板斧：https://l7jipx1bfq.larksuite.com/docx/O44mdPWO2oW1XPxyFNUugiO2szc
- **SpaceX Launchpad 上线时机三板斧**（利弊写作标杆，已人工修订）：https://l7jipx1bfq.larksuite.com/wiki/YTPXwrmQViK0jdkMmdjuQa4Osrg（spreadsheet: GctOsGHY3hDtRatEkj0u24z7spL，sheet: 3LIiyz）
- **MEXC稳定币方案优先级矩阵**（含核心方案描述列案例）：https://l7jipx1bfq.larksuite.com/docx/HBbRd4DpworAQtx6dXPuJSNZsRd（table block: doxusIxh1Fu5bl8ClQFA26p1gEd）
