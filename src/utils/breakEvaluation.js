/**
 * Client-side helpers for Special Break evaluation.
 * A full product would resolve these from market data on the server.
 */

export const EVALUATION_STATUS = {
  OPEN: 'open',
  TARGET_HIT: 'target_hit',
  STOP_HIT: 'stop_hit',
  EXPIRED_NEUTRAL: 'expired_neutral'
};

/**
 * For a long bias: target above entry, stop below entry.
 * Returns which level would be hit first given high/low path (simplified bar).
 * @param {number} entry - reference entry (e.g. last close at post time)
 * @param {number} target
 * @param {number} stopLoss
 * @param {{ high: number, low: number }} bar - single period high/low
 */
export function outcomeFromBar(entry, target, stopLoss, bar) {
  const hitTarget = bar.high >= target;
  const hitStop = bar.low <= stopLoss;

  if (hitTarget && hitStop) {
    const distTarget = Math.abs(target - entry);
    const distStop = Math.abs(entry - stopLoss);
    return distTarget <= distStop ? EVALUATION_STATUS.TARGET_HIT : EVALUATION_STATUS.STOP_HIT;
  }
  if (hitTarget) return EVALUATION_STATUS.TARGET_HIT;
  if (hitStop) return EVALUATION_STATUS.STOP_HIT;
  return null;
}

/**
 * Demo resolver: uses last price vs target/stop to classify (no path dependency).
 * @param {'long'|'short'} direction
 */
export function evaluateSpecialBreakDemo({ targetPrice, stopLoss, lastPrice, direction = 'long' }) {
  if (lastPrice == null || Number.isNaN(lastPrice)) return EVALUATION_STATUS.OPEN;

  if (direction === 'long') {
    if (lastPrice >= targetPrice) return EVALUATION_STATUS.TARGET_HIT;
    if (lastPrice <= stopLoss) return EVALUATION_STATUS.STOP_HIT;
  } else {
    if (lastPrice <= targetPrice) return EVALUATION_STATUS.TARGET_HIT;
    if (lastPrice >= stopLoss) return EVALUATION_STATUS.STOP_HIT;
  }
  return EVALUATION_STATUS.EXPIRED_NEUTRAL;
}

export function isResolvedStatus(status) {
  return status && status !== EVALUATION_STATUS.OPEN;
}

/**
 * Aggregate Special Break outcomes per author for the leaderboard.
 * @param {Array} breaks
 */
export function buildTopTraders(breaks) {
  const byUser = new Map();

  for (const b of breaks) {
    if (b.kind !== 'special' || !b.author?.id) continue;
    const ev = b.evaluation?.status;
    if (!isResolvedStatus(ev)) continue;

    if (!byUser.has(b.author.id)) {
      byUser.set(b.author.id, {
        userId: b.author.id,
        name: b.author.name,
        handle: b.author.handle,
        avatar: b.author.avatar,
        wins: 0,
        losses: 0,
        neutral: 0
      });
    }
    const row = byUser.get(b.author.id);
    if (ev === EVALUATION_STATUS.TARGET_HIT) row.wins += 1;
    else if (ev === EVALUATION_STATUS.STOP_HIT) row.losses += 1;
    else row.neutral += 1;
  }

  const list = [];
  for (const row of byUser.values()) {
    const graded = row.wins + row.losses;
    const successRate = graded > 0 ? Math.round((row.wins / graded) * 1000) / 10 : 0;
    const total = row.wins + row.losses + row.neutral;
    const score = row.wins * 10 - row.losses * 4;
    list.push({ ...row, graded, total, successRate, score });
  }

  list.sort((a, b) => {
    if (b.successRate !== a.successRate) return b.successRate - a.successRate;
    if (b.score !== a.score) return b.score - a.score;
    return b.total - a.total;
  });

  return list;
}
