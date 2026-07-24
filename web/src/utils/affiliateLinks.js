/**
 * Build store links. Set in .env for commissions:
 * - VITE_AMAZON_AFFILIATE_TAG (Amazon Associates India, e.g. yoursitename-21)
 * - VITE_FLIPKART_AFFILIATE_ID (Flipkart Affiliate / AFID when applicable)
 */

export function amazonInAffiliateUrl(asin) {
  const id = String(asin || '').trim();
  if (!id) return 'https://www.amazon.in/';
  const tag = import.meta.env.VITE_AMAZON_AFFILIATE_TAG;
  const base = `https://www.amazon.in/dp/${encodeURIComponent(id)}`;
  if (!tag) return base;
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}tag=${encodeURIComponent(tag)}`;
}

/** Flipkart search (works without product PID); add affiliate id when your program supplies the correct param. */
export function flipkartSearchUrl(query) {
  const q = String(query || '').trim();
  const u = new URL('https://www.flipkart.com/search');
  if (q) u.searchParams.set('q', q);
  const aff = import.meta.env.VITE_FLIPKART_AFFILIATE_ID;
  if (aff) u.searchParams.set('affid', aff);
  return u.toString();
}
