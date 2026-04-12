/**
 * Indian stock / economy RSS sources merged on the News page.
 * Fetched client-side via rss2json (see News.jsx). Add VITE_RSS2JSON_API_KEY for higher limits.
 */
export const INDIAN_MARKET_NEWS_FEEDS = [
  {
    id: 'mc',
    label: 'Moneycontrol',
    rss: 'https://www.moneycontrol.com/rss/latestnews.xml'
  },
  {
    id: 'et',
    label: 'Economic Times — Markets',
    rss: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms'
  },
  {
    id: 'bs',
    label: 'Business Standard — Markets',
    rss: 'https://www.business-standard.com/rss/markets-106.rss'
  },
  {
    id: 'mint',
    label: 'Mint — Markets',
    rss: 'https://www.livemint.com/rss/markets'
  },
  {
    id: 'gn',
    label: 'Google News — India markets',
    rss: 'https://news.google.com/rss/search?q=NSE+BSE+Indian+stock+market&hl=en-IN&gl=IN&ceid=IN:en'
  }
];
