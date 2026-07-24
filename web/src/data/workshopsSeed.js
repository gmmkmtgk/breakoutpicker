/** Build upcoming-ish dates so the demo always feels fresh. */
function addDays(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  d.setHours(10 + (days % 5), (days * 17) % 60, 0, 0);
  return d.toISOString();
}

let cachedDay = null;
let cachedList = null;

/** Recompute seed once per local calendar day so lists stay stable across re-renders. */
export function getSeedWorkshops(now = new Date()) {
  const day = now.toDateString();
  if (cachedList && cachedDay === day) return cachedList;
  cachedDay = day;
  cachedList = [
    {
      id: 'seed-nifty-oi-mumbai',
      title: 'Nifty & Bank Nifty: reading OI and max pain (hands-on)',
      organizer: 'Open Interest Study Circle',
      description:
        'Bring your laptop. We walk through NSE option chain snapshots, PCR context, and when NOT to over-read positioning. For education only — not trade tips.',
      startsAt: addDays(now, 4),
      durationMin: 150,
      mode: 'offline',
      city: 'Mumbai',
      venue: 'BKC area co-working (exact address after RSVP)',
      meetingUrl: '',
      priceINR: 499,
      capacity: 36,
      baseAttendees: 14,
      topics: ['F&O', 'Indices']
    },
    {
      id: 'seed-annual-report-blr',
      title: 'Annual report walkthrough — banks edition',
      organizer: 'Bangalore Value Readers',
      description:
        'Line-by-line on a large private bank’s last annual report: asset quality slides, provisioning, and how to sanity-check ROA.',
      startsAt: addDays(now, 9),
      durationMin: 180,
      mode: 'offline',
      city: 'Bengaluru',
      venue: 'Indiranagar community hall (TBC)',
      meetingUrl: '',
      priceINR: 0,
      capacity: 50,
      baseAttendees: 32,
      topics: ['Fundamental', 'Banking']
    },
    {
      id: 'seed-zoom-psych',
      title: 'Trading psychology open circle (online)',
      organizer: 'Calm Capital Collective',
      description:
        'Camera optional. Structured sharing: rules that broke last week, sleep, and leverage. Facilitated discussion — max 20 people so everyone gets airtime.',
      startsAt: addDays(now, 6),
      durationMin: 75,
      mode: 'online',
      city: 'India (online)',
      venue: '',
      meetingUrl: 'https://meet.google.com/lookup/stock-psych-demo',
      priceINR: 0,
      capacity: 20,
      baseAttendees: 11,
      topics: ['Psychology']
    },
    {
      id: 'seed-hybrid-algo',
      title: 'Python for market data — intro + live Q&A (hybrid)',
      organizer: 'Quant Sundays',
      description:
        'In-room in Hyderabad + Zoom bridge. pandas, free EOD sources, and one clean notebook you can fork. Assumes basic Python.',
      startsAt: addDays(now, 14),
      durationMin: 200,
      mode: 'hybrid',
      city: 'Hyderabad',
      venue: 'Hitech City workshop space',
      meetingUrl: 'https://zoom.us/j/stock-algo-demo',
      priceINR: 799,
      capacity: 45,
      baseAttendees: 19,
      topics: ['Algo', 'Python']
    },
    {
      id: 'seed-delhi-mf',
      title: 'Mutual funds vs direct equity — family finance night',
      organizer: 'Lajpat Nagar Investors Club',
      description:
        'Hindi-English mix. SIP mechanics, direct plans, when to add stocks, and common distributor conflicts of interest. Beginners welcome.',
      startsAt: addDays(now, 11),
      durationMin: 90,
      mode: 'offline',
      city: 'New Delhi',
      venue: 'Community centre near Lajpat Nagar',
      meetingUrl: '',
      priceINR: 150,
      capacity: 80,
      baseAttendees: 44,
      topics: ['Personal finance', 'Mutual funds']
    },
    {
      id: 'seed-chennai-price',
      title: 'Price action journaling club — bring one trade',
      organizer: 'Marina Swing Traders',
      description:
        'Round-robin: one chart each, what you planned vs did. No stock pitches — process only. Respect Chatham House rule.',
      startsAt: addDays(now, 5),
      durationMin: 120,
      mode: 'offline',
      city: 'Chennai',
      venue: 'Adyar library meeting room',
      meetingUrl: '',
      priceINR: 0,
      capacity: 24,
      baseAttendees: 9,
      topics: ['Technical', 'Journaling']
    },
    {
      id: 'seed-pune-rbi',
      title: 'RBI policy debrief for retail traders',
      organizer: 'Pune Macro Meet',
      description:
        'What changed in stance, how bond markets reacted, and what equity indices often do in the days after — with caveats.',
      startsAt: addDays(now, 18),
      durationMin: 60,
      mode: 'online',
      city: 'India (online)',
      venue: '',
      meetingUrl: 'https://meet.google.com/lookup/rbi-debrief-demo',
      priceINR: 199,
      capacity: 300,
      baseAttendees: 87,
      topics: ['Macro', 'RBI']
    }
  ];
  return cachedList;
}
