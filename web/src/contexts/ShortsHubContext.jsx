import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

const LS = 'bp_shorts_likes_v1';

function readJson(key, fb) {
  try {
    const r = localStorage.getItem(key);
    if (!r) return fb;
    const v = JSON.parse(r);
    return v ?? fb;
  } catch {
    return fb;
  }
}

function writeJson(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

let listeners = [];
function emit() {
  listeners.forEach((fn) => fn());
}
function subscribe(fn) {
  listeners = [...listeners, fn];
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

function getSet() {
  const a = readJson(LS, []);
  return new Set(Array.isArray(a) ? a : []);
}

function setSet(set) {
  writeJson(LS, [...set]);
  emit();
}

const ShortsHubContext = createContext(null);

export function ShortsHubProvider({ children }) {
  const snap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS, [])), () => '[]');

  const toggleLike = useCallback((shortId) => {
    const s = getSet();
    if (s.has(shortId)) s.delete(shortId);
    else s.add(shortId);
    setSet(s);
  }, [snap]);

  const isLiked = useCallback((id) => getSet().has(id), [snap]);

  const value = useMemo(() => ({ toggleLike, isLiked }), [toggleLike, isLiked]);
  return <ShortsHubContext.Provider value={value}>{children}</ShortsHubContext.Provider>;
}

export function useShortsHub() {
  const ctx = useContext(ShortsHubContext);
  if (!ctx) throw new Error('useShortsHub must be used within ShortsHubProvider');
  return ctx;
}
