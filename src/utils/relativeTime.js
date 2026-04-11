/** Short relative label like Twitter ("4h", "2d"). */
export function formatRelativeTime(iso) {
  try {
    const t = new Date(iso).getTime();
    const diff = Date.now() - t;
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${Math.max(0, s)}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d`;
    const w = Math.floor(d / 7);
    if (w < 5) return `${w}w`;
    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo}mo`;
    return `${Math.floor(d / 365)}y`;
  } catch {
    return '';
  }
}
