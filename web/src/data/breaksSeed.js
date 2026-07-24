import { EVALUATION_STATUS } from 'utils/breakEvaluation';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';

export function getSeedBreaks() {
  const now = Date.now();
  const day = 86400000;

  return [
    {
      id: 'seed-1',
      kind: 'general',
      symbol: 'RELIANCE',
      body: 'FII flows turning positive for large caps this week. Watching banks closely.',
      createdAt: new Date(now - 2 * day).toISOString(),
      author: {
        id: 'u1',
        name: 'Aditya K',
        handle: 'aditya_nifty',
        avatar: avatar1
      }
    },
    {
      id: 'seed-2',
      kind: 'special',
      symbol: 'TCS',
      body: 'Cup & handle breakout on weekly. Measured move aligns with ATH zone.',
      createdAt: new Date(now - 5 * day).toISOString(),
      chartImage: null,
      targetPrice: 3850,
      stopLoss: 3580,
      timeframe: '1M',
      evaluation: {
        status: EVALUATION_STATUS.TARGET_HIT,
        resolvedAt: new Date(now - 1 * day).toISOString()
      },
      author: {
        id: 'u2',
        name: 'Meera S',
        handle: 'meera_charts',
        avatar: avatar2
      }
    },
    {
      id: 'seed-3',
      kind: 'special',
      symbol: 'HDFCBANK',
      body: 'Flag continuation after earnings gap. Risk defined below gap low.',
      createdAt: new Date(now - 8 * day).toISOString(),
      chartImage: null,
      targetPrice: 1820,
      stopLoss: 1680,
      timeframe: '2W',
      evaluation: {
        status: EVALUATION_STATUS.STOP_HIT,
        resolvedAt: new Date(now - 3 * day).toISOString()
      },
      author: {
        id: 'u2',
        name: 'Meera S',
        handle: 'meera_charts',
        avatar: avatar2
      }
    },
    {
      id: 'seed-4',
      kind: 'general',
      symbol: 'NIFTY',
      body: 'Index breadth improving — advance decline line making higher highs.',
      createdAt: new Date(now - 12 * day).toISOString(),
      author: {
        id: 'u3',
        name: 'Rahul V',
        handle: 'rahul_index',
        avatar: avatar3
      }
    },
    {
      id: 'seed-5',
      kind: 'special',
      symbol: 'INFY',
      body: 'Range expansion after consolidation. IT showing relative strength vs Nifty.',
      createdAt: new Date(now - 1 * day).toISOString(),
      chartImage: null,
      targetPrice: 1520,
      stopLoss: 1450,
      timeframe: '1W',
      evaluation: {
        status: EVALUATION_STATUS.OPEN
      },
      author: {
        id: 'u3',
        name: 'Rahul V',
        handle: 'rahul_index',
        avatar: avatar3
      }
    }
  ];
}
