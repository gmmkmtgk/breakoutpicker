import { useCallback, useEffect, useMemo, useState } from 'react';

import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';

const LS_KEY = 'momentum_stocks_settings_v1';

const TIMEFRAMES = [
  { key: 'w1', label: '1 week', short: '1W' },
  { key: 'w2', label: '2 weeks', short: '2W' },
  { key: 'm1', label: '1 month', short: '1M' },
  { key: 'm3', label: '3 months', short: '3M' },
  { key: 'm6', label: '6 months', short: '6M' },
  { key: 'y1', label: '1 year', short: '1Y' }
];

const DEFAULT_WEIGHTS = {
  w1: 10,
  w2: 10,
  m1: 20,
  m3: 20,
  m6: 20,
  y1: 20
};

const CAP_MARKS = [
  { value: 500, label: '500' },
  { value: 5000, label: '5k' },
  { value: 50000, label: '50k' },
  { value: 200000, label: '2L' }
];

function loadSettings() {
  if (typeof window === 'undefined') return null;
  try {
    const r = window.localStorage.getItem(LS_KEY);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}

function saveSettings(data) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function sumWeights(w) {
  return TIMEFRAMES.reduce((s, t) => s + (Number(w[t.key]) || 0), 0);
}

function normalizeWeights(w) {
  const total = sumWeights(w);
  if (total <= 0) return { ...DEFAULT_WEIGHTS };
  const f = 100 / total;
  const next = {};
  TIMEFRAMES.forEach((t) => {
    next[t.key] = Math.round((Number(w[t.key]) || 0) * f * 10) / 10;
  });
  const drift = 100 - sumWeights(next);
  const lastKey = TIMEFRAMES[TIMEFRAMES.length - 1].key;
  if (Math.abs(drift) > 0.01) next[lastKey] = Math.round((Number(next[lastKey]) + drift) * 10) / 10;
  return next;
}

export default function StocksMomentum() {
  const stored = loadSettings();
  const [weights, setWeights] = useState(stored?.weights || DEFAULT_WEIGHTS);
  const [capRange, setCapRange] = useState(stored?.capRange || [2000, 80000]);

  useEffect(() => {
    saveSettings({ weights, capRange });
  }, [weights, capRange]);

  const totalW = useMemo(() => sumWeights(weights), [weights]);

  const setWeight = useCallback((key, raw) => {
    const v = raw === '' ? '' : Math.max(0, Math.min(100, Number(raw)));
    setWeights((prev) => ({ ...prev, [key]: v === '' ? '' : v }));
  }, []);

  const applyEqual = () => {
    const n = TIMEFRAMES.length;
    const base = Math.round((100 / n) * 10) / 10;
    const o = {};
    let used = 0;
    TIMEFRAMES.forEach((t, i) => {
      if (i === n - 1) o[t.key] = Math.round((100 - used) * 10) / 10;
      else {
        o[t.key] = base;
        used += base;
      }
    });
    setWeights(o);
  };

  const applyNormalize = () => {
    setWeights((w) => normalizeWeights(w));
  };

  const resetDefaults = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
    setCapRange([2000, 80000]);
  };

  const applyCapPreset = (min, max) => setCapRange([min, max]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Momentum Stocks
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 880 }}>
          Blend <strong>momentum signals across horizons</strong> by assigning weights to 1W through 1Y returns. Then narrow the universe
          with a <strong>market cap band</strong> (₹ Cr). This screen is a <strong>configuration demo</strong> — connect your factor engine
          and exchange data for live screens.
        </Typography>
      </Box>

      <Alert severity="info" variant="outlined" icon={<InfoCircleOutlined />}>
        Weights are used to build a <strong>composite momentum score</strong> (higher weight = more influence from that lookback). Set them
        to reflect how much you trust short-term vs long-term persistence.
      </Alert>

      <MainCard
        title="Timeframe weights (%)"
        secondary={<Chip label={`Total: ${totalW}%`} color={totalW === 100 ? 'success' : 'warning'} size="small" />}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Each row is the weight for that horizon in the blended score. Typical setups favour longer windows (e.g. 3M–1Y) and use short
          windows as a tie-breaker.
        </Typography>
        <Grid container spacing={2}>
          {TIMEFRAMES.map((tf) => (
            <Grid item xs={12} sm={6} md={4} key={tf.key}>
              <Stack spacing={0.75}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                  <Typography fontWeight={700}>
                    {tf.label}{' '}
                    <Typography component="span" variant="caption" color="text.secondary">
                      ({tf.short})
                    </Typography>
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                    {weights[tf.key]}%
                  </Typography>
                </Stack>
                <Slider
                  value={Number(weights[tf.key]) || 0}
                  onChange={(_, v) => setWeights((prev) => ({ ...prev, [tf.key]: v }))}
                  min={0}
                  max={100}
                  step={0.5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Exact %"
                  value={weights[tf.key] === '' ? '' : weights[tf.key]}
                  onChange={(e) => setWeight(tf.key, e.target.value)}
                  inputProps={{ min: 0, max: 100, step: 0.5 }}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={applyEqual} sx={{ textTransform: 'none' }}>
            Equal weights (~{Math.round(100 / TIMEFRAMES.length)}% each)
          </Button>
          <Button variant="outlined" onClick={applyNormalize} sx={{ textTransform: 'none' }}>
            Normalize to 100%
          </Button>
          <Button color="secondary" onClick={resetDefaults} sx={{ textTransform: 'none' }}>
            Reset defaults
          </Button>
        </Stack>
        {totalW !== 100 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Total is <strong>{totalW}%</strong>. Use &quot;Normalize to 100%&quot; so downstream momentum scores stay comparable, or keep a
            custom scale if your engine supports it.
          </Alert>
        )}
      </MainCard>

      <MainCard title="Market cap range (₹ Crore)">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Full market cap of the company in Indian rupees (₹ Cr). Drag both ends to set the band; presets below jump to common liquidity
          tiers.
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Min: <strong>{capRange[0].toLocaleString('en-IN')}</strong> Cr · Max: <strong>{capRange[1].toLocaleString('en-IN')}</strong> Cr
        </Typography>
        <Slider
          value={capRange}
          onChange={(_, v) => setCapRange(v)}
          valueLabelDisplay="auto"
          min={100}
          max={300000}
          step={100}
          disableSwap
          marks={CAP_MARKS}
          valueLabelFormat={(v) => `${v.toLocaleString('en-IN')} Cr`}
        />
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
          <Chip label="Small cap band (500–5k Cr)" onClick={() => applyCapPreset(500, 5000)} clickable variant="outlined" />
          <Chip label="Mid cap (5k–50k Cr)" onClick={() => applyCapPreset(5000, 50000)} clickable variant="outlined" />
          <Chip label="Large+ (20k–2L Cr)" onClick={() => applyCapPreset(20000, 200000)} clickable variant="outlined" />
          <Chip label="Mega only (50k+ Cr)" onClick={() => applyCapPreset(50000, 300000)} clickable variant="outlined" />
        </Stack>
      </MainCard>

      <MainCard title="Summary">
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Blend:</strong> {TIMEFRAMES.map((t) => `${t.short} ${weights[t.key]}%`).join(' · ')}
          </Typography>
          <Typography variant="body2">
            <strong>Cap filter:</strong> ₹{capRange[0].toLocaleString('en-IN')} Cr – ₹{capRange[1].toLocaleString('en-IN')} Cr
          </Typography>
        </Stack>
      </MainCard>
    </Stack>
  );
}
