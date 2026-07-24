/**
 * Curated stock-market & investing books (India-relevant mix).
 * amazonAsin = Amazon.in product id for dp link + optional Associates tag.
 * flipkartQuery = search string for Flipkart (deep product URLs change often).
 */

export const BOOK_THEMES = [
  { id: 'all', label: 'All' },
  { id: 'india', label: 'India focus' },
  { id: 'fundamental', label: 'Fundamental investing' },
  { id: 'technical', label: 'Technical & trading' },
  { id: 'psychology', label: 'Psychology & behaviour' },
  { id: 'personal', label: 'Personal finance' },
  { id: 'derivatives', label: 'F&O & derivatives' },
  { id: 'global', label: 'Global classics' },
  { id: 'biography', label: 'Stories & history' }
];

export const STOCK_MARKET_BOOKS = [
  {
    id: 'coffee-can',
    title: 'Coffee Can Investing',
    author: 'Saurabh Mukherjea, Rakshit Ranjan & Pranab Uniyal',
    themes: ['india', 'fundamental'],
    blurb: 'Low-churn quality investing in Indian listed companies — compounding with a “coffee can” mindset.',
    amazonAsin: '067009045X',
    flipkartQuery: 'Coffee Can Investing Saurabh Mukherjea'
  },
  {
    id: 'unusual-billionaires',
    title: 'The Unusual Billionaires',
    author: 'Saurabh Mukherjea',
    themes: ['india', 'fundamental', 'biography'],
    blurb: 'Case-study style look at disciplined Indian companies that compounded wealth for shareholders.',
    amazonAsin: '0143426737',
    flipkartQuery: 'The Unusual Billionaires Saurabh Mukherjea'
  },
  {
    id: 'lets-talk-money',
    title: "Let's Talk Money",
    author: 'Monika Halan',
    themes: ['india', 'personal'],
    blurb: 'Straight-talk personal finance for Indian households — debt, insurance, goals, and sensible investing.',
    amazonAsin: '9352779398',
    flipkartQuery: "Let's Talk Money Monika Halan"
  },
  {
    id: 'from-rat-race',
    title: 'From the Rat Race to Financial Freedom',
    author: 'Manoj Arora',
    themes: ['india', 'personal'],
    blurb: 'A popular Indian narrative on escaping burnout and building freedom with simpler money rules.',
    amazonAsin: '9380494835',
    flipkartQuery: 'From the Rat Race to Financial Freedom Manoj Arora'
  },
  {
    id: 'bulls-bears-beasts',
    title: 'Bulls, Bears and Other Beasts',
    author: 'Santosh Nair',
    themes: ['india', 'biography', 'global'],
    blurb: 'History of Indian markets through booms and busts — useful context for anyone trading or investing today.',
    amazonAsin: '938622834X',
    flipkartQuery: 'Bulls Bears and Other Beasts Santosh Nair'
  },
  {
    id: 'intelligent-investor',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham (commentary by Jason Zweig)',
    themes: ['global', 'fundamental'],
    blurb: 'The value-investing bible: margin of safety, Mr Market, and temperament — still quoted by top investors.',
    amazonAsin: '0060555665',
    flipkartQuery: 'The Intelligent Investor Benjamin Graham'
  },
  {
    id: 'one-up-wall-street',
    title: 'One Up On Wall Street',
    author: 'Peter Lynch',
    themes: ['global', 'fundamental'],
    blurb: 'How everyday observations can feed stock ideas — accessible framework before you dive into Indian smallcaps.',
    amazonAsin: '0743242385',
    flipkartQuery: 'One Up On Wall Street Peter Lynch'
  },
  {
    id: 'common-stocks',
    title: 'Common Stocks and Uncommon Profits',
    author: 'Philip A. Fisher',
    themes: ['global', 'fundamental'],
    blurb: 'Scuttlebutt, management quality, and long holding periods — complements Graham-style valuation work.',
    amazonAsin: '0471445509',
    flipkartQuery: 'Common Stocks and Uncommon Profits Philip Fisher'
  },
  {
    id: 'random-walk',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton G. Malkiel',
    themes: ['global', 'personal', 'fundamental'],
    blurb: 'Markets, indexing, and bubbles — good counterweight if you only read active-stock-picking books.',
    amazonAsin: '0393358380',
    flipkartQuery: 'A Random Walk Down Wall Street Burton Malkiel'
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    themes: ['psychology', 'personal', 'global'],
    blurb: 'Short essays on luck, compounding, and behaviour — pairs well with any India technical or fundamental path.',
    amazonAsin: '9390896984',
    flipkartQuery: 'The Psychology of Money Morgan Housel'
  },
  {
    id: 'value-behavioral',
    title: 'Value Investing and Behavioral Finance',
    author: 'Parag Parikh',
    themes: ['india', 'fundamental', 'psychology'],
    blurb: 'Indian context on biases, bubbles, and rational investing — widely used by serious equity readers.',
    amazonAsin: '007014918X',
    flipkartQuery: 'Value Investing and Behavioral Finance Parag Parikh'
  },
  {
    id: 'trading-zone',
    title: 'Trading in the Zone',
    author: 'Mark Douglas',
    themes: ['psychology', 'technical'],
    blurb: 'Probabilistic thinking and consistency — essential if you trade NSE actively.',
    amazonAsin: '0735201447',
    flipkartQuery: 'Trading in the Zone Mark Douglas'
  },
  {
    id: 'market-wizards',
    title: 'Market Wizards',
    author: 'Jack D. Schwager',
    themes: ['global', 'technical', 'biography'],
    blurb: 'Interviews with legendary traders — patterns of discipline more than “setups”.',
    amazonAsin: '0887306101',
    flipkartQuery: 'Market Wizards Jack Schwager'
  },
  {
    id: 'candlestick',
    title: 'Japanese Candlestick Charting Techniques',
    author: 'Steve Nison',
    themes: ['technical', 'global'],
    blurb: 'Foundational reference for candlestick patterns used on every Indian broker charting platform.',
    amazonAsin: '0139316500',
    flipkartQuery: 'Japanese Candlestick Charting Steve Nison'
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis of the Financial Markets',
    author: 'John J. Murphy',
    themes: ['technical', 'global'],
    blurb: 'Broad encyclopedia of indicators and intermarket links — good desk reference after basics.',
    amazonAsin: '0735200661',
    flipkartQuery: 'Technical Analysis John Murphy'
  },
  {
    id: 'options-volatility',
    title: 'Options, Futures, and Other Derivatives',
    author: 'John C. Hull',
    themes: ['derivatives', 'global'],
    blurb: 'Academic standard for pricing and risk — heavy, but the right depth before serious F&O modelling.',
    amazonAsin: '013447208X',
    flipkartQuery: 'Options Futures Other Derivatives John Hull'
  },
  {
    id: 'naked-economics',
    title: 'Naked Economics',
    author: 'Charles Wheelan',
    themes: ['global', 'personal'],
    blurb: 'Macro intuition without equations — helps read RBI, inflation, and why indices react to news.',
    amazonAsin: '0393356493',
    flipkartQuery: 'Naked Economics Charles Wheelan'
  }
];
