/**
 * Demo Indian market indices with illustrative returns and sample constituents.
 * Not live data — wire NSE/BSE feeds for production.
 */

/** @typedef {{ symbol: string, name: string, weight?: number }} IndexStock */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   code: string,
 *   exchange: 'NSE' | 'BSE',
 *   category: string,
 *   returns: { r1w: number, r1m: number, r3m: number, r6m: number, r1y: number, ytd: number },
 *   constituents: IndexStock[],
 *   note?: string
 * }} MarketIndex
 */

const r = (a, b, c, d, e, f) => ({ r1w: a, r1m: b, r3m: c, r6m: d, r1y: e, ytd: f });

/** @type {MarketIndex[]} */
export const INDIAN_INDICES = [
  {
    id: 'nifty-50',
    name: 'Nifty 50',
    code: 'NIFTY 50',
    exchange: 'NSE',
    category: 'Large cap',
    returns: r(0.4, 1.2, 4.8, 9.2, 16.4, 5.8),
    constituents: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: 9.82 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 4.51 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 12.14 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: 7.92 },
      { symbol: 'INFY', name: 'Infosys Ltd', weight: 3.88 },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', weight: 3.21 },
      { symbol: 'ITC', name: 'ITC Ltd', weight: 3.05 },
      { symbol: 'SBIN', name: 'State Bank of India', weight: 2.76 },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', weight: 1.92 },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', weight: 2.41 },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', weight: 1.85 },
      { symbol: 'AXISBANK', name: 'Axis Bank Ltd', weight: 1.72 }
    ],
    note: 'Sample weights; full 50 constituents in production.'
  },
  {
    id: 'nifty-next-50',
    name: 'Nifty Next 50',
    code: 'NIFTY JR',
    exchange: 'NSE',
    category: 'Large / mid',
    returns: r(0.2, 0.9, 3.6, 8.1, 18.2, 6.4),
    constituents: [
      { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ', weight: 4.1 },
      { symbol: 'VEDL', name: 'Vedanta Ltd', weight: 3.2 },
      { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', weight: 3.8 },
      { symbol: 'POWERGRID', name: 'Power Grid Corp', weight: 2.9 },
      { symbol: 'NTPC', name: 'NTPC Ltd', weight: 2.6 },
      { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', weight: 2.4 },
      { symbol: 'INDIGO', name: 'InterGlobe Aviation', weight: 2.1 },
      { symbol: 'DLF', name: 'DLF Ltd', weight: 1.9 }
    ],
    note: 'Illustrative subset of Next 50.'
  },
  {
    id: 'nifty-100',
    name: 'Nifty 100',
    code: 'NIFTY 100',
    exchange: 'NSE',
    category: 'Broad large',
    returns: r(0.35, 1.05, 4.2, 8.8, 17.1, 6.0),
    constituents: [
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', weight: 1.4 },
      { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', weight: 1.2 },
      { symbol: 'TITAN', name: 'Titan Company Ltd', weight: 1.1 },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', weight: 1.8 },
      { symbol: 'WIPRO', name: 'Wipro Ltd', weight: 0.9 },
      { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', weight: 1.0 }
    ],
    note: 'Nifty 50 + Next 50 combined; partial list shown.'
  },
  {
    id: 'nifty-500',
    name: 'Nifty 500',
    code: 'NIFTY 500',
    exchange: 'NSE',
    category: 'Broad market',
    returns: r(0.5, 1.4, 5.1, 10.2, 19.8, 7.2),
    constituents: [
      { symbol: 'POLYCAB', name: 'Polycab India Ltd', weight: 0.22 },
      { symbol: 'CDSL', name: 'Central Depository Services', weight: 0.18 },
      { symbol: 'ZOMATO', name: 'Zomato Ltd', weight: 0.15 },
      { symbol: 'PERSISTENT', name: 'Persistent Systems', weight: 0.12 },
      { symbol: 'TRENT', name: 'Trent Ltd', weight: 0.14 },
      { symbol: 'DMART', name: 'Avenue Supermarts', weight: 0.2 },
      { symbol: 'IRCTC', name: 'IRCTC Ltd', weight: 0.08 },
      { symbol: 'PAGEIND', name: 'Page Industries', weight: 0.09 }
    ],
    note: 'Universe of 500 liquid names; sample only.'
  },
  {
    id: 'nifty-midcap-100',
    name: 'Nifty Midcap 100',
    code: 'NIFTY MIDCAP 100',
    exchange: 'NSE',
    category: 'Mid cap',
    returns: r(0.1, 0.6, 4.4, 11.5, 24.6, 8.9),
    constituents: [
      { symbol: 'COCHINSHIP', name: 'Cochin Shipyard', weight: 1.1 },
      { symbol: 'CONCOR', name: 'Container Corp', weight: 1.0 },
      { symbol: 'MPHASIS', name: 'Mphasis Ltd', weight: 1.2 },
      { symbol: 'LALPATHLAB', name: 'Dr Lal PathLabs', weight: 0.9 },
      { symbol: 'BALKRISIND', name: 'Balkrishna Industries', weight: 0.85 }
    ]
  },
  {
    id: 'nifty-smallcap-100',
    name: 'Nifty Smallcap 100',
    code: 'NIFTY SMLCAP 100',
    exchange: 'NSE',
    category: 'Small cap',
    returns: r(-0.2, 0.2, 3.8, 9.8, 22.1, 7.5),
    constituents: [
      { symbol: 'TIMKEN', name: 'Timken India', weight: 1.05 },
      { symbol: 'CARBORUNIV', name: 'Carborundum Universal', weight: 0.95 },
      { symbol: 'FINPIPE', name: 'Finolex Industries', weight: 0.88 },
      { symbol: 'RADICO', name: 'Radico Khaitan', weight: 0.82 },
      { symbol: 'ASTRAL', name: 'Astral Ltd', weight: 1.1 }
    ]
  },
  {
    id: 'nifty-bank',
    name: 'Nifty Bank',
    code: 'BANKNIFTY',
    exchange: 'NSE',
    category: 'Sector — banks',
    returns: r(0.6, 1.8, 5.2, 11.8, 20.4, 7.1),
    constituents: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 28.4 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: 22.1 },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', weight: 9.8 },
      { symbol: 'AXISBANK', name: 'Axis Bank Ltd', weight: 8.9 },
      { symbol: 'SBIN', name: 'State Bank of India', weight: 10.2 },
      { symbol: 'INDUSINDBK', name: 'IndusInd Bank', weight: 4.2 },
      { symbol: 'BANKBARODA', name: 'Bank of Baroda', weight: 2.6 },
      { symbol: 'FEDERALBNK', name: 'Federal Bank', weight: 1.8 }
    ]
  },
  {
    id: 'nifty-it',
    name: 'Nifty IT',
    code: 'NIFTY IT',
    exchange: 'NSE',
    category: 'Sector — IT',
    returns: r(0.3, 2.4, 8.1, 14.2, 28.6, 10.2),
    constituents: [
      { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 32 },
      { symbol: 'INFY', name: 'Infosys Ltd', weight: 28 },
      { symbol: 'HCLTECH', name: 'HCL Technologies', weight: 12 },
      { symbol: 'TECHM', name: 'Tech Mahindra', weight: 8 },
      { symbol: 'WIPRO', name: 'Wipro Ltd', weight: 10 },
      { symbol: 'LTIM', name: 'LTIMindtree Ltd', weight: 6 },
      { symbol: 'MPHASIS', name: 'Mphasis Ltd', weight: 4 }
    ]
  },
  {
    id: 'nifty-fmcg',
    name: 'Nifty FMCG',
    code: 'NIFTY FMCG',
    exchange: 'NSE',
    category: 'Sector — FMCG',
    returns: r(0.15, 0.8, 2.9, 6.4, 12.8, 4.2),
    constituents: [
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', weight: 38 },
      { symbol: 'ITC', name: 'ITC Ltd', weight: 22 },
      { symbol: 'NESTLEIND', name: 'Nestlé India', weight: 12 },
      { symbol: 'BRITANNIA', name: 'Britannia Industries', weight: 8 },
      { symbol: 'DABUR', name: 'Dabur India', weight: 6 },
      { symbol: 'MARICO', name: 'Marico Ltd', weight: 5 },
      { symbol: 'COLPAL', name: 'Colgate-Palmolive', weight: 5 }
    ]
  },
  {
    id: 'nifty-auto',
    name: 'Nifty Auto',
    code: 'NIFTY AUTO',
    exchange: 'NSE',
    category: 'Sector — autos',
    returns: r(-0.1, 0.5, 3.2, 8.9, 19.1, 6.8),
    constituents: [
      { symbol: 'MARUTI', name: 'Maruti Suzuki India', weight: 22 },
      { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', weight: 20 },
      { symbol: 'MM', name: 'Mahindra & Mahindra', weight: 18 },
      { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', weight: 12 },
      { symbol: 'EICHERMOT', name: 'Eicher Motors', weight: 10 },
      { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp', weight: 10 },
      { symbol: 'MOTHERSON', name: 'Samvardhana Motherson', weight: 8 }
    ]
  },
  {
    id: 'sensex',
    name: 'S&P BSE Sensex',
    code: 'SENSEX',
    exchange: 'BSE',
    category: 'Flagship 30',
    returns: r(0.35, 1.1, 4.5, 9.0, 15.8, 5.5),
    constituents: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: 11.2 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', weight: 5.8 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 9.4 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: 6.2 },
      { symbol: 'INFY', name: 'Infosys Ltd', weight: 4.1 },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', weight: 3.5 },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', weight: 3.8 },
      { symbol: 'SBIN', name: 'State Bank of India', weight: 2.9 }
    ],
    note: 'BSE Sensex 30 — sample weights.'
  },
  {
    id: 'bse-500',
    name: 'S&P BSE 500',
    code: 'BSE 500',
    exchange: 'BSE',
    category: 'Broad market',
    returns: r(0.45, 1.3, 5.0, 10.0, 19.2, 7.0),
    constituents: [
      { symbol: 'ASHOKLEY', name: 'Ashok Leyland', weight: 0.12 },
      { symbol: 'BHEL', name: 'BHEL', weight: 0.15 },
      { symbol: 'CANBK', name: 'Canara Bank', weight: 0.18 },
      { symbol: 'EXIDEIND', name: 'Exide Industries', weight: 0.1 },
      { symbol: 'NATIONALUM', name: 'National Aluminium', weight: 0.09 }
    ],
    note: 'Wide BSE universe; illustrative tickers.'
  },
  {
    id: 'india-vix',
    name: 'India VIX',
    code: 'INDIAVIX',
    exchange: 'NSE',
    category: 'Volatility',
    returns: r(-2.1, 4.5, -8.2, 2.1, 14.8, 6.2),
    constituents: [],
    note: 'Volatility index — not a basket of equities. Constituents N/A.'
  }
];

export function getIndexById(id) {
  return INDIAN_INDICES.find((x) => x.id === id) || null;
}
