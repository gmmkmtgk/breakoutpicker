import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

import { getSeedSpaces } from 'data/voicesSpacesSeed';

const LS_USER = 'bp_voices_user_spaces_v1';
const LS_BOOST = 'bp_voices_listener_boost_v1';
const LS_REMIND = 'bp_voices_reminders_v1';

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

function getUserSpaces() {
  const a = readJson(LS_USER, []);
  return Array.isArray(a) ? a : [];
}

function setUserSpaces(list) {
  writeJson(LS_USER, list);
  emit();
}

function getBoost() {
  const o = readJson(LS_BOOST, {});
  return o && typeof o === 'object' ? o : {};
}

function setBoost(o) {
  writeJson(LS_BOOST, o);
  emit();
}

function getReminders() {
  const a = readJson(LS_REMIND, []);
  return new Set(Array.isArray(a) ? a : []);
}

function setReminders(set) {
  writeJson(LS_REMIND, [...set]);
  emit();
}

function allSpacesList() {
  const seed = getSeedSpaces().map((s) => ({ ...s, isSeed: true }));
  const user = getUserSpaces().map((s) => ({ ...s, isSeed: false }));
  return [...seed, ...user];
}

const VoicesSpacesContext = createContext(null);

export function VoicesSpacesProvider({ children }) {
  const userSnap = useSyncExternalStore(subscribe, () => JSON.stringify(getUserSpaces()), () => '[]');
  const boostSnap = useSyncExternalStore(subscribe, () => JSON.stringify(getBoost()), () => '{}');
  const remindSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_REMIND, [])), () => '[]');

  const spaces = useMemo(() => {
    const list = allSpacesList();
    const boost = getBoost();
    const withCounts = list.map((s) => ({
      ...s,
      displayListeners: Math.max(0, (s.baseListeners || 0) + (Number(boost[s.id]) || 0))
    }));
    const live = withCounts.filter((s) => s.status === 'live').sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
    const up = withCounts.filter((s) => s.status === 'scheduled').sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor));
    const past = withCounts.filter((s) => s.status === 'ended').sort((a, b) => new Date(b.endedAt || b.startedAt) - new Date(a.endedAt || a.startedAt));
    return { live, upcoming: up, ended: past, flat: withCounts };
  }, [userSnap, boostSnap, remindSnap]);

  const listenerCount = useCallback(
    (id) => {
      const s = allSpacesList().find((x) => x.id === id);
      if (!s) return 0;
      const b = getBoost();
      return Math.max(0, (s.baseListeners || 0) + (Number(b[id]) || 0));
    },
    [boostSnap]
  );

  const adjustBoost = useCallback((id, delta) => {
    const b = { ...getBoost() };
    const next = Math.max(0, (Number(b[id]) || 0) + delta);
    if (next === 0) delete b[id];
    else b[id] = next;
    setBoost(b);
  }, []);

  const joinLive = useCallback(
    (id, previousJoinedId) => {
      if (previousJoinedId && previousJoinedId !== id) adjustBoost(previousJoinedId, -1);
      adjustBoost(id, 1);
    },
    [adjustBoost]
  );

  const leaveLive = useCallback(
    (id) => {
      adjustBoost(id, -1);
    },
    [adjustBoost]
  );

  const toggleReminder = useCallback((id) => {
    const r = getReminders();
    if (r.has(id)) {
      r.delete(id);
    } else {
      r.add(id);
    }
    setReminders(r);
  }, [remindSnap]);

  const hasReminder = useCallback((id) => getReminders().has(id), [remindSnap]);

  const createSpace = useCallback((payload) => {
    const id = `voice-${Date.now()}`;
    const topics = (payload.topics || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const row =
      payload.mode === 'scheduled' && payload.scheduledFor
        ? {
            id,
            title: payload.title.trim(),
            description: payload.description.trim(),
            host: { name: payload.hostName.trim(), handle: payload.hostHandle.trim() || '@host' },
            speakers: [payload.hostName.trim()],
            status: 'scheduled',
            startedAt: null,
            scheduledFor: new Date(payload.scheduledFor).toISOString(),
            endedAt: null,
            topics: topics.length ? topics : ['Markets'],
            baseListeners: 0,
            isSeed: false
          }
        : {
            id,
            title: payload.title.trim(),
            description: payload.description.trim(),
            host: { name: payload.hostName.trim(), handle: payload.hostHandle.trim() || '@host' },
            speakers: [payload.hostName.trim()],
            status: 'live',
            startedAt: new Date().toISOString(),
            scheduledFor: null,
            endedAt: null,
            topics: topics.length ? topics : ['Markets'],
            baseListeners: 2,
            isSeed: false
          };
    setUserSpaces([...getUserSpaces(), row]);
    return id;
  }, []);

  const value = useMemo(
    () => ({
      ...spaces,
      listenerCount,
      joinLive,
      leaveLive,
      toggleReminder,
      hasReminder,
      createSpace
    }),
    [spaces, listenerCount, joinLive, leaveLive, toggleReminder, hasReminder, createSpace]
  );

  return <VoicesSpacesContext.Provider value={value}>{children}</VoicesSpacesContext.Provider>;
}

export function useVoicesSpaces() {
  const ctx = useContext(VoicesSpacesContext);
  if (!ctx) throw new Error('useVoicesSpaces must be used within VoicesSpacesProvider');
  return ctx;
}
