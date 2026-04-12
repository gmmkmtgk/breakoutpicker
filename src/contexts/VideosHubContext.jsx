import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

const LS_LIKE = 'bp_videos_likes_v1';
const LS_WL = 'bp_videos_watchlater_v1';
const LS_SUB = 'bp_videos_subs_v1';
const LS_HIST = 'bp_videos_history_v1';

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

function getSet(key) {
  const a = readJson(key, []);
  return new Set(Array.isArray(a) ? a : []);
}

function setSet(key, set) {
  writeJson(key, [...set]);
  emit();
}

function pushHistory(id) {
  const arr = readJson(LS_HIST, []);
  const list = Array.isArray(arr) ? arr : [];
  const next = [id, ...list.filter((x) => x !== id)].slice(0, 40);
  writeJson(LS_HIST, next);
  emit();
}

const VideosHubContext = createContext(null);

export function VideosHubProvider({ children }) {
  const likeSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_LIKE, [])), () => '[]');
  const wlSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_WL, [])), () => '[]');
  const subSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_SUB, [])), () => '[]');
  const histSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_HIST, [])), () => '[]');

  const toggleLike = useCallback((videoId) => {
    const s = getSet(LS_LIKE);
    if (s.has(videoId)) s.delete(videoId);
    else s.add(videoId);
    setSet(LS_LIKE, s);
  }, [likeSnap]);

  const toggleWatchLater = useCallback((videoId) => {
    const s = getSet(LS_WL);
    if (s.has(videoId)) s.delete(videoId);
    else s.add(videoId);
    setSet(LS_WL, s);
  }, [wlSnap]);

  const toggleSubscribe = useCallback((channelKey) => {
    const s = getSet(LS_SUB);
    if (s.has(channelKey)) s.delete(channelKey);
    else s.add(channelKey);
    setSet(LS_SUB, s);
  }, [subSnap]);

  const isLiked = useCallback((id) => getSet(LS_LIKE).has(id), [likeSnap]);
  const isWatchLater = useCallback((id) => getSet(LS_WL).has(id), [wlSnap]);
  const isSubscribed = useCallback((key) => getSet(LS_SUB).has(key), [subSnap]);

  const recordWatch = useCallback((videoId) => {
    pushHistory(videoId);
  }, [histSnap]);

  const historyIds = useMemo(() => readJson(LS_HIST, []), [histSnap]);

  const value = useMemo(
    () => ({
      toggleLike,
      toggleWatchLater,
      toggleSubscribe,
      isLiked,
      isWatchLater,
      isSubscribed,
      recordWatch,
      historyIds
    }),
    [toggleLike, toggleWatchLater, toggleSubscribe, isLiked, isWatchLater, isSubscribed, recordWatch, historyIds]
  );

  return <VideosHubContext.Provider value={value}>{children}</VideosHubContext.Provider>;
}

export function useVideosHub() {
  const ctx = useContext(VideosHubContext);
  if (!ctx) throw new Error('useVideosHub must be used within VideosHubProvider');
  return ctx;
}
