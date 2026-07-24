/**
 * Curated self-study roadmaps (Indian market context where relevant).
 * Not financial advice — educational sequencing only.
 */

export const LEARNING_ROADMAPS = [
  {
    id: 'fundamentals',
    title: 'Fundamental analysis',
    blurb: 'Read businesses like an owner: financial statements, quality, and valuation for long-term equity investing.',
    level: 'Beginner → Intermediate',
    pace: '12–18 weeks part-time',
    phases: [
      {
        title: 'Accounting & statements',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Balance sheet, P&L, cash flow', detail: 'How the three statements link; operating vs investing vs financing cash flows.' },
          { topic: 'Key ratios', detail: 'ROE, ROCE, debt/equity, interest coverage, margins, asset turns — what “good” looks like by sector.' },
          { topic: 'Annual reports in India', detail: 'BSE/NSE filings, MD&A, notes to accounts, related-party transactions, auditor remarks.' }
        ]
      },
      {
        title: 'Business & industry',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Porter-style industry view', detail: 'Entry barriers, pricing power, regulation, and cyclicality in Indian sectors.' },
          { topic: 'Moats & management', detail: 'Capital allocation, promoter/FII mix, governance red flags, conference calls.' },
          { topic: 'Comparable companies', detail: 'Peer multiples, segment reporting, and normalised earnings through a cycle.' }
        ]
      },
      {
        title: 'Valuation',
        weeks: '4–6 weeks',
        items: [
          { topic: 'Multiples', detail: 'P/E, P/B, EV/EBITDA — when each fits; banks vs IT vs commodities.' },
          { topic: 'DCF building blocks', detail: 'FCFF vs FCFE, WACC intuition, terminal value sensitivity (India risk-free + ERP).' },
          { topic: 'Scenarios & margin of safety', detail: 'Bear/base/bull cases; position sizing from conviction, not noise.' }
        ]
      },
      {
        title: 'Practice',
        weeks: '2–4 weeks',
        items: [
          { topic: 'Build a one-pager', detail: 'Thesis, risks, catalysts, and kill-conditions for one Nifty 500 name.' },
          { topic: 'Earnings season drill', detail: 'Track 2–3 results quarters; compare guidance vs delivery on your spreadsheet.' }
        ]
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical analysis',
    blurb: 'Price, volume, and structure: read charts for context, risk, and timing — without confusing lines with prophecy.',
    level: 'Beginner → Intermediate',
    pace: '10–14 weeks part-time',
    phases: [
      {
        title: 'Chart literacy',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Candlesticks & trends', detail: 'Swing highs/lows, support/resistance, gaps; NSE session quirks (open drive, closing auction).' },
          { topic: 'Volume', detail: 'Participation vs manipulation myths; volume at turning points; index vs stock liquidity.' },
          { topic: 'Timeframes', detail: 'Position vs swing vs intraday; aligning higher-timeframe bias with lower-timeframe execution.' }
        ]
      },
      {
        title: 'Indicators & systems',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Moving averages & RSI', detail: 'Trend filters vs mean reversion; overbought ≠ sell in a strong trend.' },
          { topic: 'Volatility', detail: 'ATR for stops; India VIX as a regime dial, not a timing crystal ball.' },
          { topic: 'Backtest hygiene', detail: 'Survivorship bias, costs, slippage, and why simple rules often beat ornate ones.' }
        ]
      },
      {
        title: 'Risk & execution',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Risk per trade', detail: 'Stop placement that respects structure; position size from ruin risk, not greed.' },
          { topic: 'Journal & review', detail: 'Screenshots + reason code; weekly stats on R-multiples and discipline breaches.' },
          { topic: 'Paper → small size', detail: 'Prove process with real emotions before scaling — especially in derivatives.' }
        ]
      }
    ]
  },
  {
    id: 'quant',
    title: 'Quantitative finance',
    blurb: 'Models, data, and statistics for markets — from spreadsheets to research-grade workflows.',
    level: 'Intermediate (comfort with math)',
    pace: '16–24 weeks part-time',
    phases: [
      {
        title: 'Math & stats core',
        weeks: '4–6 weeks',
        items: [
          { topic: 'Probability & distributions', detail: 'Returns are not Gaussian; fat tails, skew, and why VaR lies sometimes.' },
          { topic: 'Regression & significance', detail: 'Overfitting, multiple testing, train/validate/holdout for factor ideas.' },
          { topic: 'Time series basics', detail: 'Stationarity, autocorrelation, simple ARMA intuition for return series.' }
        ]
      },
      {
        title: 'Data & Python',
        weeks: '4–6 weeks',
        items: [
          { topic: 'Python stack', detail: 'pandas, numpy, matplotlib/plotly; clean EOD data ingestion (vendor or exchange files).' },
          { topic: 'Feature engineering', detail: 'Momentum, value, quality factors; sector neutralisation in India universes.' },
          { topic: 'Reproducibility', detail: 'Notebooks → scripts; version control; documented assumptions for every backtest.' }
        ]
      },
      {
        title: 'Portfolio & risk',
        weeks: '4–6 weeks',
        items: [
          { topic: 'Optimisation cautions', detail: 'Markowitz corner solutions; constraints; turnover and tax frictions in India.' },
          { topic: 'Risk models', detail: 'Covariance shrinkage, factor exposures, stress scenarios (FX, oil, rates).' },
          { topic: 'Paper to production', detail: 'Slippage models, capacity, and when live PnL diverges from backtest.' }
        ]
      }
    ]
  },
  {
    id: 'algo',
    title: 'Algorithmic trading',
    blurb: 'From rule codification to live execution: discipline, infrastructure, and regulatory awareness.',
    level: 'Intermediate → Advanced',
    pace: '14–22 weeks (after coding basics)',
    phases: [
      {
        title: 'Foundations',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Strategy anatomy', detail: 'Signal → risk → execution → monitoring; idempotency and clock sync.' },
          { topic: 'APIs & paper trading', detail: 'Broker APIs (where available), rate limits, order types, partial fills, MIS vs NRML.' },
          { topic: 'Regulatory framing (India)', detail: 'SEBI norms for algos, co-location at institutions vs retail reality; no tax advice.' }
        ]
      },
      {
        title: 'Build',
        weeks: '5–8 weeks',
        items: [
          { topic: 'Backtest engine', detail: 'Event-driven vs vectorised; realistic costs; corporate actions handling checklist.' },
          { topic: 'Risk controls', detail: 'Max loss per day, kill switch, max orders per minute, fat-finger checks.' },
          { topic: 'Logging & alerts', detail: 'Structured logs, Telegram/email on anomalies, post-trade reconciliation.' }
        ]
      },
      {
        title: 'Go-live checklist',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Shadow mode', detail: 'Live quotes with paper orders; compare intended vs broker acknowledgements.' },
          { topic: 'Capital ladder', detail: 'Start tiny; scale only when slippage and downtime are inside tolerance for weeks.' },
          { topic: 'Retirement criteria', detail: 'When to turn a strategy off — decay, regime change, or correlation crowding.' }
        ]
      }
    ]
  },
  {
    id: 'women',
    title: 'Stock market for women',
    blurb: 'A practical path to independence: demystify markets, build confidence, and design money rules that fit your life — same rigour, zero patronising fluff.',
    level: 'Beginner-friendly',
    pace: '10–14 weeks part-time',
    phases: [
      {
        title: 'Money map & safety',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Goals & emergency fund', detail: 'Liquidity first; align market money to time horizon you will not need for years.' },
          { topic: 'Accounts & nominees', detail: 'Demat/bank nominee, joint holdings, and why clarity beats “I will sort it later”.' },
          { topic: 'Fraud & social noise', detail: 'Telegram tipsters, “guaranteed” returns, and how to verify SEBI-registered intermediaries.' }
        ]
      },
      {
        title: 'India market basics',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Indices & mutual funds', detail: 'Nifty/Sensex; index funds vs active; direct plans; expense ratio math in rupees.' },
          { topic: 'Stocks vs F&O', detail: 'Why derivatives are optional, not a graduation badge; leverage burns fast.' },
          { topic: 'Tax outline (high level)', detail: 'LTCG/STCG concepts — confirm with a CA for your situation; keep trade logs.' }
        ]
      },
      {
        title: 'Grow skills deliberately',
        weeks: '4–6 weeks',
        items: [
          { topic: 'Pick one lane', detail: 'Long-term SIP + occasional stock thesis OR structured technical course — not all at once.' },
          { topic: 'Community & mentors', detail: 'Prefer educators who show process and risk, not lifestyle flex; block comparison traps.' },
          { topic: 'Review cadence', detail: 'Monthly net-worth and goal check; quarterly strategy review; ignore daily outrage TV.' }
        ]
      }
    ]
  },
  {
    id: 'kids',
    title: 'Stock market for kids & teens',
    blurb: 'Age-appropriate money habits and “how markets work” — for young learners with a parent/educator alongside.',
    level: 'Kids 10+ / early teens (guided)',
    pace: '8–12 weeks of short sessions',
    phases: [
      {
        title: 'Money building blocks',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Earn, save, spend', detail: 'Piggy bank → bank; delayed gratification games; needs vs wants with real examples.' },
          { topic: 'What is a company?', detail: 'Shops they know → shares as tiny ownership slices; simple dividend story.' },
          { topic: 'Paper portfolio', detail: 'Track 3–5 names on paper; discuss news without trading real money yet.' }
        ]
      },
      {
        title: 'How markets move',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Supply & demand story', detail: 'Why price changes when more people want to buy than sell — no mysticism.' },
          { topic: 'Indices simplified', detail: 'Nifty as a basket of big companies; up/down day does not mean “economy = bad”.' },
          { topic: 'Risks in plain language', detail: 'Prices can fall; scams exist; never share OTPs; adults handle real accounts.' }
        ]
      },
      {
        title: 'Ethics & curiosity',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Compound interest demo', detail: 'Spreadsheet or calculator play: small regular savings vs one-time lump sums.' },
          { topic: 'ESG hooks', detail: 'Companies they care about (clean energy, sports brands) as a gateway to reading annual pages later.' },
          { topic: 'Parent guardrails', detail: 'Joint learning sessions; cap screen time; reward curiosity over “picking winners”.' }
        ]
      }
    ]
  },
  {
    id: 'options',
    title: 'Options & F&O basics (India)',
    blurb: 'Understand calls, puts, and risk before size — structured for NSE/BSE context and common beginner mistakes.',
    level: 'After cash equities basics',
    pace: '8–12 weeks',
    phases: [
      {
        title: 'Mechanics',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Calls & puts', detail: 'Rights vs obligations; intrinsic vs time value; breakeven intuition.' },
          { topic: 'Greeks overview', detail: 'Delta/gamma/theta/vega — what changes PnL day to day; theta is not “free money”.' },
          { topic: 'Margins & MTM', detail: 'Span + exposure; why short options can blow accounts even when “OTM”.' }
        ]
      },
      {
        title: 'Structures & risk',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Defined-risk spreads', detail: 'Verticals, iron condors — why width and max loss matter more than catchy names.' },
          { topic: 'Event risk', detail: 'Results, budgets, RBI — implied volatility crush after events.' },
          { topic: 'Position sizing', detail: 'Risk as % of capital; avoid martingale-style averaging on naked shorts.' }
        ]
      },
      {
        title: 'Practice path',
        weeks: '3–4 weeks',
        items: [
          { topic: 'Paper strategies', detail: 'Track MTM daily; note emotional triggers when theta bleeds.' },
          { topic: 'One live micro-size', detail: 'Single-lot defined-risk only until journaling proves discipline for 30+ trades.' }
        ]
      }
    ]
  },
  {
    id: 'psychology',
    title: 'Market psychology & process',
    blurb: 'The edge nobody sells: habits, biases, and systems so knowledge survives contact with real money.',
    level: 'Parallel to any track',
    pace: '6–10 weeks',
    phases: [
      {
        title: 'Know thyself',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Bias inventory', detail: 'Confirmation bias, recency, FOMO; label emotions before clicking buy/sell.' },
          { topic: 'Rules beat moods', detail: 'Written playbook: entry, exit, max loss, when you walk away for the day.' },
          { topic: 'Sleep & leverage', detail: 'Leverage amplifies mistakes; tired brains break rules — especially overnight global gaps.' }
        ]
      },
      {
        title: 'Information diet',
        weeks: '2–3 weeks',
        items: [
          { topic: 'Curate inputs', detail: 'Few quality sources vs infinite scroll; batch news instead of tick-by-tick panic.' },
          { topic: 'Ignore scoreboards', detail: 'Others’ PnL is not your benchmark; compare to your plan and last-quarter you.' }
        ]
      },
      {
        title: 'Long game',
        weeks: '2–4 weeks',
        items: [
          { topic: 'Drawdown plan', detail: 'What you do in -20% personal drawdowns — reduce size, not revenge trade.' },
          { topic: 'Teach to learn', detail: 'Explain a concept to a friend in five minutes; gaps in explanation = study gaps.' }
        ]
      }
    ]
  }
];
