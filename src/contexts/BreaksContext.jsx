import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { getSeedBreaks } from 'data/breaksSeed';
import { buildTopTraders, EVALUATION_STATUS, evaluateSpecialBreakDemo, isResolvedStatus } from 'utils/breakEvaluation';

const STORAGE_KEY = 'breakoutpicker_breaks_v1';

function loadStoredBreaks() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistBreaks(breaks) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(breaks));
  } catch {
    // ignore quota
  }
}

const BreaksContext = createContext(null);

export function BreaksProvider({ children }) {
  const [breaks, setBreaks] = useState(() => {
    const stored = loadStoredBreaks();
    if (Array.isArray(stored) && stored.length) return stored;
    return getSeedBreaks();
  });

  const setBreaksAndPersist = useCallback((updater) => {
    setBreaks((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      persistBreaks(next);
      return next;
    });
  }, []);

  const addBreak = useCallback(
    (payload) => {
      const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `b-${Date.now()}`;
      const createdAt = new Date().toISOString();
      const item = {
        id,
        createdAt,
        ...payload,
        evaluation: payload.kind === 'special' ? { status: EVALUATION_STATUS.OPEN } : undefined
      };
      setBreaksAndPersist((prev) => [item, ...prev]);
      return id;
    },
    [setBreaksAndPersist]
  );

  /** Demo-only: re-evaluate one Special Break from a hypothetical last price. */
  const resolveBreakDemo = useCallback(
    (breakId, lastPrice) => {
      setBreaksAndPersist((prev) =>
        prev.map((b) => {
          if (b.id !== breakId || b.kind !== 'special') return b;
          const status = evaluateSpecialBreakDemo({
            targetPrice: b.targetPrice,
            stopLoss: b.stopLoss,
            lastPrice: Number(lastPrice)
          });
          if (status === EVALUATION_STATUS.OPEN) return b;
          return {
            ...b,
            evaluation: {
              status,
              resolvedAt: new Date().toISOString(),
              demoPrice: Number(lastPrice)
            }
          };
        })
      );
    },
    [setBreaksAndPersist]
  );

  const topTraders = useMemo(() => buildTopTraders(breaks), [breaks]);

  const stats = useMemo(() => {
    const special = breaks.filter((b) => b.kind === 'special');
    const resolved = special.filter((b) => isResolvedStatus(b.evaluation?.status));
    const wins = resolved.filter((b) => b.evaluation?.status === EVALUATION_STATUS.TARGET_HIT).length;
    return {
      totalBreaks: breaks.length,
      specialOpen: special.filter((b) => b.evaluation?.status === EVALUATION_STATUS.OPEN).length,
      specialResolved: resolved.length,
      targetHits: wins
    };
  }, [breaks]);

  const value = useMemo(
    () => ({
      breaks,
      addBreak,
      resolveBreakDemo,
      topTraders,
      stats
    }),
    [breaks, addBreak, resolveBreakDemo, topTraders, stats]
  );

  return <BreaksContext.Provider value={value}>{children}</BreaksContext.Provider>;
}

BreaksProvider.propTypes = {
  children: PropTypes.node
};

export function useBreaks() {
  const ctx = useContext(BreaksContext);
  if (!ctx) throw new Error('useBreaks must be used within BreaksProvider');
  return ctx;
}
