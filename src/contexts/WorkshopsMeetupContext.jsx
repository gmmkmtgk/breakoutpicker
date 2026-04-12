import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

import { getSeedWorkshops } from 'data/workshopsSeed';

const LS_USER = 'bp_workshops_user_v1';
const LS_RSVP = 'bp_workshops_rsvp_v1';
const LS_EXTRA = 'bp_workshops_extra_going_v1';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
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

function getUserWorkshops() {
  const list = readJson(LS_USER, []);
  return Array.isArray(list) ? list : [];
}

function setUserWorkshops(list) {
  writeJson(LS_USER, list);
  emit();
}

function getRsvpSet() {
  const arr = readJson(LS_RSVP, []);
  return new Set(Array.isArray(arr) ? arr : []);
}

function setRsvpSet(set) {
  writeJson(LS_RSVP, [...set]);
  emit();
}

function getExtraGoing() {
  const o = readJson(LS_EXTRA, {});
  return o && typeof o === 'object' ? o : {};
}

function setExtraGoing(o) {
  writeJson(LS_EXTRA, o);
  emit();
}

const WorkshopsMeetupContext = createContext(null);

export function WorkshopsMeetupProvider({ children }) {
  const userList = useSyncExternalStore(subscribe, getUserWorkshops, () => []);
  const rsvpSnap = useSyncExternalStore(subscribe, () => JSON.stringify(readJson(LS_RSVP, [])), () => '[]');
  const extraSnap = useSyncExternalStore(subscribe, () => JSON.stringify(getExtraGoing()), () => '{}');

  const workshops = useMemo(() => {
    const seed = getSeedWorkshops().map((w) => ({ ...w, isSeed: true }));
    const user = userList.map((w) => ({ ...w, isSeed: false }));
    return [...seed, ...user].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  }, [userList, rsvpSnap, extraSnap]);

  const rsvpIds = useMemo(() => getRsvpSet(), [rsvpSnap]);

  const goingCount = useCallback((w) => {
    const extra = getExtraGoing();
    const add = Number(extra[w.id]) || 0;
    return Math.min(w.capacity, w.baseAttendees + add);
  }, [extraSnap]);

  const isJoined = useCallback((id) => rsvpIds.has(id), [rsvpIds]);

  const toggleRsvp = useCallback((id) => {
    const set = getRsvpSet();
    const extra = { ...getExtraGoing() };
    const w = [...getSeedWorkshops(), ...getUserWorkshops()].find((x) => x.id === id);
    if (!w) return;

    if (set.has(id)) {
      set.delete(id);
      extra[id] = Math.max(0, (Number(extra[id]) || 0) - 1);
    } else {
      const currentGoing = Math.min(w.capacity, w.baseAttendees + (Number(extra[id]) || 0));
      if (currentGoing >= w.capacity) return;
      set.add(id);
      extra[id] = (Number(extra[id]) || 0) + 1;
    }
    setRsvpSet(set);
    setExtraGoing(extra);
  }, []);

  const addUserWorkshop = useCallback((payload) => {
    const id = `user-${Date.now()}`;
    const row = {
      id,
      title: payload.title.trim(),
      organizer: payload.organizer.trim(),
      description: payload.description.trim(),
      startsAt: new Date(payload.startsAt).toISOString(),
      durationMin: Math.max(30, Number(payload.durationMin) || 90),
      mode: payload.mode,
      city: payload.city?.trim() || 'India (online)',
      venue: payload.venue?.trim() || '',
      meetingUrl: payload.meetingUrl?.trim() || '',
      priceINR: Math.max(0, Number(payload.priceINR) || 0),
      capacity: Math.max(5, Math.min(500, Number(payload.capacity) || 40)),
      baseAttendees: 0,
      topics: payload.topics
        ? payload.topics
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : ['General']
    };
    setUserWorkshops([...getUserWorkshops(), row]);
    return id;
  }, []);

  const value = useMemo(
    () => ({
      workshops,
      isJoined,
      goingCount,
      toggleRsvp,
      addUserWorkshop
    }),
    [workshops, isJoined, goingCount, toggleRsvp, addUserWorkshop]
  );

  return <WorkshopsMeetupContext.Provider value={value}>{children}</WorkshopsMeetupContext.Provider>;
}

export function useWorkshopsMeetup() {
  const ctx = useContext(WorkshopsMeetupContext);
  if (!ctx) throw new Error('useWorkshopsMeetup must be used within WorkshopsMeetupProvider');
  return ctx;
}
