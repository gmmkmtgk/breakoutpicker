export const COURSE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'india', label: 'Indian markets' },
  { id: 'fundamental', label: 'Fundamental analysis' },
  { id: 'technical', label: 'Technical analysis' },
  { id: 'options', label: 'Options & F&O' },
  { id: 'algo', label: 'Algo & quant' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'personal', label: 'Personal finance' }
];

const _courses = [
  {
    id: 'complete-indian-equity',
    title: 'The Complete Indian Equity Investor',
    subtitle: 'From first demat account to reading annual reports like a practitioner.',
    instructor: {
      name: 'Aditya Shenoy',
      headline: 'Ex–sell-side analyst, SEBI-registered research (illustrative)',
      bio: 'Twelve years covering Nifty sectors; now focused on teaching process over tips.',
      initial: 'A'
    },
    rating: 4.7,
    ratingsCount: 18420,
    students: 92000,
    priceINR: 3199,
    listPriceINR: 6899,
    bestseller: true,
    updated: 'Nov 2025',
    hours: 28,
    lectureCount: 214,
    level: 'Beginner',
    categories: ['india', 'fundamental'],
    language: 'English',
    highlights: [
      'Build a watchlist and earnings calendar for India Inc',
      'Walk through a real NSE company annual report section by section',
      'Valuation toolkit: multiples + sanity checks before any DCF'
    ],
    requirements: ['No prior markets experience required', 'Willingness to use free NSE/BSE public filings'],
    description:
      'A flagship-style path for serious beginners: markets structure, indices, mutual funds vs stocks, financial statements, and a capstone stock one-pager. Designed around Indian disclosures and session timings.',
    curriculum: [
      {
        title: 'Getting started in India',
        lectures: [
          { title: 'Why equities — wealth creation with inflation context', min: 14, freePreview: true },
          { title: 'Demat, trading account, and order types on NSE', min: 22 },
          { title: 'Indices: Nifty, Sensex, sectorals — what moves them', min: 18 }
        ]
      },
      {
        title: 'Financial statements',
        lectures: [
          { title: 'Balance sheet in plain language', min: 26, freePreview: true },
          { title: 'P&L vs cash flow — red flags to highlight', min: 31 },
          { title: 'Notes to accounts and related parties', min: 19 }
        ]
      },
      {
        title: 'Valuation & process',
        lectures: [
          { title: 'Peer multiples in practice', min: 24 },
          { title: 'Building a thesis document', min: 35 },
          { title: 'Capstone walkthrough', min: 41 }
        ]
      }
    ]
  },
  {
    id: 'technical-masterclass-nse',
    title: 'Technical Analysis Masterclass — NSE Edition',
    subtitle: 'Price action, volume, and risk for swing traders on Indian charts.',
    instructor: {
      name: 'Kavya Iyer',
      headline: 'Full-time swing trader & coach',
      bio: 'Specialises in liquid Nifty names and index swing structures; no “holy grail” indicators.',
      initial: 'K'
    },
    rating: 4.6,
    ratingsCount: 11200,
    students: 54000,
    priceINR: 2899,
    listPriceINR: 5999,
    bestseller: true,
    updated: 'Oct 2025',
    hours: 19,
    lectureCount: 156,
    level: 'Beginner → Intermediate',
    categories: ['india', 'technical'],
    language: 'English',
    highlights: [
      'NSE session map: open, mid-day drift, closing auction awareness',
      'Position sizing from ATR — rupee risk per trade',
      'Journal templates you can reuse weekly'
    ],
    requirements: ['Basic charting platform (any Indian broker demo is enough)'],
    description:
      'Cut through indicator overload. Learn trend structure, key levels, volume confirmation, and how to journal trades with Indian costs and STT in mind.',
    curriculum: [
      {
        title: 'Foundations',
        lectures: [
          { title: 'Candles and trends without memorising 50 patterns', min: 16, freePreview: true },
          { title: 'Support, resistance, and invalidation', min: 21 },
          { title: 'Volume — participation, not prophecy', min: 18 }
        ]
      },
      {
        title: 'Execution',
        lectures: [
          { title: 'Stops that respect structure', min: 24 },
          { title: 'Risk per trade and max loss day', min: 20, freePreview: true },
          { title: 'Putting it together — two complete swing examples', min: 38 }
        ]
      }
    ]
  },
  {
    id: 'options-india-bootcamp',
    title: 'Options Bootcamp — Calls, Puts & Spreads for NSE',
    subtitle: 'Defined-risk first; understand Greeks before you size up.',
    instructor: {
      name: 'Rahul Verma',
      headline: 'Derivatives educator',
      bio: 'Former prop desk risk; focuses on retail-safe structures and margin literacy.',
      initial: 'R'
    },
    rating: 4.5,
    ratingsCount: 9800,
    students: 41000,
    priceINR: 3699,
    listPriceINR: 7999,
    bestseller: false,
    updated: 'Sep 2025',
    hours: 22,
    lectureCount: 168,
    level: 'Intermediate',
    categories: ['india', 'options'],
    language: 'English + Hindi subtitles',
    highlights: [
      'Span margin intuition with real broker screenshots (generic)',
      'Vertical spreads and iron condors with max loss first',
      'Event week: IV expansion and crush case studies'
    ],
    requirements: ['Solid cash equity basics', 'Comfort with potential total loss on speculative trades'],
    description:
      'India-focused options curriculum: contract specs, MIS vs NRML, Greeks at a usable level, and spreads that cap downside. Not a signal service.',
    curriculum: [
      {
        title: 'Mechanics',
        lectures: [
          { title: 'Calls and puts — rights vs obligations', min: 20, freePreview: true },
          { title: 'Margins, MTM, and why shorts are dangerous', min: 28 },
          { title: 'Open interest and PCR — context, not oracle', min: 22 }
        ]
      },
      {
        title: 'Structures',
        lectures: [
          { title: 'Vertical debit spreads', min: 26 },
          { title: 'Iron condor risk boxes', min: 30, freePreview: true },
          { title: 'Position sizing for defined risk', min: 24 }
        ]
      }
    ]
  },
  {
    id: 'algo-trading-python-india',
    title: 'Algorithmic Trading with Python — India Brokerage Context',
    subtitle: 'Backtests, paper trading discipline, and realistic execution constraints.',
    instructor: {
      name: 'Meera Joshi',
      headline: 'Quant engineer',
      bio: 'Builds research tooling for small teams; teaches reproducible research habits.',
      initial: 'M'
    },
    rating: 4.8,
    ratingsCount: 6200,
    students: 28000,
    priceINR: 4299,
    listPriceINR: 9999,
    bestseller: false,
    updated: 'Aug 2025',
    hours: 31,
    lectureCount: 198,
    level: 'Advanced',
    categories: ['algo', 'india'],
    language: 'English',
    highlights: ['pandas pipelines for EOD data', 'Vectorised vs event-driven backtests', 'Risk limits and kill switches'],
    requirements: ['Python basics', 'Comfort with command line'],
    description:
      'End-to-end workflow from idea to paper deployment: data hygiene, backtesting pitfalls, and how Indian microstructure changes naive backtests.',
    curriculum: [
      {
        title: 'Stack & data',
        lectures: [
          { title: 'Environment and project layout', min: 15, freePreview: true },
          { title: 'Cleaning corporate actions checklist', min: 27 },
          { title: 'Feature ideas that are not all momentum', min: 24 }
        ]
      },
      {
        title: 'Backtest to paper',
        lectures: [
          { title: 'Costs, slippage, and survivorship', min: 32 },
          { title: 'Paper broker API patterns (generic)', min: 36, freePreview: true },
          { title: 'Monitoring and retirement rules', min: 29 }
        ]
      }
    ]
  },
  {
    id: 'financial-freedom-india',
    title: 'Financial Freedom Roadmap — India Household Edition',
    subtitle: 'SIPs, insurance hygiene, loans, and goal-based investing without jargon walls.',
    instructor: {
      name: 'Neha Kapoor',
      headline: 'CFP® professional (illustrative)',
      bio: 'Writes for families navigating dual-income goals, elders, and education inflation.',
      initial: 'N'
    },
    rating: 4.9,
    ratingsCount: 24000,
    students: 120000,
    priceINR: 1999,
    listPriceINR: 4499,
    bestseller: true,
    updated: 'Dec 2025',
    hours: 12,
    lectureCount: 88,
    level: 'Beginner',
    categories: ['personal', 'india'],
    language: 'Hinglish friendly',
    highlights: ['Emergency fund sizing in rupees', 'Direct mutual funds vs regular — cost map', 'When you still need a CA'],
    requirements: ['None — bring your real numbers privately to worksheets'],
    description:
      'Personal finance first, markets second: goals, term insurance, health cover, debt prepayment vs invest trade-offs, and a simple equity path once foundations are done.',
    curriculum: [
      {
        title: 'Foundations',
        lectures: [
          { title: 'Money map: inflows, buckets, leaks', min: 18, freePreview: true },
          { title: 'Emergency fund and liquid funds', min: 16 },
          { title: 'Term + health — what to ignore on Instagram', min: 22 }
        ]
      },
      {
        title: 'Markets entry',
        lectures: [
          { title: 'Index funds and glidepaths', min: 20 },
          { title: 'When to add direct stocks', min: 19, freePreview: true }
        ]
      }
    ]
  },
  {
    id: 'market-psychology-edge',
    title: 'Market Psychology — The Discipline Edge',
    subtitle: 'Biases, journals, and rules that survive bad streaks.',
    instructor: {
      name: 'Omar Siddiqui',
      headline: 'Performance coach for traders',
      bio: 'Combines CBT-style tools with desk experience from volatile macro years.',
      initial: 'O'
    },
    rating: 4.6,
    ratingsCount: 5100,
    students: 22000,
    priceINR: 2499,
    listPriceINR: 4999,
    bestseller: false,
    updated: 'Jul 2025',
    hours: 9,
    lectureCount: 64,
    level: 'All levels',
    categories: ['psychology', 'technical'],
    language: 'English',
    highlights: ['Pre-trade checklist printable', 'Drawdown protocol', 'Information diet for Indian news cycles'],
    requirements: ['You are already trading or investing real or paper money'],
    description:
      'Short, high-impact course on emotional regulation, rule sets, and review cadence. Pairs with any technical or fundamental track.',
    curriculum: [
      {
        title: 'Self awareness',
        lectures: [
          { title: 'Bias inventory tailored to Indian retail flows', min: 14, freePreview: true },
          { title: 'Rules vs moods', min: 18 },
          { title: 'End of day shutdown ritual', min: 12 }
        ]
      },
      {
        title: 'Process',
        lectures: [
          { title: 'Journaling that you will actually keep', min: 20, freePreview: true },
          { title: 'When to reduce size', min: 15 }
        ]
      }
    ]
  },
  {
    id: 'read-macros-for-traders',
    title: 'Macro & News for Indian Traders — Without the Noise',
    subtitle: 'RBI, crude, USDINR, and flows — what often matters for Nifty regimes.',
    instructor: {
      name: 'Sanjay Menon',
      headline: 'Macro commentator (illustrative)',
      bio: 'Simplifies linkages so intraday and swing traders know when to sit out.',
      initial: 'S'
    },
    rating: 4.4,
    ratingsCount: 4300,
    students: 19000,
    priceINR: 2299,
    listPriceINR: 5299,
    bestseller: false,
    updated: 'Nov 2025',
    hours: 11,
    lectureCount: 72,
    level: 'Intermediate',
    categories: ['india', 'technical'],
    language: 'English',
    highlights: ['Event calendar discipline', 'Bond yield intuition for equities', 'When global cues dominate opens'],
    requirements: ['Basic index awareness'],
    description:
      'Not economics degree depth — practical “what to watch” lists, interpretation guardrails, and how macro ties to your risk toggles.',
    curriculum: [
      {
        title: 'India linkages',
        lectures: [
          { title: 'RBI policy day playbook', min: 19, freePreview: true },
          { title: 'Crude and the fiscal imagination', min: 17 },
          { title: 'FII/DII flows — signal vs noise', min: 21 }
        ]
      }
    ]
  },
  {
    id: 'bank-nifty-intraday-system',
    title: 'Bank Nifty Intraday — Structure, Levels, and Risk',
    subtitle: 'Volatile index behaviour: preparation, not prediction.',
    instructor: {
      name: 'Kavya Iyer',
      headline: 'Full-time swing trader & coach',
      bio: 'Same instructor as technical masterclass — specialised session on index intraday.',
      initial: 'K'
    },
    rating: 4.3,
    ratingsCount: 8900,
    students: 36000,
    priceINR: 2599,
    listPriceINR: 5999,
    bestseller: false,
    updated: 'Oct 2025',
    hours: 14,
    lectureCount: 98,
    level: 'Advanced',
    categories: ['india', 'technical'],
    language: 'English',
    highlights: ['Opening range variants', 'When not to trade gaps', 'Hard daily loss limits'],
    requirements: ['Prior technical course or equivalent experience strongly recommended'],
    description:
      'High-risk category honestly framed: liquidity windows, gap logic, and strict risk. Includes warnings on overtrading and leverage.',
    curriculum: [
      {
        title: 'Context',
        lectures: [
          { title: 'Why Bank Nifty moves differently', min: 16, freePreview: true },
          { title: 'Pre-market routine', min: 14 }
        ]
      },
      {
        title: 'Tactics',
        lectures: [
          { title: 'Opening drive vs fade — decision tree', min: 24 },
          { title: 'Time-based exits', min: 18, freePreview: true }
        ]
      }
    ]
  },
  {
    id: 'quant-factor-india',
    title: 'Factor Investing Lab — India Universe',
    subtitle: 'Momentum, value, and quality on Nifty-heavy universes — research hygiene first.',
    instructor: {
      name: 'Meera Joshi',
      headline: 'Quant engineer',
      bio: 'Second course: factor intuition without black-box vendor dependence.',
      initial: 'M'
    },
    rating: 4.7,
    ratingsCount: 3100,
    students: 14000,
    priceINR: 3999,
    listPriceINR: 8999,
    bestseller: false,
    updated: 'May 2025',
    hours: 18,
    lectureCount: 112,
    level: 'Advanced',
    categories: ['algo', 'fundamental', 'india'],
    language: 'English',
    highlights: ['Survivorship and look-ahead traps', 'Sector neutralisation ideas', 'Simple portfolio constraints'],
    requirements: ['Excel or Python basics'],
    description:
      'Translate academic factor ideas into practical India screens — with humility about data quality and turnover costs.',
    curriculum: [
      {
        title: 'Factors',
        lectures: [
          { title: 'What is a factor?', min: 14, freePreview: true },
          { title: 'Building a momentum rank (concept)', min: 26 },
          { title: 'Combining factors without overfitting', min: 30 }
        ]
      }
    ]
  },
  {
    id: 'kids-money-markets',
    title: 'Money & Markets for Young Learners (Parent-Led)',
    subtitle: 'Age-appropriate concepts and activities — parents watch alongside.',
    instructor: {
      name: 'Priya Nambiar',
      headline: 'Educator',
      bio: 'Designs family finance workshops for schools in metro cities.',
      initial: 'P'
    },
    rating: 4.8,
    ratingsCount: 2100,
    students: 8000,
    priceINR: 999,
    listPriceINR: 2499,
    bestseller: false,
    updated: 'Jan 2025',
    hours: 5,
    lectureCount: 36,
    level: 'Beginner',
    categories: ['personal'],
    language: 'English',
    highlights: ['Paper portfolio games', 'Needs vs wants', 'Safety: scams and OTPs'],
    requirements: ['Parent or guardian alongside for all sessions'],
    description:
      'Not child accounts or real trading — conceptual introduction to saving, simple businesses, and how markets connect to the real world.',
    curriculum: [
      {
        title: 'Basics',
        lectures: [
          { title: 'What is money?', min: 10, freePreview: true },
          { title: 'What is a company share — story form', min: 12 },
          { title: 'Practice: track three brands on paper', min: 15 }
        ]
      }
    ]
  },
  {
    id: 'm-and-a-special-situations',
    title: 'Special Situations in India — M&A, Spin-offs, Demergers',
    subtitle: 'Read corporate actions and filings when the balance sheet rearranges.',
    instructor: {
      name: 'Aditya Shenoy',
      headline: 'Ex–sell-side analyst',
      bio: 'Advanced follow-up for alumni of the equity investor course.',
      initial: 'A'
    },
    rating: 4.5,
    ratingsCount: 1800,
    students: 9000,
    priceINR: 3499,
    listPriceINR: 7499,
    bestseller: false,
    updated: 'Feb 2025',
    hours: 10,
    lectureCount: 58,
    level: 'Advanced',
    categories: ['fundamental', 'india'],
    language: 'English',
    highlights: ['Scheme documents walkthrough', 'Arbitrage vs thesis plays', 'Tax is overview-only'],
    requirements: ['Comfort with annual reports and basic valuation'],
    description:
      'For serious fundamental readers: demergers, open offers, and how to track timelines on NSE announcements with a checklist mindset.',
    curriculum: [
      {
        title: 'Toolkit',
        lectures: [
          { title: 'Corporate action types in India', min: 20, freePreview: true },
          { title: 'Reading a scheme of arrangement', min: 28 },
          { title: 'Position sizing for event paths', min: 22 }
        ]
      }
    ]
  }
];

export const STOCK_MARKET_COURSES = _courses;

export function getCourseById(id) {
  return STOCK_MARKET_COURSES.find((c) => c.id === id) || null;
}

export function totalCurriculumMinutes(course) {
  if (!course?.curriculum) return 0;
  return course.curriculum.reduce(
    (acc, sec) => acc + sec.lectures.reduce((a, l) => a + (l.min || 0), 0),
    0
  );
}
