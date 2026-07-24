/**
 * Demo “correlated basket” presets: how to spread a large ticket across
 * anchor + suppliers + peers. Not advice; symbols/prices illustrative.
 */

function round2(n) {
  return Math.round(n * 100) / 100;
}

/** Flatten categories into rows with categoryId for tables. */
export function flattenPreset(preset) {
  const rows = [];
  for (const cat of preset.categories) {
    for (const s of cat.stocks) {
      rows.push({
        ...s,
        categoryId: cat.id,
        categoryLabel: cat.label
      });
    }
  }
  return rows;
}

export function computeCorrelatedAllocations(amountInr, rows) {
  if (!Number.isFinite(amountInr) || amountInr <= 0) {
    return rows.map((r) => ({ ...r, allocatedInr: 0, estUnits: 0 }));
  }
  return rows.map((r) => {
    const allocatedInr = round2((amountInr * r.weight) / 100);
    const estUnits = r.price > 0 ? round2(allocatedInr / r.price) : 0;
    return { ...r, allocatedInr, estUnits };
  });
}

const MARUTI_PRESET = {
  id: 'MARUTI',
  anchorSymbol: 'MARUTI',
  anchorName: 'Maruti Suzuki India Ltd',
  keywords: ['maruti', 'maruti suzuki', 'marutisuzuki', 'msil'],
  aiHeadline: 'Smarter than parking ₹1 crore only in Maruti',
  aiSummary:
    'A single-stock bet on Maruti ignores supply-chain diversification and sector cycles. This AI-style split keeps meaningful anchor exposure while adding glass, tyres, HVAC, wiring-harness suppliers that ride the same OEM volumes — plus listed competitors and two-wheeler adjacencies that hedge share-loss scenarios.',
  concentrationNote:
    'Instead of 100% in one ticker, you keep direct Maruti exposure in the ~28–35% range and let the rest capture the ecosystem and competitive set.',
  categories: [
    {
      id: 'anchor',
      label: 'Core anchor',
      description: 'Your primary thesis stock — sized down so the basket can breathe.',
      stocks: [
        {
          symbol: 'MARUTI',
          name: 'Maruti Suzuki India Ltd',
          weight: 28,
          role: 'Anchor OEM',
          price: 12450,
          rationale:
            'Largest listed pure-play on India passenger vehicles; keeps you aligned to your original idea without full concentration.'
        }
      ]
    },
    {
      id: 'suppliers',
      label: 'Suppliers & components',
      description: 'Names that sell into Maruti’s bill of materials — correlated demand, different risk drivers.',
      stocks: [
        {
          symbol: 'ASAHIINDIA',
          name: 'Asahi India Glass Ltd',
          weight: 8,
          role: 'Automotive glass',
          price: 612,
          rationale: 'Windscreen & glazing content per vehicle — volumes move with OEM production schedules.'
        },
        {
          symbol: 'CEATLTD',
          name: 'CEAT Ltd',
          weight: 7,
          role: 'Tyres',
          price: 3188,
          rationale: 'OEM + replacement tyre mix; benefits from Maruti’s dominant share on Indian roads.'
        },
        {
          symbol: 'SUBROS',
          name: 'Subros Ltd',
          weight: 8,
          role: 'Thermal / HVAC',
          price: 542,
          rationale: 'AC systems & heat exchangers — content per car rises with feature penetration.'
        },
        {
          symbol: 'MOTHERSON',
          name: 'Samvardhana Motherson',
          weight: 10,
          role: 'Wiring harness & modules',
          price: 102,
          rationale: 'Global wiring-harness footprint with strong India OEM exposure.'
        },
        {
          symbol: 'BOSCHLTD',
          name: 'Bosch Ltd',
          weight: 7,
          role: 'Fuel systems, sensors, mobility stack',
          price: 28500,
          rationale: 'Premium auto tech supplier; diversifies within the same value chain.'
        }
      ]
    },
    {
      id: 'peers',
      label: 'Competitors & adjacent OEMs',
      description: 'Listed alternatives if market share rotates — cars, SUVs, and two-wheelers as hedge.',
      stocks: [
        {
          symbol: 'TATAMOTORS',
          name: 'Tata Motors Ltd',
          weight: 12,
          role: 'PV + CV peer',
          price: 988,
          rationale: 'Direct competitor in mass PV; captures share shifts vs Maruti.'
        },
        {
          symbol: 'MM',
          name: 'Mahindra & Mahindra Ltd',
          weight: 9,
          role: 'SUV-led peer',
          price: 2988,
          rationale: 'Strong SUV mix — hedges if consumer preference tilts away from hatchbacks.'
        },
        {
          symbol: 'BAJAJ-AUTO',
          name: 'Bajaj Auto Ltd',
          weight: 6,
          role: 'Two-wheeler leader',
          price: 9428,
          rationale: 'Motorcycle demand as macro hedge; less direct PV correlation but same consumer wallet.'
        },
        {
          symbol: 'HEROMOTOCO',
          name: 'Hero MotoCorp Ltd',
          weight: 5,
          role: 'Two-wheeler mass market',
          price: 5624,
          rationale: 'Adds liquidity theme adjacent to personal mobility without doubling Maruti risk.'
        }
      ]
    }
  ]
};

const RELIANCE_PRESET = {
  id: 'RELIANCE',
  anchorSymbol: 'RELIANCE',
  anchorName: 'Reliance Industries Ltd',
  keywords: ['reliance', 'ril', 'jio', 'ambani'],
  aiHeadline: 'Beyond a single mega-cap: energy, retail, and digital in one ticket',
  aiSummary:
    'If you want ₹1 crore of “Reliance thesis” but fear event risk in one line, AI can fan exposure into O2C value chain, telecom adjacencies, and consumption plays that correlate with RIL’s ecosystem — without abandoning the anchor.',
  concentrationNote: 'Anchor weight is reduced so cyclicality in refining and capex cycles does not dominate every rupee.',
  categories: [
    {
      id: 'anchor',
      label: 'Core anchor',
      description: 'Direct RIL exposure for the core view.',
      stocks: [
        {
          symbol: 'RELIANCE',
          name: 'Reliance Industries Ltd',
          weight: 40,
          role: 'Conglomerate anchor',
          price: 1482,
          rationale: 'Energy, retail, digital — your headline bet stays meaningful but not all-in.'
        }
      ]
    },
    {
      id: 'chain',
      label: 'Energy & infra chain',
      description: 'Downstream / midstream names that correlate with throughput and India energy demand.',
      stocks: [
        {
          symbol: 'ONGC',
          name: 'Oil & Natural Gas Corp',
          weight: 12,
          role: 'Upstream',
          price: 252,
          rationale: 'Crude-linked cash flows as partial hedge to refining margins.'
        },
        {
          symbol: 'IOC',
          name: 'Indian Oil Corp',
          weight: 10,
          role: 'Refining & marketing',
          price: 168,
          rationale: 'Downstream peer sensitivity to product cracks.'
        },
        {
          symbol: 'PETRONET',
          name: 'Petronet LNG Ltd',
          weight: 10,
          role: 'Gas infrastructure',
          price: 298,
          rationale: 'Gasification theme adjacent to RIL’s new energy bets.'
        }
      ]
    },
    {
      id: 'digital_retail',
      label: 'Digital & consumption adjacency',
      description: 'Plays that benefit when discretionary spend and data usage stay strong.',
      stocks: [
        {
          symbol: 'TITAN',
          name: 'Titan Company Ltd',
          weight: 10,
          role: 'Retail / lifestyle',
          price: 3688,
          rationale: 'Premium consumption basket often owned alongside RIL in large India portfolios.'
        },
        {
          symbol: 'DMART',
          name: 'Avenue Supermarts',
          weight: 8,
          role: 'Organised retail',
          price: 4128,
          rationale: 'Retail throughput theme; diversifies away from pure commodity cyclicality.'
        },
        {
          symbol: 'BHARTIARTL',
          name: 'Bharti Airtel Ltd',
          weight: 10,
          role: 'Telecom peer',
          price: 1788,
          rationale: 'Jio vs Airtel duopoly — hedges share of wallet within connectivity.'
        }
      ]
    }
  ]
};

const PRESETS = [MARUTI_PRESET, RELIANCE_PRESET];

/**
 * @param {string} raw user input
 * @returns {typeof MARUTI_PRESET | null}
 */
export function findCorrelatedPreset(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const q = raw.trim().toUpperCase().replace(/\s+/g, '');
  const qLower = raw.trim().toLowerCase();

  for (const p of PRESETS) {
    if (p.anchorSymbol === q || p.id === q) return p;
    if (p.keywords.some((k) => qLower.includes(k) || q.includes(k.toUpperCase().replace(/\s/g, '')))) return p;
  }
  return null;
}

export function listPresetHints() {
  return PRESETS.map((p) => ({ symbol: p.anchorSymbol, name: p.anchorName }));
}
