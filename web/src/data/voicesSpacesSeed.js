function addHours(base, h) {
  const d = new Date(base);
  d.setHours(d.getHours() + h);
  return d.toISOString();
}

function addDays(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

let cachedDay = null;
let cachedList = null;

export function getSeedSpaces(now = new Date()) {
  const day = now.toDateString();
  if (cachedList && cachedDay === day) return cachedList;
  cachedDay = day;

  const t0 = now.getTime();
  cachedList = [
    {
      id: 'seed-live-nifty',
      title: 'Nifty open: levels & positioning — no tips, just structure',
      description: 'Host walks through pre-market global cues and key Nifty zones. Not investment advice.',
      host: { name: 'Riya K', handle: '@riya_levels' },
      speakers: ['Riya K', 'Guest: macro desk (voice only)'],
      status: 'live',
      startedAt: addHours(now, -0.4),
      scheduledFor: null,
      endedAt: null,
      topics: ['Indices', 'Opening bell'],
      baseListeners: 428
    },
    {
      id: 'seed-live-ipo',
      title: 'IPO chatter: how to read RHP sections fast',
      description: 'Community Q&A on offer documents — bring questions in chat when we ship that.',
      host: { name: 'Arjun M', handle: '@ipo_arjun' },
      speakers: ['Arjun M', 'Priya S'],
      status: 'live',
      startedAt: addHours(now, -0.15),
      scheduledFor: null,
      endedAt: null,
      topics: ['IPO', 'RHP'],
      baseListeners: 186
    },
    {
      id: 'seed-up-rbi',
      title: 'After RBI: bond yields vs equities (India context)',
      host: { name: 'Neha V', handle: '@neha_macro' },
      speakers: ['Neha V'],
      status: 'scheduled',
      startedAt: null,
      scheduledFor: addHours(now, 5),
      endedAt: null,
      topics: ['RBI', 'Macro'],
      baseListeners: 0
    },
    {
      id: 'seed-up-options',
      title: 'Bank Nifty weekly expiry debrief',
      host: { name: 'Karan T', handle: '@risk_karan' },
      speakers: ['Karan T', 'Co-host TBD'],
      status: 'scheduled',
      startedAt: null,
      scheduledFor: addDays(now, 1),
      endedAt: null,
      topics: ['F&O', 'Bank Nifty'],
      baseListeners: 0
    },
    {
      id: 'seed-up-mf',
      title: 'Direct plans vs regular — honest conversation',
      host: { name: 'Sana P', handle: '@sana_personal' },
      speakers: ['Sana P'],
      status: 'scheduled',
      startedAt: null,
      scheduledFor: addDays(now, 2),
      endedAt: null,
      topics: ['Mutual funds', 'Fees'],
      baseListeners: 0
    },
    {
      id: 'seed-end-psych',
      title: 'Trading psychology office hours',
      host: { name: 'Omar S', handle: '@calm_omar' },
      speakers: ['Omar S', 'Listener Q round'],
      status: 'ended',
      startedAt: addDays(now, -2),
      scheduledFor: null,
      endedAt: null,
      topics: ['Psychology'],
      baseListeners: 612
    },
    {
      id: 'seed-end-smallcap',
      title: 'Smallcap liquidity: what changed this week?',
      host: { name: 'Dev I', handle: '@dev_flows' },
      speakers: ['Dev I'],
      status: 'ended',
      startedAt: addDays(now, -4),
      scheduledFor: null,
      endedAt: addHours(new Date(addDays(now, -4)), 1),
      topics: ['Smallcaps', 'Liquidity'],
      baseListeners: 341
    }
  ];

  // Fix endedAt for psych - use explicit
  cachedList[5].endedAt = addHours(new Date(cachedList[5].startedAt), 1.25);
  cachedList[6].endedAt = addHours(new Date(cachedList[6].startedAt), 1);

  return cachedList;
}
