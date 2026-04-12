import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { SEED_MANAGERS } from 'data/peopleInvestSeed';

const LS_PROFILE = 'peopleInvest_profile_v1';
const LS_SUBS = 'peopleInvest_subs_v1';
const LS_RATINGS = 'peopleInvest_ratings_v1';

function loadJson(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const r = window.localStorage.getItem(key);
    return r ? JSON.parse(r) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, val) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

const defaultProfile = {
  verificationStatus: 'none',
  sebiRegNo: '',
  proofFileName: '',
  displayName: '',
  handle: '',
  sebiType: 'Research Analyst',
  tagline: '',
  monthlyFee: 499,
  portfolio: [
    { symbol: 'NIFTYBEES', name: 'Nippon India ETF Nifty BeES', weight: 40 },
    { symbol: 'GOLDBEES', name: 'Nippon India ETF Gold BeES', weight: 20 },
    { symbol: 'CASH', name: 'Cash / liquid', weight: 40 }
  ],
  rejectedReason: ''
};

const ME_MANAGER_ID = 'm-me';

const PeopleInvestContext = createContext(null);

function buildMeManager(profile, ratings) {
  const myRatings = ratings.filter((r) => r.managerId === ME_MANAGER_ID);
  const avg = myRatings.length > 0 ? myRatings.reduce((s, r) => s + r.stars, 0) / myRatings.length : null;

  return {
    id: ME_MANAGER_ID,
    displayName: profile.displayName || 'Your public name',
    handle: profile.handle || 'your_handle',
    sebiType: profile.sebiType,
    sebiRegNo: profile.sebiRegNo,
    verified: true,
    tagline: profile.tagline || 'Your strategy headline',
    monthlyFee: Number(profile.monthlyFee) || 499,
    subscriberCount: 0,
    avgRating: avg != null ? Math.round(avg * 10) / 10 : null,
    ratingCount: myRatings.length,
    ytdReturnPct: 11.4,
    oneYearReturnPct: 16.2,
    maxDrawdownPct: -8.1,
    inception: new Date().toISOString().slice(0, 10),
    portfolio: profile.portfolio?.length ? profile.portfolio : defaultProfile.portfolio,
    monthlyReturnsPct: [0.8, 0.2, 1.1, -0.3, 1.4, 0.9, 1.0, -0.5, 1.2, 0.4, 0.7, 1.3],
    isYou: true
  };
}

function mergeManagerRatings(manager, ratings) {
  const mine = ratings.filter((r) => r.managerId === manager.id);
  if (!mine.length) return manager;
  const avg = mine.reduce((s, r) => s + r.stars, 0) / mine.length;
  return {
    ...manager,
    avgRating: Math.round(avg * 10) / 10,
    ratingCount: mine.length
  };
}

export function PeopleInvestProvider({ children }) {
  const [profile, setProfile] = useState(() => loadJson(LS_PROFILE, defaultProfile));
  const [subscriptions, setSubscriptions] = useState(() => loadJson(LS_SUBS, []));
  const [ratings, setRatings] = useState(() => loadJson(LS_RATINGS, []));

  const persistSubs = useCallback((s) => {
    setSubscriptions(s);
    saveJson(LS_SUBS, s);
  }, []);

  const persistRatings = useCallback((r) => {
    setRatings(r);
    saveJson(LS_RATINGS, r);
  }, []);

  const submitVerification = useCallback((payload) => {
    setProfile((prev) => {
      const next = { ...prev, ...payload, verificationStatus: 'pending', rejectedReason: '' };
      saveJson(LS_PROFILE, next);
      return next;
    });
  }, []);

  const demoApproveVerification = useCallback(() => {
    setProfile((prev) => {
      const next = { ...prev, verificationStatus: 'verified' };
      saveJson(LS_PROFILE, next);
      return next;
    });
  }, []);

  const demoRejectVerification = useCallback(() => {
    setProfile((prev) => {
      const next = {
        ...prev,
        verificationStatus: 'rejected',
        rejectedReason: 'Demo: document could not be matched to SEBI records. Re-upload a clearer certificate.'
      };
      saveJson(LS_PROFILE, next);
      return next;
    });
  }, []);

  const resetProfileDemo = useCallback(() => {
    setProfile(defaultProfile);
    setSubscriptions([]);
    setRatings([]);
    saveJson(LS_PROFILE, defaultProfile);
    saveJson(LS_SUBS, []);
    saveJson(LS_RATINGS, []);
  }, []);

  const updateMyPortfolio = useCallback((holdings) => {
    setProfile((prev) => {
      if (prev.verificationStatus !== 'verified') return prev;
      const next = { ...prev, portfolio: holdings };
      saveJson(LS_PROFILE, next);
      return next;
    });
  }, []);

  const updateMyProfileFields = useCallback((partial) => {
    setProfile((prev) => {
      const next = { ...prev, ...partial };
      saveJson(LS_PROFILE, next);
      return next;
    });
  }, []);

  const subscribe = useCallback((managerId, fee) => {
    let added = false;
    setSubscriptions((prev) => {
      if (prev.some((s) => s.managerId === managerId)) return prev;
      added = true;
      const row = {
        managerId,
        subscribedAt: new Date().toISOString(),
        pricePaid: fee,
        paymentRef: `DEMO-${Date.now()}`
      };
      const next = [...prev, row];
      saveJson(LS_SUBS, next);
      return next;
    });
    return added;
  }, []);

  const rateManager = useCallback(
    (managerId, stars, comment) => {
      const next = ratings.filter((r) => !(r.managerId === managerId && r.fromUserId === 'demo-user'));
      next.push({
        managerId,
        stars,
        comment: comment || '',
        at: new Date().toISOString(),
        fromUserId: 'demo-user'
      });
      persistRatings(next);
    },
    [ratings, persistRatings]
  );

  const managers = useMemo(() => {
    let list = SEED_MANAGERS.map((m) => mergeManagerRatings(m, ratings)).map((m) => ({
      ...m,
      liveSubscriberCount: m.subscriberCount + subscriptions.filter((s) => s.managerId === m.id).length
    }));
    if (profile.verificationStatus === 'verified' && profile.displayName && profile.sebiRegNo) {
      const me = mergeManagerRatings(buildMeManager(profile, ratings), ratings);
      list = [
        {
          ...me,
          liveSubscriberCount: subscriptions.filter((s) => s.managerId === ME_MANAGER_ID).length
        },
        ...list
      ];
    }
    return list;
  }, [profile, ratings, subscriptions]);

  const discoverManagers = useMemo(() => managers.filter((m) => m.verified), [managers]);

  const myPublicManager = useMemo(() => {
    if (profile.verificationStatus !== 'verified') return null;
    return managers.find((m) => m.id === ME_MANAGER_ID) || null;
  }, [managers, profile.verificationStatus]);

  const isSubscribed = useCallback((id) => subscriptions.some((s) => s.managerId === id), [subscriptions]);

  const getMyRating = useCallback(
    (managerId) => ratings.find((r) => r.managerId === managerId && r.fromUserId === 'demo-user') || null,
    [ratings]
  );

  const value = useMemo(
    () => ({
      profile,
      subscriptions,
      ratings,
      managers,
      discoverManagers,
      myPublicManager,
      submitVerification,
      demoApproveVerification,
      demoRejectVerification,
      resetProfileDemo,
      updateMyPortfolio,
      updateMyProfileFields,
      subscribe,
      rateManager,
      isSubscribed,
      getMyRating
    }),
    [
      profile,
      subscriptions,
      ratings,
      managers,
      discoverManagers,
      myPublicManager,
      submitVerification,
      demoApproveVerification,
      demoRejectVerification,
      resetProfileDemo,
      updateMyPortfolio,
      updateMyProfileFields,
      subscribe,
      rateManager,
      isSubscribed,
      getMyRating
    ]
  );

  return <PeopleInvestContext.Provider value={value}>{children}</PeopleInvestContext.Provider>;
}

PeopleInvestProvider.propTypes = {
  children: PropTypes.node
};

export function usePeopleInvest() {
  const ctx = useContext(PeopleInvestContext);
  if (!ctx) throw new Error('usePeopleInvest must be used within PeopleInvestProvider');
  return ctx;
}
