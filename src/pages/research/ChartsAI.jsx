import { useMemo, useState } from 'react';

import RobotOutlined from '@ant-design/icons/RobotOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i);
  return Math.abs(h) || 1;
}

/** @returns {{ data: {x:number,y:number[]}[], vols: number[] }} */
function generateCandles(symbol, n = 100) {
  let seed = hashStr(symbol.toUpperCase());
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return seed / 4294967296;
  };
  let p = 200 + (seed % 8000);
  const data = [];
  const vols = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i -= 1) {
    const chg = (rnd() - 0.485) * 0.028;
    const c = Math.round(p * (1 + chg) * 100) / 100;
    const spread = Math.abs(p * 0.015);
    const o = Math.round((p + (rnd() - 0.5) * spread * 0.25) * 100) / 100;
    const h = Math.round(Math.max(o, c, c + rnd() * spread) * 100) / 100;
    const l = Math.round(Math.min(o, c, c - rnd() * spread) * 100) / 100;
    const t = now - i * 86400000;
    data.push({ x: t, y: [o, h, l, c] });
    vols.push(Math.round((0.4 + rnd() * 1.2) * 1e6));
    p = c;
  }
  return { data, vols };
}

function closesFromCandles(candles) {
  return candles.map((d) => d.y[3]);
}

function smaSeries(candles, period) {
  const c = closesFromCandles(candles);
  const out = [];
  for (let i = 0; i < candles.length; i += 1) {
    if (i < period - 1) {
      out.push({ x: candles[i].x, y: null });
      continue;
    }
    let s = 0;
    for (let j = 0; j < period; j += 1) s += c[i - j];
    out.push({ x: candles[i].x, y: Math.round((s / period) * 100) / 100 });
  }
  return out;
}

function rsiSeries(candles, period = 14) {
  const c = closesFromCandles(candles);
  const out = [];
  for (let i = 0; i < candles.length; i += 1) {
    if (i < period) {
      out.push({ x: candles[i].x, y: null });
      continue;
    }
    let gains = 0;
    let losses = 0;
    for (let j = 0; j < period; j += 1) {
      const diff = c[i - j] - c[i - j - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }
    const ag = gains / period;
    const al = losses / period || 1e-9;
    const rs = ag / al;
    const rsi = 100 - 100 / (1 + rs);
    out.push({ x: candles[i].x, y: Math.round(rsi * 10) / 10 });
  }
  return out;
}

function lastDefined(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 1) if (arr[i].y != null) return arr[i].y;
  return null;
}

function buildAiNarrative(sym, lastClose, sma20, sma50, rsiVal, volUp) {
  const parts = [];
  parts.push(`**${sym}** — demo OHLC only (not exchange ticks).`);
  if (sma20 != null && sma50 != null) {
    if (lastClose > sma20 && lastClose > sma50) parts.push('Price sits **above** both SMA 20 and SMA 50 — a simple bullish stack on this synthetic path.');
    else if (lastClose < sma20 && lastClose < sma50) parts.push('Price is **below** both moving averages — bearish alignment on mock data.');
    else parts.push('Price is **between** the two SMAs — chop / transition zone in this illustration.');
  }
  if (rsiVal != null) {
    if (rsiVal >= 70) parts.push(`RSI(14) at **${rsiVal}** suggests overbought conditions on this series (not a trade signal).`);
    else if (rsiVal <= 30) parts.push(`RSI(14) at **${rsiVal}** reads oversold on the mock window.`);
    else parts.push(`RSI(14) near **${rsiVal}** — neutral momentum band for the demo window.`);
  }
  parts.push(volUp ? 'Volume **expanded** vs prior bars on average — interest rising in this toy series.' : 'Volume **contracted** vs prior bars — quieter tape in mock data.');
  parts.push('Connect **TradingView Lightweight Charts**, **ChartIQ**, or your broker chart + LLM for real AI commentary on live candles.');
  return parts;
}

export default function ChartsAI() {
  const theme = useTheme();
  const [input, setInput] = useState('RELIANCE');
  const [sym, setSym] = useState('RELIANCE');
  const [showSma20, setShowSma20] = useState(true);
  const [showSma50, setShowSma50] = useState(true);
  const [showVol, setShowVol] = useState(true);

  const { candles, vols, sma20, sma50, rsi, lastClose, lastRsi } = useMemo(() => {
    const { data, vols: v } = generateCandles(sym, 100);
    const s20 = smaSeries(data, 20);
    const s50 = smaSeries(data, 50);
    const r = rsiSeries(data, 14);
    const lc = data[data.length - 1].y[3];
    return { candles: data, vols: v, sma20: s20, sma50: s50, rsi: r, lastClose: lc, lastRsi: lastDefined(r) };
  }, [sym]);

  const volUp = useMemo(() => {
    const n = vols.length;
    if (n < 6) return true;
    const a = vols.slice(-5).reduce((s, x) => s + x, 0) / 5;
    const b = vols.slice(-10, -5).reduce((s, x) => s + x, 0) / 5;
    return a >= b;
  }, [vols]);

  const aiLines = useMemo(
    () => buildAiNarrative(sym, lastClose, lastDefined(sma20), lastDefined(sma50), lastRsi, volUp),
    [sym, lastClose, sma20, sma50, lastRsi, volUp]
  );

  const mainSeries = useMemo(() => {
    const s = [{ name: sym, type: 'candlestick', data: candles }];
    if (showSma20) s.push({ name: 'SMA 20', type: 'line', data: sma20.filter((p) => p.y != null) });
    if (showSma50) s.push({ name: 'SMA 50', type: 'line', data: sma50.filter((p) => p.y != null) });
    return s;
  }, [sym, candles, sma20, sma50, showSma20, showSma50]);

  const mainOpts = useMemo(
    () => ({
      chart: { height: 420, toolbar: { show: true }, zoom: { enabled: true }, animations: { enabled: false } },
      theme: { mode: theme.palette.mode },
      plotOptions: { candlestick: { colors: { upward: theme.palette.success.main, downward: theme.palette.error.main } } },
      xaxis: { type: 'datetime', labels: { style: { colors: theme.palette.text.secondary } } },
      yaxis: { tooltip: { enabled: true }, labels: { formatter: (v) => v?.toFixed?.(0) ?? v } },
      grid: { borderColor: theme.palette.divider },
      legend: { position: 'top', labels: { colors: theme.palette.text.secondary } },
      stroke: { width: mainSeries.map((_, i) => (i === 0 ? 1 : 2)) },
      tooltip: { shared: true, x: { format: 'dd MMM yyyy' } }
    }),
    [theme, mainSeries]
  );

  const volOpts = useMemo(
    () => ({
      chart: { type: 'bar', height: 120, toolbar: { show: false } },
      theme: { mode: theme.palette.mode },
      colors: [theme.palette.primary.main],
      plotOptions: { bar: { columnWidth: '65%' } },
      xaxis: { type: 'datetime', labels: { show: false } },
      yaxis: { show: false },
      grid: { show: false },
      dataLabels: { enabled: false },
      tooltip: { x: { format: 'dd MMM' } }
    }),
    [theme]
  );

  const rsiOpts = useMemo(
    () => ({
      chart: { height: 140, toolbar: { show: false } },
      theme: { mode: theme.palette.mode },
      stroke: { width: 2, curve: 'smooth' },
      colors: [theme.palette.info.main],
      xaxis: { type: 'datetime', labels: { show: false } },
      yaxis: { min: 0, max: 100, tickAmount: 5 },
      annotations: {
        yaxis: [
          { y: 70, borderColor: theme.palette.error.light, label: { text: '70' } },
          { y: 30, borderColor: theme.palette.success.light, label: { text: '30' } }
        ]
      },
      grid: { borderColor: theme.palette.divider }
    }),
    [theme]
  );

  const load = () => {
    const t = input.trim().toUpperCase();
    if (t) setSym(t);
  };

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Charts AI
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          TradingView-style flow: type a symbol, view <strong>candlesticks</strong> with <strong>SMA overlays</strong>, <strong>volume</strong>, and{' '}
          <strong>RSI</strong>. The side panel is a <strong>demo AI narrative</strong> — swap in your LLM on real OHLC later.
        </Typography>
      </Box>

      <Alert severity="warning" variant="outlined">
        Candles are <strong>synthetic</strong> (seeded from the symbol). Not market data. Do not trade off this screen.
      </Alert>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }} sx={{ mb: 2 }}>
              <TextField
                label="Symbol (NSE style)"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && load()}
                size="small"
                sx={{ minWidth: 220 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> }}
              />
              <Button variant="contained" onClick={load} sx={{ textTransform: 'none', fontWeight: 700 }}>
                Load chart
              </Button>
              <Chip label={`Showing ${sym}`} color="primary" variant="outlined" />
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
              <FormControlLabel control={<Switch checked={showSma20} onChange={(e) => setShowSma20(e.target.checked)} />} label="SMA 20" />
              <FormControlLabel control={<Switch checked={showSma50} onChange={(e) => setShowSma50(e.target.checked)} />} label="SMA 50" />
              <FormControlLabel control={<Switch checked={showVol} onChange={(e) => setShowVol(e.target.checked)} />} label="Volume" />
            </Stack>
            <ReactApexChart options={mainOpts} series={mainSeries} type="candlestick" height={420} />
            {showVol && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Volume (mock)
                </Typography>
                <ReactApexChart
                  options={volOpts}
                  series={[{ name: 'Vol', data: candles.map((d, i) => ({ x: d.x, y: vols[i] })) }]}
                  type="bar"
                  height={120}
                />
              </Box>
            )}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                RSI (14)
              </Typography>
              <ReactApexChart options={rsiOpts} series={[{ name: 'RSI', data: rsi.filter((p) => p.y != null) }]} type="line" height={140} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              height: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              borderColor: 'primary.light'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <RobotOutlined style={{ fontSize: 22, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={800}>
                AI assistant
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Rule-based summary for demo. Last close (mock): <strong>{lastClose?.toLocaleString?.('en-IN')}</strong>
            </Typography>
            <Stack spacing={1.5}>
              {aiLines.map((line, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ '& strong': { color: 'text.primary' } }}>
                  {line.split('**').map((chunk, j) => (j % 2 === 1 ? <strong key={j}>{chunk}</strong> : chunk))}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
