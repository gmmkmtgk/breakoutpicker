/**
 * Demo SEBI-registered portfolio publishers. Not real persons or performance.
 */

export const SEED_MANAGERS = [
  {
    id: 'm-seed-1',
    displayName: 'Priya Sharma',
    handle: 'priya_ria_sebi',
    sebiType: 'Investment Adviser (Individual)',
    sebiRegNo: 'INA000015877',
    verified: true,
    tagline: 'Large-cap quality + tactical mid-cap overlay. Monthly rebalance notes.',
    monthlyFee: 499,
    subscriberCount: 186,
    avgRating: 4.7,
    ratingCount: 52,
    ytdReturnPct: 14.2,
    oneYearReturnPct: 21.8,
    maxDrawdownPct: -9.4,
    inception: '2023-04-12',
    portfolio: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 18 },
      { symbol: 'INFY', name: 'Infosys Ltd', weight: 14 },
      { symbol: 'TCS', name: 'Tata Consultancy', weight: 12 },
      { symbol: 'RELIANCE', name: 'Reliance Industries', weight: 16 },
      { symbol: 'ITC', name: 'ITC Ltd', weight: 12 },
      { symbol: 'LT', name: 'Larsen & Toubro', weight: 14 },
      { symbol: 'CASH', name: 'Cash / liquid', weight: 14 }
    ],
    monthlyReturnsPct: [1.2, -0.4, 2.1, 0.8, 1.5, -0.9, 2.4, 1.1, 0.6, 1.9, -0.3, 1.4]
  },
  {
    id: 'm-seed-2',
    displayName: 'Rahul Verma',
    handle: 'rahul_ra_smallcap',
    sebiType: 'Research Analyst',
    sebiRegNo: 'INH000009432',
    verified: true,
    tagline: 'Nifty Midcap 150 momentum + risk-off rules. High conviction, 12–15 names.',
    monthlyFee: 799,
    subscriberCount: 94,
    avgRating: 4.2,
    ratingCount: 31,
    ytdReturnPct: 18.6,
    oneYearReturnPct: 28.4,
    maxDrawdownPct: -16.2,
    inception: '2022-11-01',
    portfolio: [
      { symbol: 'POLYCAB', name: 'Polycab India', weight: 12 },
      { symbol: 'CDSL', name: 'Central Depository', weight: 10 },
      { symbol: 'TRENT', name: 'Trent Ltd', weight: 11 },
      { symbol: 'PIDILITIND', name: 'Pidilite Industries', weight: 9 },
      { symbol: 'CUMMINSIND', name: 'Cummins India', weight: 10 },
      { symbol: 'SOLARINDS', name: 'Solar Industries', weight: 10 },
      { symbol: 'APLAPOLLO', name: 'APL Apollo Tubes', weight: 10 },
      { symbol: 'CASH', name: 'Cash / liquid', weight: 28 }
    ],
    monthlyReturnsPct: [2.8, -1.2, 3.4, 1.2, 2.0, -2.1, 4.1, 0.5, 1.8, 2.2, -1.0, 2.6]
  }
];
