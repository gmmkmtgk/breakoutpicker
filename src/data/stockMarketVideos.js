export const VIDEO_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'news', label: 'Market news' },
  { id: 'fundamental', label: 'Fundamental' },
  { id: 'technical', label: 'Technical' },
  { id: 'ipo', label: 'IPO' },
  { id: 'fno', label: 'F&O' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'beginner', label: 'Beginner' }
];

function dur(m, s) {
  return m * 60 + s;
}

/** Curated demo catalog — not real uploads. */
export const STOCK_MARKET_VIDEOS = [
  {
    id: 'v-nifty-weekly',
    title: 'Nifty weekly close: what changed for option writers?',
    description: 'Levels, OI shifts, and risk into next week. Educational commentary only — not a recommendation.',
    durationSec: dur(18, 42),
    views: 482000,
    uploadedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    category: 'fno',
    thumb: ['#1e3a5f', '#0f766e'],
    channel: { key: 'levels-live', name: 'Levels Live', handle: '@levelslive', subsText: '1.2M subscribers', initial: 'L' }
  },
  {
    id: 'v-rbi-explained',
    title: 'RBI policy in 12 minutes — what retail should watch',
    description: 'Repo, stance, and why bond yields moved. Macro context for equity investors in India.',
    durationSec: dur(12, 8),
    views: 890000,
    uploadedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    category: 'news',
    thumb: ['#4c1d95', '#7c3aed'],
    channel: { key: 'macro-101', name: 'Macro 101 India', handle: '@macro101in', subsText: '640K subscribers', initial: 'M' }
  },
  {
    id: 'v-annual-report',
    title: 'How I read an annual report in one sitting (banks)',
    description: 'Walkthrough of key schedules and red flags. Pause and practice with any NSE bank PDF.',
    durationSec: dur(34, 15),
    views: 210000,
    uploadedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    category: 'fundamental',
    thumb: ['#14532d', '#166534'],
    channel: { key: 'value-canteen', name: 'Value Canteen', handle: '@valuecanteen', subsText: '88K subscribers', initial: 'V' }
  },
  {
    id: 'v-candlestick-one',
    title: 'Candlestick patterns that actually matter on NSE charts',
    description: 'Context over memorisation — trends, ranges, and invalidation.',
    durationSec: dur(22, 3),
    views: 156000,
    uploadedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    category: 'technical',
    thumb: ['#9a3412', '#c2410c'],
    channel: { key: 'chart-ninja', name: 'Chart Ninja', handle: '@chartninja', subsText: '402K subscribers', initial: 'C' }
  },
  {
    id: 'v-ipo-rhp',
    title: 'IPO RHP: where to find risk factors fast',
    description: 'Page order, use of proceeds, and promoter pledges — a practical skim method.',
    durationSec: dur(16, 55),
    views: 95000,
    uploadedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    category: 'ipo',
    thumb: ['#831843', '#be185d'],
    channel: { key: 'ipo-arjun', name: 'IPO with Arjun', handle: '@ipoarjun', subsText: '52K subscribers', initial: 'A' }
  },
  {
    id: 'v-mtf-margin',
    title: 'MTF margin rules — what changed for small traders?',
    description: 'High-level explainer; confirm with your broker’s circulars before sizing positions.',
    durationSec: dur(9, 40),
    views: 1200000,
    uploadedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    category: 'news',
    thumb: ['#1c1917', '#44403c'],
    channel: { key: 'trade-law', name: 'Trade Law Desk', handle: '@tradelawdesk', subsText: '310K subscribers', initial: 'T' }
  },
  {
    id: 'v-emotions',
    title: 'Why revenge trading happens after a green day',
    description: 'Behavioural traps and a simple pre-market checklist.',
    durationSec: dur(11, 22),
    views: 67000,
    uploadedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    category: 'psychology',
    thumb: ['#312e81', '#4338ca'],
    channel: { key: 'calm-capital', name: 'Calm Capital', handle: '@calmcapital', subsText: '24K subscribers', initial: 'C' }
  },
  {
    id: 'v-first-trade',
    title: 'Your first trade on NSE — order types explained',
    description: 'MARKET, LIMIT, SL, SL-M with toy examples. Paper trade first.',
    durationSec: dur(14, 0),
    views: 340000,
    uploadedAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    category: 'beginner',
    thumb: ['#0c4a6e', '#0369a1'],
    channel: { key: 'first-trade', name: 'First Trade India', handle: '@firsttradein', subsText: '2.1M subscribers', initial: 'F' }
  },
  {
    id: 'v-bank-nifty',
    title: 'Bank Nifty: gap rules I use on expiry week',
    description: 'Process sharing only — high risk segment; not advice.',
    durationSec: dur(19, 48),
    views: 223000,
    uploadedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    category: 'fno',
    thumb: ['#713f12', '#a16207'],
    channel: { key: 'levels-live', name: 'Levels Live', handle: '@levelslive', subsText: '1.2M subscribers', initial: 'L' }
  },
  {
    id: 'v-sip-myths',
    title: 'SIP myths busted with real numbers',
    description: 'Rupee cost averaging limits, direct plans, and when lump sum can be fine.',
    durationSec: dur(21, 11),
    views: 445000,
    uploadedAt: new Date(Date.now() - 11 * 86400000).toISOString(),
    category: 'beginner',
    thumb: ['#14532d', '#15803d'],
    channel: { key: 'money-map', name: 'Money Map India', handle: '@moneymapin', subsText: '980K subscribers', initial: 'M' }
  },
  {
    id: 'v-results-reaction',
    title: 'Earnings reaction trading — what usually fails',
    description: 'IV crush, gaps, and why “buy the beat” is not a system.',
    durationSec: dur(15, 33),
    views: 178000,
    uploadedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    category: 'technical',
    thumb: ['#7f1d1d', '#b91c1c'],
    channel: { key: 'chart-ninja', name: 'Chart Ninja', handle: '@chartninja', subsText: '402K subscribers', initial: 'C' }
  },
  {
    id: 'v-vix',
    title: 'India VIX: how I use it as a risk dial (not a predictor)',
    description: 'Regimes, position sizing, and when to sit out.',
    durationSec: dur(13, 6),
    views: 99000,
    uploadedAt: new Date(Date.now() - 17 * 86400000).toISOString(),
    category: 'technical',
    thumb: ['#134e4a', '#0d9488'],
    channel: { key: 'levels-live', name: 'Levels Live', handle: '@levelslive', subsText: '1.2M subscribers', initial: 'L' }
  },
  {
    id: 'v-mf-expense',
    title: 'Expense ratio math that shocked my family group',
    description: 'Direct vs regular, TER, and long-term drag in rupees.',
    durationSec: dur(10, 58),
    views: 512000,
    uploadedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    category: 'beginner',
    thumb: ['#1e293b', '#334155'],
    channel: { key: 'money-map', name: 'Money Map India', handle: '@moneymapin', subsText: '980K subscribers', initial: 'M' }
  },
  {
    id: 'v-fii-flows',
    title: 'FII / DII flows — signal or noise this month?',
    description: 'How flows print, lag issues, and pairing with price structure.',
    durationSec: dur(17, 29),
    views: 267000,
    uploadedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    category: 'news',
    thumb: ['#422006', '#92400e'],
    channel: { key: 'macro-101', name: 'Macro 101 India', handle: '@macro101in', subsText: '640K subscribers', initial: 'M' }
  },
  {
    id: 'v-pledge',
    title: 'Promoter pledge in annual reports — quick scan',
    description: 'Where it hides and what follow-up questions to ask.',
    durationSec: dur(8, 44),
    views: 61000,
    uploadedAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    category: 'fundamental',
    thumb: ['#3f3f46', '#52525b'],
    channel: { key: 'value-canteen', name: 'Value Canteen', handle: '@valuecanteen', subsText: '88K subscribers', initial: 'V' }
  },
  {
    id: 'v-straddle',
    title: 'Straddle vs strangle — one whiteboard session',
    description: 'Defined risk examples on a whiteboard; India contract context.',
    durationSec: dur(26, 2),
    views: 134000,
    uploadedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    category: 'fno',
    thumb: ['#4c0519', '#9f1239'],
    channel: { key: 'deriv-deep', name: 'Derivatives Deep Dive', handle: '@derivdeep', subsText: '41K subscribers', initial: 'D' }
  },
  {
    id: 'v-journal',
    title: 'My trading journal template (free Notion clone in sheets)',
    description: 'Columns that matter for review, not vanity metrics.',
    durationSec: dur(12, 50),
    views: 88000,
    uploadedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    category: 'psychology',
    thumb: ['#1e1b4b', '#3730a3'],
    channel: { key: 'calm-capital', name: 'Calm Capital', handle: '@calmcapital', subsText: '24K subscribers', initial: 'C' }
  },
  {
    id: 'v-screeners',
    title: 'Stock screeners: the filters I start with on Screener.in',
    description: 'Workflow, not stock picks — duplicate in your own process.',
    durationSec: dur(20, 17),
    views: 199000,
    uploadedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    category: 'fundamental',
    thumb: ['#064e3b', '#047857'],
    channel: { key: 'value-canteen', name: 'Value Canteen', handle: '@valuecanteen', subsText: '88K subscribers', initial: 'V' }
  }
];

export function formatDuration(sec) {
  const s = Math.max(0, Math.floor(Number(sec) || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export function formatViews(n) {
  if (n >= 1e7) return `${(n / 1e7).toFixed(1)}Cr views`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(1)}L views`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K views`;
  return `${n} views`;
}

export function getVideoById(id) {
  return STOCK_MARKET_VIDEOS.find((v) => v.id === id) || null;
}

export function getSuggested(videoId, limit = 8) {
  const v = getVideoById(videoId);
  if (!v) return STOCK_MARKET_VIDEOS.slice(0, limit);
  const same = STOCK_MARKET_VIDEOS.filter((x) => x.id !== videoId && x.category === v.category);
  const rest = STOCK_MARKET_VIDEOS.filter((x) => x.id !== videoId && x.category !== v.category);
  return [...same, ...rest].slice(0, limit);
}
