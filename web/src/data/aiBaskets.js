/**
 * Illustrative AI basket definitions (Indian equities). Not investment advice.
 * Weights sum to 100. Prices are mock LTPs for UI demos.
 */

function round2(n) {
  return Math.round(n * 100) / 100;
}

/** @param {number} amountInr @param {{ weight: number, price: number }[]} constituents */
export function computeAllocations(amountInr, constituents) {
  if (!Number.isFinite(amountInr) || amountInr <= 0) {
    return constituents.map((c) => ({
      ...c,
      allocatedInr: 0,
      estUnits: 0
    }));
  }
  return constituents.map((c) => {
    const allocatedInr = round2((amountInr * c.weight) / 100);
    const estUnits = c.price > 0 ? round2(allocatedInr / c.price) : 0;
    return { ...c, allocatedInr, estUnits };
  });
}

export const AI_BASKETS = [
  {
    id: 'all-weather-india',
    title: 'All-Weather India',
    tagline: 'Large-cap quality tilt — built to ride cycles with lower drama.',
    themes: ['Quality', 'Core', 'Nifty-beater'],
    riskLabel: 'Moderate',
    riskScore: 4,
    minInvest: 15000,
    stockCount: 8,
    aiNote: 'Model blends ROE stability, earnings visibility, and drawdown history vs Nifty 50.',
    constituents: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: 14, price: 1482, sector: 'Energy' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 13, price: 1685, sector: 'Financials' },
      { symbol: 'INFY', name: 'Infosys Ltd', weight: 12, price: 1520, sector: 'IT' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 11, price: 3785, sector: 'IT' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: 11, price: 1288, sector: 'Financials' },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', weight: 10, price: 2412, sector: 'FMCG' },
      { symbol: 'ITC', name: 'ITC Ltd', weight: 15, price: 412, sector: 'FMCG' },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', weight: 14, price: 3654, sector: 'Industrials' }
    ],
    performance: {
      return1M: 1.85,
      return3M: 5.92,
      return6M: 11.4,
      return1Y: 17.6,
      returnSinceInception: 38.2,
      cagr3Y: 15.2,
      cagrSince: 13.8,
      maxDrawdown1Y: -7.1,
      volatilityAnn: 11.8,
      alphaVsNifty1Y: 3.6,
      sharpe: 1.12,
      inception: '2022-04-01',
      benchmark: 'Nifty 50 TRI'
    }
  },
  {
    id: 'contrarian-value',
    title: 'Contrarian Value',
    tagline: 'Out-of-favour names where AI sees mean-reversion + balance-sheet optionality.',
    themes: ['Contrarian', 'Value', 'Turnaround'],
    riskLabel: 'High',
    riskScore: 7,
    minInvest: 25000,
    stockCount: 6,
    aiNote: 'Screens for low P/B vs history, insider activity proxy, and catalyst calendar (earnings, divestments).',
    constituents: [
      { symbol: 'SBI', name: 'State Bank of India', weight: 22, price: 828, sector: 'Financials' },
      { symbol: 'NTPC', name: 'NTPC Ltd', weight: 18, price: 398, sector: 'Utilities' },
      { symbol: 'COALINDIA', name: 'Coal India Ltd', weight: 16, price: 486, sector: 'Materials' },
      { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', weight: 14, price: 252, sector: 'Energy' },
      { symbol: 'NMDC', name: 'NMDC Ltd', weight: 15, price: 71, sector: 'Materials' },
      { symbol: 'BHEL', name: 'Bharat Heavy Electricals', weight: 15, price: 268, sector: 'Industrials' }
    ],
    performance: {
      return1M: -0.9,
      return3M: 8.4,
      return6M: 22.1,
      return1Y: 31.2,
      returnSinceInception: 56.4,
      cagr3Y: 18.9,
      cagrSince: 17.1,
      maxDrawdown1Y: -14.2,
      volatilityAnn: 18.6,
      alphaVsNifty1Y: 8.1,
      sharpe: 0.98,
      inception: '2021-11-10',
      benchmark: 'Nifty 500 TRI'
    }
  },
  {
    id: 'digital-india-growth',
    title: 'Digital India Growth',
    tagline: 'Consumption of data, software, and payments — India’s compounding digitisation.',
    themes: ['Growth', 'Digital', 'Mid & large cap'],
    riskLabel: 'Moderate–High',
    riskScore: 6,
    minInvest: 20000,
    stockCount: 7,
    aiNote: 'Weights tilt to recurring revenue, cloud exposure, and UPI-linked payment flows.',
    constituents: [
      { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd', weight: 14, price: 5820, sector: 'IT' },
      { symbol: 'MPHASIS', name: 'Mphasis Ltd', weight: 13, price: 2556, sector: 'IT' },
      { symbol: 'ZOMATO', name: 'Zomato Ltd', weight: 12, price: 278, sector: 'Consumer' },
      { symbol: 'PAYTM', name: 'One 97 Communications', weight: 11, price: 918, sector: 'Fintech' },
      { symbol: 'POLICYBZR', name: 'PB Fintech Ltd', weight: 12, price: 1742, sector: 'Fintech' },
      { symbol: 'INDIAMART', name: 'IndiaMART InterMESH', weight: 14, price: 2688, sector: 'Internet' },
      { symbol: 'ROUTE', name: 'Route Mobile Ltd', weight: 24, price: 942, sector: 'Communications' }
    ],
    performance: {
      return1M: 3.2,
      return3M: 12.8,
      return6M: 24.6,
      return1Y: 42.5,
      returnSinceInception: 68.9,
      cagr3Y: 22.4,
      cagrSince: 20.2,
      maxDrawdown1Y: -18.5,
      volatilityAnn: 22.3,
      alphaVsNifty1Y: 12.4,
      sharpe: 1.05,
      inception: '2023-01-15',
      benchmark: 'Nifty IT TRI'
    }
  },
  {
    id: 'monsoon-agri-rural',
    title: 'Monsoon & Rural',
    tagline: 'Rainfall-sensitive and rural demand — tractors, inputs, and staples.',
    themes: ['Cyclical', 'Rural', 'Agri'],
    riskLabel: 'Moderate',
    riskScore: 5,
    minInvest: 12000,
    stockCount: 6,
    aiNote: 'Seasonal overlay on IMD monsoon probabilities + rural wage growth nowcasts.',
    constituents: [
      { symbol: 'MM', name: 'Mahindra & Mahindra Ltd', weight: 22, price: 2988, sector: 'Autos' },
      { symbol: 'UPL', name: 'UPL Ltd', weight: 18, price: 612, sector: 'Chemicals' },
      { symbol: 'PIIND', name: 'PI Industries Ltd', weight: 16, price: 3892, sector: 'Chemicals' },
      { symbol: 'DABUR', name: 'Dabur India Ltd', weight: 14, price: 548, sector: 'FMCG' },
      { symbol: 'CHAMBLFERT', name: 'Chambal Fertilisers', weight: 15, price: 412, sector: 'Materials' },
      { symbol: 'BAYERCROP', name: 'Bayer CropScience', weight: 15, price: 5428, sector: 'Chemicals' }
    ],
    performance: {
      return1M: 2.1,
      return3M: 4.5,
      return6M: 9.8,
      return1Y: 19.3,
      returnSinceInception: 28.7,
      cagr3Y: 12.1,
      cagrSince: 11.4,
      maxDrawdown1Y: -9.6,
      volatilityAnn: 14.2,
      alphaVsNifty1Y: 2.9,
      sharpe: 0.88,
      inception: '2022-07-20',
      benchmark: 'Nifty FMCG TRI'
    }
  },
  {
    id: 'psu-reform-alpha',
    title: 'PSU Reform Alpha',
    tagline: 'Dividend + disinvestment + governance — where policy meets cash flows.',
    themes: ['PSU', 'Dividend', 'Policy'],
    riskLabel: 'High',
    riskScore: 7,
    minInvest: 18000,
    stockCount: 7,
    aiNote: 'Tracks divestment pipeline, dividend payout floors, and ROE inflection in PSU banks & infra.',
    constituents: [
      { symbol: 'RECLTD', name: 'REC Ltd', weight: 16, price: 412, sector: 'Financials' },
      { symbol: 'PFC', name: 'Power Finance Corp', weight: 16, price: 428, sector: 'Financials' },
      { symbol: 'IRFC', name: 'Indian Railway Finance', weight: 14, price: 168, sector: 'Financials' },
      { symbol: 'IOC', name: 'Indian Oil Corp', weight: 15, price: 168, sector: 'Energy' },
      { symbol: 'BPCL', name: 'Bharat Petroleum Corp', weight: 13, price: 312, sector: 'Energy' },
      { symbol: 'CONCOR', name: 'Container Corp of India', weight: 13, price: 682, sector: 'Logistics' },
      { symbol: 'NBCC', name: 'NBCC (India) Ltd', weight: 13, price: 128, sector: 'Real Estate' }
    ],
    performance: {
      return1M: 4.8,
      return3M: 15.2,
      return6M: 28.4,
      return1Y: 48.6,
      returnSinceInception: 72.3,
      cagr3Y: 24.8,
      cagrSince: 21.5,
      maxDrawdown1Y: -11.8,
      volatilityAnn: 19.4,
      alphaVsNifty1Y: 15.2,
      sharpe: 1.18,
      inception: '2021-06-01',
      benchmark: 'BSE PSU TRI'
    }
  }
];

export function getBasketById(id) {
  return AI_BASKETS.find((b) => b.id === id) || null;
}
