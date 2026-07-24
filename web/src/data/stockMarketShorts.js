/** Demo catalog — vertical “reels” style clips (placeholders, not real media). */

function channel(key, name, handle, initial) {
  return { key, name, handle, initial };
}

export const STOCK_MARKET_SHORTS = [
  {
    id: 's-vwap-60',
    caption: 'VWAP reclaim on a 5-min chart — context first, then entry.',
    hashtags: ['intraday', 'vwap', 'nse'],
    likes: 12400,
    thumb: ['#0f172a', '#1d4ed8'],
    durationSec: 42,
    channel: channel('levels-live', 'Levels Live', '@levelslive', 'L')
  },
  {
    id: 's-sip-one-line',
    caption: 'One line: SIP is a habit, not a return guarantee.',
    hashtags: ['sip', 'beginner', 'mutualfunds'],
    likes: 89000,
    thumb: ['#14532d', '#15803d'],
    durationSec: 28,
    channel: channel('money-map', 'Money Map India', '@moneymapin', 'M')
  },
  {
    id: 's-stop-hunt',
    caption: 'Stop hunts near round numbers — why liquidity matters more than lines.',
    hashtags: ['priceaction', 'liquidity'],
    likes: 5600,
    thumb: ['#431407', '#9a3412'],
    durationSec: 35,
    channel: channel('chart-ninja', 'Chart Ninja', '@chartninja', 'C')
  },
  {
    id: 's-rbi-one',
    caption: 'RBI day: don’t trade the headline — trade the revision vs consensus.',
    hashtags: ['macro', 'rbipolicy'],
    likes: 21000,
    thumb: ['#4c1d95', '#6d28d9'],
    durationSec: 31,
    channel: channel('macro-101', 'Macro 101 India', '@macro101in', 'M')
  },
  {
    id: 's-pledge-red',
    caption: 'Red flag in RHP: promoter pledge rising QoQ. Where I look first.',
    hashtags: ['ipo', 'fundamental'],
    likes: 4300,
    thumb: ['#831843', '#be185d'],
    durationSec: 48,
    channel: channel('ipo-arjun', 'IPO with Arjun', '@ipoarjun', 'A')
  },
  {
    id: 's-revenge',
    caption: 'Revenge trading after a win streak hits different — pre-market rule of 3 checks.',
    hashtags: ['psychology', 'discipline'],
    likes: 7800,
    thumb: ['#312e81', '#4338ca'],
    channel: channel('calm-capital', 'Calm Capital', '@calmcapital', 'C')
  },
  {
    id: 's-oi-spike',
    caption: 'OI spike + flat price on BN — what it often means before expiry.',
    hashtags: ['fno', 'banknifty'],
    likes: 15200,
    thumb: ['#713f12', '#a16207'],
    channel: channel('levels-live', 'Levels Live', '@levelslive', 'L')
  },
  {
    id: 's-mtf-15',
    caption: 'MTF in 15s: leverage is rent — read circulars before sizing.',
    hashtags: ['margin', 'risk'],
    likes: 45000,
    thumb: ['#1c1917', '#44403c'],
    channel: channel('trade-law', 'Trade Law Desk', '@tradelawdesk', 'T')
  },
  {
    id: 's-candle-one',
    caption: 'One candle: engulfing only matters at structure — not mid-range.',
    hashtags: ['technical', 'candles'],
    likes: 6700,
    thumb: ['#9a3412', '#ea580c'],
    channel: channel('chart-ninja', 'Chart Ninja', '@chartninja', 'C')
  },
  {
    id: 's-first-sl',
    caption: 'SL-M vs SL-LIMIT — the gap risk nobody demos on paper.',
    hashtags: ['beginner', 'orders'],
    likes: 92000,
    thumb: ['#0c4a6e', '#0284c7'],
    channel: channel('first-trade', 'First Trade India', '@firsttradein', 'F')
  },
  {
    id: 's-expense-20',
    caption: '20-year drag: 1% TER vs 0.1% in a spreadsheet — show your family this.',
    hashtags: ['ter', 'directplan'],
    likes: 34000,
    thumb: ['#1e293b', '#475569'],
    channel: channel('money-map', 'Money Map India', '@moneymapin', 'M')
  },
  {
    id: 's-strangle-30',
    caption: 'Strangle width in one gesture: premium vs room for error.',
    hashtags: ['options', 'education'],
    likes: 5100,
    thumb: ['#4c0519', '#be123c'],
    channel: channel('deriv-deep', 'Derivatives Deep Dive', '@derivdeep', 'D')
  },
  {
    id: 's-fii-print',
    caption: 'FII print lags — pair flows with index structure, not headlines.',
    hashtags: ['flows', 'nifty'],
    likes: 11000,
    thumb: ['#422006', '#b45309'],
    channel: channel('macro-101', 'Macro 101 India', '@macro101in', 'M')
  },
  {
    id: 's-journal-3',
    caption: 'Three journal fields that beat win-rate vanity: R, setup, mistake tag.',
    hashtags: ['journal', 'process'],
    likes: 6200,
    thumb: ['#1e1b4b', '#4f46e5'],
    channel: channel('calm-capital', 'Calm Capital', '@calmcapital', 'C')
  },
  {
    id: 's-screener-2',
    caption: 'Two filters I never skip on Screener.in before deep dive.',
    hashtags: ['screener', 'workflow'],
    likes: 9800,
    thumb: ['#064e3b', '#059669'],
    channel: channel('value-canteen', 'Value Canteen', '@valuecanteen', 'V')
  },
  {
    id: 's-vix-dial',
    caption: 'India VIX as a dial: small size when noisy, normal when boring.',
    hashtags: ['vix', 'risk'],
    likes: 7400,
    thumb: ['#134e4a', '#14b8a6'],
    channel: channel('levels-live', 'Levels Live', '@levelslive', 'L')
  }
];

export function formatShortCount(n) {
  const x = Number(n) || 0;
  if (x >= 1e7) return `${(x / 1e7).toFixed(1)}Cr`;
  if (x >= 1e5) return `${(x / 1e5).toFixed(1)}L`;
  if (x >= 1e3) return `${(x / 1e3).toFixed(1)}K`;
  return String(x);
}

export function formatShortDuration(sec) {
  const s = Math.max(0, Math.floor(Number(sec) || 0));
  if (s < 60) return `0:${String(s).padStart(2, '0')}`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export function getShortById(id) {
  return STOCK_MARKET_SHORTS.find((x) => x.id === id) || null;
}
