import { useMemo, useState } from 'react';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';

const PRESETS = {
  nifty: { label: 'NIFTY 50', spot: 24156, step: 50 },
  banknifty: { label: 'BANK NIFTY', spot: 52480, step: 100 },
  finnifty: { label: 'FINNIFTY', spot: 21340, step: 50 },
  midcpnifty: { label: 'MIDCP NIFTY', spot: 11285, step: 25 }
};

function buildMock(id) {
  const p = PRESETS[id] || PRESETS.nifty;
  const n = 28;
  const cats = [];
  const spot = [];
  const fut = [];
  const ce = [];
  const pe = [];
  for (let i = 0; i < n; i += 1) {
    cats.push(`D${i - n + 1}`);
    const s = p.spot * (1 + Math.sin(i * 0.25) * 0.006);
    spot.push(Math.round(s * 100) / 100);
    fut.push(Math.round(s * 1.0022 * 100) / 100);
    ce.push(Math.round((10 + (i % 7)) * 10) / 10);
    pe.push(Math.round((11 + ((i + 3) % 6)) * 10) / 10);
  }
  const base = Math.round(p.spot / p.step) * p.step;
  const strikes = [];
  for (let k = -9; k <= 9; k += 1) {
    const strike = base + k * p.step;
    const dist = Math.abs(strike - p.spot);
    const o = Math.max(40, 720 - dist * 0.9);
    const ceOi = Math.round(o * 0.9);
    const peOi = Math.round(o * 0.95);
    strikes.push({ strike, ceOi, peOi, ceChg: Math.round((k % 5) * o * 0.02), peChg: Math.round(((k + 2) % 4) * o * 0.015) });
  }
  const maxPain = strikes.reduce((a, r) => (r.ceOi + r.peOi > a.sum ? { strike: r.strike, sum: r.ceOi + r.peOi } : a), {
    strike: strikes[0].strike,
    sum: 0
  }).strike;
  return {
    ...p,
    futSpot: Math.round(p.spot * 1.0022 * 100) / 100,
    prem: Math.round((p.spot * 1.0022 - p.spot) * 100) / 100,
    pcr: 1.12,
    pcrChg: 0.03,
    ceCr: 145,
    peCr: 158,
    ceChgPct: 1.1,
    peChgPct: -0.4,
    maxPain,
    atmIv: 13.2,
    ivRank: 62,
    rollPct: 76,
    cats,
    spot,
    fut,
    ce,
    pe,
    strikes
  };
}

function Stat({ label, value, sub, color }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
      <Typography variant="caption" color="text.secondary" fontWeight={700}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: color || 'text.primary' }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" color="text.secondary">
          {sub}
        </Typography>
      )}
    </Paper>
  );
}

export default function FAndOMax() {
  const theme = useTheme();
  const [uid, setUid] = useState('nifty');
  const d = useMemo(() => buildMock(uid), [uid]);
  const lineOpts = useMemo(
    () => ({
      chart: { type: 'line', height: 320, toolbar: { show: true }, zoom: { enabled: true } },
      stroke: { width: [2, 2], curve: 'smooth' },
      dataLabels: { enabled: false },
      colors: [theme.palette.primary.main, theme.palette.warning.main],
      xaxis: { categories: d.cats, labels: { rotate: -45 } },
      grid: { borderColor: theme.palette.divider },
      legend: { position: 'top' },
      tooltip: { shared: true }
    }),
    [d.cats, theme]
  );
  const barOpts = useMemo(
    () => ({
      chart: { type: 'bar', height: 300, toolbar: { show: false } },
      plotOptions: { bar: { columnWidth: '55%', borderRadius: 2 } },
      colors: [theme.palette.success.main, theme.palette.error.main],
      xaxis: { categories: d.cats, labels: { rotate: -45 } },
      grid: { borderColor: theme.palette.divider },
      legend: { position: 'top' }
    }),
    [d.cats, theme]
  );
  const maxCe = Math.max(...d.strikes.map((r) => r.ceOi), 1);
  const maxPe = Math.max(...d.strikes.map((r) => r.peOi), 1);
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          F&amp;O Max
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 900 }}>
          MyFNO-style: underlying, price vs future, call/put OI bars, PCR, max pain, strike heat table. Demo data only.
        </Typography>
      </Box>
      <Alert severity="info" icon={<InfoCircleOutlined />} variant="outlined">
        Mock OI/PCR — connect NSE option chain feeds for production.
      </Alert>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <TextField select label="Underlying" size="small" value={uid} onChange={(e) => setUid(e.target.value)} sx={{ minWidth: 220 }}>
          {Object.entries(PRESETS).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v.label}
            </MenuItem>
          ))}
        </TextField>
        <Chip label={`Spot ${d.spot.toLocaleString('en-IN')}`} color="primary" />
        <Chip label={`Fut ${d.futSpot.toLocaleString('en-IN')} (+${d.prem})`} variant="outlined" />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="PCR" value={d.pcr.toFixed(2)} sub={`Day ${d.pcrChg >= 0 ? '+' : ''}${d.pcrChg.toFixed(2)}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="Call OI" value={`${d.ceCr} L Cr`} sub={`${d.ceChgPct >= 0 ? '+' : ''}${d.ceChgPct}%`} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="Put OI" value={`${d.peCr} L Cr`} sub={`${d.peChgPct >= 0 ? '+' : ''}${d.peChgPct}%`} color="error.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="Max pain" value={String(d.maxPain)} sub="Demo strike" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="ATM IV" value={`${d.atmIv}%`} sub={`IV rank ~${d.ivRank}%`} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stat label="Rollover" value={`${d.rollPct}%`} sub="Mock" />
        </Grid>
      </Grid>
      <MainCard title="Spot vs future (demo)">
        <ReactApexChart
          options={lineOpts}
          series={[
            { name: 'Spot', data: d.spot },
            { name: 'Future', data: d.fut }
          ]}
          type="line"
          height={320}
        />
      </MainCard>
      <MainCard title="OI build-up CE vs PE (demo)">
        <ReactApexChart
          options={barOpts}
          series={[
            { name: 'Call OI', data: d.ce },
            { name: 'Put OI', data: d.pe }
          ]}
          type="bar"
          height={300}
        />
      </MainCard>
      <MainCard title="Strike OI heatmap">
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, maxHeight: 420 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Strike</TableCell>
                <TableCell align="right">Call OI</TableCell>
                <TableCell align="right">CE OI chg</TableCell>
                <TableCell align="right">Put OI</TableCell>
                <TableCell align="right">PE OI chg</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {d.strikes.map((r) => (
                <TableRow key={r.strike} selected={r.strike === d.maxPain}>
                  <TableCell>
                    <Typography fontWeight={700}>{r.strike}</Typography>
                    {r.strike === d.maxPain && <Chip size="small" label="Max pain" sx={{ ml: 1 }} color="warning" variant="outlined" />}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ bgcolor: alpha(theme.palette.success.main, 0.08 + (r.ceOi / maxCe) * 0.5), fontWeight: 700 }}
                  >
                    {r.ceOi}
                  </TableCell>
                  <TableCell align="right" sx={{ color: r.ceChg >= 0 ? 'success.main' : 'error.main' }}>
                    {r.ceChg >= 0 ? '+' : ''}
                    {r.ceChg}
                  </TableCell>
                  <TableCell align="right" sx={{ bgcolor: alpha(theme.palette.error.main, 0.08 + (r.peOi / maxPe) * 0.5), fontWeight: 700 }}>
                    {r.peOi}
                  </TableCell>
                  <TableCell align="right" sx={{ color: r.peChg >= 0 ? 'success.main' : 'error.main' }}>
                    {r.peChg >= 0 ? '+' : ''}
                    {r.peChg}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Stack>
  );
}
