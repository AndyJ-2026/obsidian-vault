const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";

const RELAY_URL =
  process.env.CRYPTO_DAILY_RELAY_URL ||
  "https://black-swan-mcp.ysf63453.workers.dev/send-lark";
const RELAY_SECRET = process.env.CRYPTO_DAILY_RELAY_SECRET || "";
const LARK_WEBHOOK_URL = process.env.CRYPTO_DAILY_LARK_WEBHOOK_URL || "";
const LARK_WEBHOOK_SECRET = process.env.CRYPTO_DAILY_LARK_WEBHOOK_SECRET || "";
const DRY_RUN = process.env.CRYPTO_DAILY_DRY_RUN === "true";

const PRICE_SPECS = [
  {
    symbol: "BTC",
    label: "Bitcoin",
    cmcUrl: "https://coinmarketcap.com/currencies/bitcoin/",
    cryptoslateUrl: "https://cryptoslate.com/coins/bitcoin/",
  },
  {
    symbol: "ETH",
    label: "Ethereum",
    cmcUrl: "https://coinmarketcap.com/currencies/ethereum/",
    cryptoslateUrl: "https://cryptoslate.com/coins/ethereum/",
  },
  {
    symbol: "SOL",
    label: "Solana",
    cmcUrl: "https://coinmarketcap.com/currencies/solana/",
    cryptoslateUrl: "https://cryptoslate.com/coins/solana/",
  },
];

const RSS_URLS = [
  "https://rss.panewslab.com/zh/tvsq/rss",
  "https://rss.panewslab.com/zh/gtimg/rss",
];

const PAGE_URLS = [
  { hint: "home", url: "https://www.panewslab.com/zh" },
  { hint: "newsflash", url: "https://www.panewslab.com/zh/newsflash" },
  { hint: "industry", url: "https://www.panewslab.com/zh/industry" },
  { hint: "competition", url: "https://www.panewslab.com/zh/competition" },
  { hint: "capital", url: "https://www.panewslab.com/zh/capital" },
];

const CEX_KEYWORDS = [
  "binance",
  "okx",
  "bybit",
  "coinbase",
  "kraken",
  "bitget",
  "gate",
  "mexc",
  "robinhood",
  "falconx",
  "sbi",
  "rakuten",
  "交易所",
  "上币",
  "下架",
  "永续合约",
  "合约",
  "pre-tge",
];

const DEX_KEYWORDS = [
  "hyperliquid",
  "uniswap",
  "pancakeswap",
  "curve",
  "dydx",
  "jupiter",
  "defi",
  "dex",
  "流动性",
  "借贷",
  "质押",
  "链上交易",
  "router",
  "amm",
];

const OTHER_COMPETITION_KEYWORDS = [
  "wallet",
  "metamask",
  "opensea",
  "nft",
  "rwa",
  "支付",
  "稳定币支付",
  "agent",
  "ai",
  "figure ai",
  "钱包",
];

const CAPITAL_KEYWORDS = [
  "融资",
  "获投",
  "投资",
  "收购",
  "ipo",
  "pre-ipo",
  "上市",
  "增持",
  "减持",
  "基金",
  "回购",
  "可转债",
  "估值",
  "领投",
  "跟投",
  "种子轮",
  "a轮",
  "b轮",
  "c轮",
  "战略投资",
  "并购",
  "募资",
];

const INDUSTRY_KEYWORDS = [
  "监管",
  "宏观",
  "政策",
  "etf",
  "机构",
  "安全",
  "攻击",
  "黑客",
  "链上",
  "矿业",
  "稳定币",
  "解锁",
  "美联储",
  "鲍威尔",
  "比特币",
  "以太坊",
  "sol",
  "xrp",
  "tom lee",
  "vitalik",
];

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xml,text/plain" },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

function decodeHtml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://www.panewslab.com${url}`;
  return url;
}

function bjDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((p) => [p.type, p.value]));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    key: `${parts.year}-${parts.month}-${parts.day}`,
  };
}

function previousBjDateKey() {
  const now = new Date();
  const shifted = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return bjDateParts(shifted).key;
}

function formatBeijingTimestamp(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((p) => [p.type, p.value]));
  return `${parts.year}年${Number(parts.month)}月${Number(parts.day)}日 ${parts.hour}:${parts.minute}`;
}

function toBjDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return bjDateParts(date).key;
}

function parseRssItems(xml) {
  const matches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return matches
    .map((match) => {
      const body = match[1];
      const title = decodeHtml(body.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
      const link = decodeHtml(body.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
      const pubDate = decodeHtml(body.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
      return { title, link, pubDate };
    })
    .filter((item) => item.title && item.link);
}

function parseMarkdownLinks(markdown) {
  const results = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(regex)) {
    const title = decodeHtml(match[1]);
    const link = normalizeUrl(match[2]);
    if (!title || !link.includes("panewslab.com")) continue;
    results.push({ title, link });
  }
  return results;
}

function parseHtmlLinks(html) {
  const results = [];
  const regex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(regex)) {
    const link = normalizeUrl(decodeHtml(match[1]));
    const title = decodeHtml(stripTags(match[2]));
    if (!link.includes("panewslab.com")) continue;
    if (!title || title.length < 8 || title.length > 120) continue;
    if (title.includes("PANews") && !title.includes("日报")) continue;
    results.push({ title, link });
  }
  return results;
}

function uniqueByTitleAndLink(items) {
  const seen = new Set();
  const deduped = [];
  for (const item of items) {
    const key = `${item.title}__${item.link}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }
  return deduped;
}

function includesAny(title, keywords) {
  const lower = title.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function classifyCompetition(title) {
  if (includesAny(title, CEX_KEYWORDS)) return "cex";
  if (includesAny(title, DEX_KEYWORDS)) return "dex";
  return "other";
}

function classifyTitle(title, sourceHint) {
  if (sourceHint === "capital") return "capital";
  if (sourceHint === "competition") return "competition";
  if (sourceHint === "industry") return "industry";
  if (includesAny(title, CAPITAL_KEYWORDS)) return "capital";
  if (
    includesAny(title, CEX_KEYWORDS) ||
    includesAny(title, DEX_KEYWORDS) ||
    includesAny(title, OTHER_COMPETITION_KEYWORDS)
  ) {
    return "competition";
  }
  if (includesAny(title, INDUSTRY_KEYWORDS)) return "industry";
  return "industry";
}

function markdownLink(item) {
  return `[${item.title}](${item.link})`;
}

function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatChange(change) {
  const numeric = Number(change);
  const sign = numeric > 0 ? "+" : "";
  return `${sign}${numeric.toFixed(2)}%`;
}

function parseCoinMarketCapText(text, label) {
  const compact = text.replace(/\s+/g, " ");
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `${escapedLabel}\\s+price\\s+[A-Z]+\\s+#\\d+\\s+[\\d.]+[MK]?\\s+\\$([\\d,]+(?:\\.\\d+)?)\\s+([+-]?[\\d.]+)%\\s*\\(24h\\)`,
    "i",
  );
  const match = compact.match(regex);
  if (!match) return null;
  return {
    price: Number(match[1].replace(/,/g, "")),
    change24h: Number(match[2]),
    source: "CoinMarketCap",
    sourceUrl: "https://coinmarketcap.com/",
  };
}

function parseCryptoSlateText(html) {
  const compact = html.replace(/\s+/g, " ");
  const jsonPrice = compact.match(/"name":"Price \(USD\)","value":"?([0-9.]+)"?/i);
  const jsonChange = compact.match(/"name":"24h Change \(%\)","value":"?(-?[0-9.]+)"?/i);
  if (jsonPrice && jsonChange) {
    return {
      price: Number(jsonPrice[1]),
      change24h: Number(jsonChange[1]),
      source: "CryptoSlate",
      sourceUrl: "https://cryptoslate.com/",
    };
  }

  const meta = compact.match(/content="[^"]*price is \$([0-9,]+(?:\.[0-9]+)?)[^"]*"/i);
  if (!meta) return null;
  return {
    price: Number(meta[1].replace(/,/g, "")),
    change24h: 0,
    source: "CryptoSlate",
    sourceUrl: "https://cryptoslate.com/",
  };
}

async function fetchPrice(spec) {
  try {
    const html = await fetchText(spec.cmcUrl);
    const parsed = parseCoinMarketCapText(stripTags(html), spec.label);
    if (parsed) return parsed;
  } catch {}

  const fallback = await fetchText(spec.cryptoslateUrl);
  const parsedFallback = parseCryptoSlateText(fallback);
  if (!parsedFallback) {
    throw new Error(`Unable to parse price for ${spec.symbol}`);
  }
  return parsedFallback;
}

async function fetchPanewsItems() {
  const targetKeys = new Set([bjDateParts().key, previousBjDateKey()]);
  const rssCollections = await Promise.all(
    RSS_URLS.map(async (url) => {
      const xml = await fetchText(url);
      return parseRssItems(xml);
    }),
  );

  const rssItems = rssCollections
    .flat()
    .filter((item) => {
      const key = toBjDateKey(item.pubDate);
      return key && targetKeys.has(key);
    })
    .map((item) => ({ ...item, sourceHint: "newsflash" }));

  const pageCollections = await Promise.all(
    PAGE_URLS.map(async ({ hint, url }) => {
      try {
        const html = await fetchText(url);
        return parseHtmlLinks(html).map((item) => ({ ...item, sourceHint: hint }));
      } catch {
        return [];
      }
    }),
  );

  return uniqueByTitleAndLink([...rssItems, ...pageCollections.flat()]);
}

function splitSections(items) {
  const industry = [];
  const competition = { cex: [], dex: [], other: [] };
  const capital = [];

  for (const item of items) {
    const bucket = classifyTitle(item.title, item.sourceHint);
    if (bucket === "capital") {
      capital.push(item);
      continue;
    }
    if (bucket === "competition") {
      competition[classifyCompetition(item.title)].push(item);
      continue;
    }
    industry.push(item);
  }

  return {
    industry: uniqueByTitleAndLink(industry),
    competition: {
      cex: uniqueByTitleAndLink(competition.cex),
      dex: uniqueByTitleAndLink(competition.dex),
      other: uniqueByTitleAndLink(competition.other),
    },
    capital: uniqueByTitleAndLink(capital),
  };
}

function ensureMinimums(sections) {
  const competitionTotal =
    sections.competition.cex.length +
    sections.competition.dex.length +
    sections.competition.other.length;

  if (sections.industry.length < 15) {
    throw new Error(`Industry section has only ${sections.industry.length} items`);
  }
  if (competitionTotal < 10) {
    throw new Error(`Competition section has only ${competitionTotal} items`);
  }
  if (sections.capital.length < 8) {
    throw new Error(`Capital section has only ${sections.capital.length} items`);
  }
}

function buildReport(prices, sections) {
  const sourceName = prices[0].source;
  const sourceUrl = prices[0].sourceUrl;
  const lines = [
    "加密货币日报",
    `截止${formatBeijingTimestamp()}（北京时间）`,
  ];

  for (const [index, spec] of PRICE_SPECS.entries()) {
    const quote = prices[index];
    lines.push(`${spec.symbol}报价 ${formatPrice(quote.price)} (24小时 ${formatChange(quote.change24h)})`);
  }

  lines.push(`来自：[${sourceName}](${sourceUrl})`);
  lines.push("---");
  lines.push("");
  lines.push("一、行业资讯");
  for (const item of sections.industry.slice(0, 25)) {
    lines.push(markdownLink(item));
  }
  lines.push("来自：[PANEWS](https://www.panewslab.com/)");
  lines.push("---");
  lines.push("");
  lines.push("二、竞品动态");
  lines.push("");
  lines.push("交易所（CEX）");
  for (const item of sections.competition.cex) lines.push(markdownLink(item));
  lines.push("");
  lines.push("DEX");
  for (const item of sections.competition.dex) lines.push(markdownLink(item));
  lines.push("");
  lines.push("其他");
  for (const item of sections.competition.other) lines.push(markdownLink(item));
  lines.push("来自：[PANEWS](https://www.panewslab.com/)");
  lines.push("---");
  lines.push("");
  lines.push("三、投融资");
  for (const item of sections.capital) lines.push(markdownLink(item));
  lines.push("来自：[PANEWS](https://www.panewslab.com/)");
  return lines.join("\n");
}

async function sendReport(content) {
  if (DRY_RUN) {
    console.log(content);
    return { ok: true, dryRun: true };
  }

  if (!RELAY_SECRET || !LARK_WEBHOOK_URL || !LARK_WEBHOOK_SECRET) {
    throw new Error("Missing relay or Lark secrets");
  }

  const response = await fetch(RELAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: RELAY_SECRET,
      webhook_url: LARK_WEBHOOK_URL,
      webhook_secret: LARK_WEBHOOK_SECRET,
      header_title: "加密货币日报",
      header_color: "blue",
      content,
    }),
  });

  const body = await response.text();
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new Error(`Relay returned non-JSON response: ${body}`);
  }

  if (!response.ok || !parsed.ok) {
    throw new Error(`Relay send failed: HTTP ${response.status} ${body}`);
  }

  return parsed;
}

async function main() {
  const prices = await Promise.all(PRICE_SPECS.map(fetchPrice));
  const panewsItems = await fetchPanewsItems();
  const sections = splitSections(panewsItems);
  ensureMinimums(sections);

  const content = buildReport(prices, sections);
  const result = await sendReport(content);
  const summary = DRY_RUN
    ? "Dry run completed"
    : `Relay send succeeded with status ${result.status}`;

  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const fs = await import("node:fs/promises");
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
  }
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
