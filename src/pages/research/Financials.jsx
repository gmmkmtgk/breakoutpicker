import { useMemo, useState } from 'react';

import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import MainCard from 'components/MainCard';

const KNOWN_NAMES = {
  RELIANCE: 'Reliance Industries Ltd',
  TCS: 'Tata Consultancy Services Ltd',
  INFY: 'Infosys Ltd',
  HDFCBANK: 'HDFC Bank Ltd',
  ICICIBANK: 'ICICI Bank Ltd',
  SBIN: 'State Bank of India',
  BHARTIARTL: 'Bharti Airtel Ltd',
  ITC: 'ITC Ltd',
  LT: 'Larsen & Toubro Ltd',
  KOTAKBANK: 'Kotak Mahindra Bank Ltd',
  AXISBANK: 'Axis Bank Ltd',
  ASIANPAINT: 'Asian Paints Ltd',
  MARUTI: 'Maruti Suzuki India Ltd',
  TITAN: 'Titan Company Ltd',
  SUNPHARMA: 'Sun Pharmaceutical Industries Ltd',
  ULTRACEMCO: 'UltraTech Cement Ltd',
  NESTLEIND: 'Nestlé India Ltd',
  POWERGRID: 'Power Grid Corporation of India Ltd',
  NTPC: 'NTPC Ltd',
  ONGC: 'Oil & Natural Gas Corporation Ltd',
  WIPRO: 'Wipro Ltd',
  HCLTECH: 'HCL Technologies Ltd',
  TECHM: 'Tech Mahindra Ltd'
};

const SECTORS = [
  'Oil & Gas',
  'IT — Software',
  'Financial Services',
  'FMCG',
  'Automobiles',
  'Pharmaceuticals',
  'Capital Goods',
  'Telecom',
  'Power',
  'Metals',
  'Consumer Durables',
  'Realty',
  'Chemicals'
];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i);
  return Math.abs(h) || 1;
}

function prng(seed) {
  let x = seed >>> 0;
  return () => {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

function fyColumnLabels(count = 5) {
  const d = new Date();
  let endY = d.getFullYear();
  if (d.getMonth() < 3) endY -= 1;
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const y = endY - i;
    out.push(`Mar ${String(y % 100).padStart(2, '0')}`);
  }
  return out;
}

function fmtCr(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return `₹ ${n.toLocaleString('en-IN')} Cr`;
}

function fmtPct(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return `${n.toFixed(2)}%`;
}

function fmtNum(n, d = 2) {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
}

function displayName(symbol) {
  const u = symbol.trim().toUpperCase();
  if (KNOWN_NAMES[u]) return KNOWN_NAMES[u];
  if (!u) return '—';
  return `${u} Ltd`;
}

/**
 * Deterministic mock financials from symbol (screener-style layout; not exchange filings).
 * @param {string} symbol
 * @param {'consolidated'|'standalone'} view
 */
function buildFinancialModel(symbol, view) {
  const sym = symbol.trim().toUpperCase() || 'STOCK';
  const seed = hashStr(`${sym}|${view}`);
  const rnd = prng(seed);
  const mult = view === 'consolidated' ? 1.06 + rnd() * 0.06 : 1;

  const sector = SECTORS[seed % SECTORS.length];
  const years = fyColumnLabels(5);

  const rev0 = Math.round((180 + (seed % 4200)) * mult);
  const revenue = [];
  for (let i = 0; i < 5; i += 1) {
    const back = Math.pow(0.94 + rnd() * 0.02, i);
    revenue.push(Math.round(rev0 * back));
  }

  const ebitdaMargin = 0.14 + rnd() * 0.12;
  const patMargin = 0.08 + rnd() * 0.07;

  const ebitda = revenue.map((r) => Math.round(r * ebitdaMargin * (0.97 + rnd() * 0.06)));
  const pat = revenue.map((r) => Math.round(r * patMargin * (0.95 + rnd() * 0.08)));
  const pbt = pat.map((p) => Math.round(p * (1.18 + rnd() * 0.08)));
  const eps = pat.map((p) => Math.round((p / (12 + (seed % 80))) * 100) / 100);

  const borrowings = revenue.map((r) => Math.round(r * (0.12 + rnd() * 0.22) * (0.9 + rnd() * 0.2)));
  const reserves = revenue.map((r) => Math.round(r * (0.55 + rnd() * 0.35)));
  const equityCap = Math.round(50 + rnd() * 400);
  const totalEq = reserves.map((res, i) => res + equityCap + Math.round(revenue[i] * 0.02));

  const fixedAssets = revenue.map((r) => Math.round(r * (0.35 + rnd() * 0.25)));
  const investments = revenue.map((r) => Math.round(r * (0.08 + rnd() * 0.2)));
  const cwip = revenue.map((r) => Math.round(r * (0.02 + rnd() * 0.06)));
  const otherAssets = revenue.map((r) => Math.round(r * (0.25 + rnd() * 0.2)));
  const totalAssets = revenue.map((_, i) =>
    fixedAssets[i] + cwip[i] + investments[i] + otherAssets[i] + Math.round(revenue[i] * 0.15)
  );

  const cfo = pat.map((p) => Math.round(p * (1.05 + rnd() * 0.35)));
  const cfi = revenue.map((r) => Math.round(-r * (0.08 + rnd() * 0.12)));
  const cff = revenue.map((r) => Math.round(-r * (0.04 + rnd() * 0.08)));

  const roce = revenue.map((r, i) => {
    const cap = totalEq[i] + borrowings[i];
    return cap > 0 ? (100 * ebitda[i]) / cap : 0;
  });
  const roe = totalEq.map((eq, i) => (eq > 0 ? (100 * pat[i]) / eq : 0));

  const marketCapCr = Math.round(rev0 * (4 + rnd() * 8));
  const pe = 18 + rnd() * 24;
  const pb = 2 + rnd() * 5;
  const debtEq = borrowings[0] / Math.max(1, totalEq[0]);
  const promoter = 45 + rnd() * 45;
  const pledged = rnd() > 0.75 ? Math.round(rnd() * 12 * 10) / 10 : 0;
  const divYield = rnd() * 2.5;
  const interestCov = 3 + rnd() * 12;
  const faceValue = rnd() > 0.5 ? 10 : 2;
  const cmp = Math.round(200 + rnd() * 3800 + (seed % 200));

  return {
    sym,
    name: displayName(sym),
    sector,
    years,
    revenue,
    ebitda,
    pbt,
    pat,
    eps,
    borrowings,
    reserves,
    equityCap,
    totalEq,
    fixedAssets,
    cwip,
    investments,
    otherAssets,
    totalAssets,
    cfo,
    cfi,
    cff,
    roce,
    roe,
    marketCapCr,
    pe,
    pb,
    debtEq,
    promoter,
    pledged,
    divYield,
    interestCov,
    faceValue,
    cmp,
    opm: revenue.map((r, i) => (r > 0 ? (100 * ebitda[i]) / r : 0)),
    npm: revenue.map((r, i) => (r > 0 ? (100 * pat[i]) / r : 0))
  };
}

function MetricCard({ label, value, sub }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.3 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
        {value}
      </Typography>
      {sub ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {sub}
        </Typography>
      ) : null}
    </Paper>
  );
}

function FinTable({ years, rows }) {
  const theme = useTheme();
  return (
    <TableContainer sx={{ maxWidth: '100%', border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                minWidth: 200,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                borderRight: 1,
                borderColor: 'divider'
              }}
            >
              Metric
            </TableCell>
            {years.map((y) => (
              <TableCell key={y} align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap', bgcolor: alpha(theme.palette.primary.main, 0.06) }}>
                {y}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label} hover sx={row.emphasis ? { bgcolor: alpha(theme.palette.primary.main, 0.04) } : undefined}>
              <TableCell sx={{ fontWeight: row.emphasis ? 700 : 500, borderRight: 1, borderColor: 'divider' }}>{row.label}</TableCell>
              {row.cells.map((c, i) => (
                <TableCell key={i} align="right">
                  {c}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Financials() {
  const [input, setInput] = useState('RELIANCE');
  const [sym, setSym] = useState('RELIANCE');
  const [view, setView] = useState('consolidated');
  const [tab, setTab] = useState(0);

  const m = useMemo(() => buildFinancialModel(sym, view), [sym, view]);

  const pnlRows = useMemo(
    () => [
      { label: 'Sales +', cells: m.revenue.map((v) => fmtCr(v)) },
      { label: 'Expenses −', cells: m.revenue.map((r, i) => fmtCr(Math.round(r - m.ebitda[i]))) },
      { label: 'Operating profit', cells: m.ebitda.map((v) => fmtCr(v)), emphasis: true },
      { label: 'OPM %', cells: m.opm.map((v) => fmtPct(v)) },
      { label: 'Other income +', cells: m.revenue.map((r) => fmtCr(Math.round(r * 0.012))) },
      { label: 'Finance cost −', cells: m.revenue.map((r) => fmtCr(Math.round(r * 0.02))) },
      { label: 'PBT', cells: m.pbt.map((v) => fmtCr(v)) },
      { label: 'Tax %', cells: m.pbt.map((p, i) => fmtPct(p > 0 ? (100 * (p - m.pat[i])) / p : 0)) },
      { label: 'PAT', cells: m.pat.map((v) => fmtCr(v)), emphasis: true },
      { label: 'NPM %', cells: m.npm.map((v) => fmtPct(v)) },
      { label: 'EPS in Rs', cells: m.eps.map((v) => fmtNum(v, 2)) }
    ],
    [m]
  );

  const bsRows = useMemo(() => {
    const otherLiab = m.totalAssets.map((a, i) => Math.max(0, Math.round(a - m.totalEq[i] - m.borrowings[i])));
    return [
      { label: 'Equity capital', cells: Array(5).fill(fmtCr(m.equityCap)) },
      { label: 'Reserves', cells: m.reserves.map((v) => fmtCr(v)) },
      { label: 'Borrowings +', cells: m.borrowings.map((v) => fmtCr(v)) },
      { label: 'Other liabilities +', cells: otherLiab.map((v) => fmtCr(v)) },
      { label: 'Total liabilities + equity', cells: m.totalAssets.map((a) => fmtCr(a)), emphasis: true },
      { label: 'Fixed assets +', cells: m.fixedAssets.map((v) => fmtCr(v)) },
      { label: 'CWIP +', cells: m.cwip.map((v) => fmtCr(v)) },
      { label: 'Investments +', cells: m.investments.map((v) => fmtCr(v)) },
      { label: 'Other assets +', cells: m.otherAssets.map((v) => fmtCr(v)) },
      { label: 'Total assets', cells: m.totalAssets.map((v) => fmtCr(v)), emphasis: true }
    ];
  }, [m]);

  const cfRows = useMemo(
    () => [
      { label: 'Cash from operating activity +', cells: m.cfo.map((v) => fmtCr(v)) },
      { label: 'Cash from investing activity +', cells: m.cfi.map((v) => fmtCr(v)) },
      { label: 'Cash from financing activity +', cells: m.cff.map((v) => fmtCr(v)) },
      { label: 'Net cash flow', cells: m.cfo.map((v, i) => fmtCr(v + m.cfi[i] + m.cff[i])), emphasis: true }
    ],
    [m]
  );

  const ratioRows = useMemo(
    () => [
      { label: 'Debt / Equity', cells: m.totalEq.map((eq, i) => fmtNum(eq > 0 ? m.borrowings[i] / eq : 0, 2) + 'x') },
      { label: 'ROCE %', cells: m.roce.map((v) => fmtPct(v)) },
      { label: 'ROE %', cells: m.roe.map((v) => fmtPct(v)) },
      { label: 'Interest coverage', cells: m.revenue.map((r) => fmtNum(m.interestCov + (r % 7) * 0.1, 1) + 'x') },
      { label: 'Asset turnover', cells: m.totalAssets.map((a, i) => (a > 0 ? fmtNum(m.revenue[i] / a, 2) + 'x' : '—')) },
      { label: 'Inventory days', cells: m.revenue.map((r) => String(40 + (r % 55)) + ' days') },
      { label: 'Payable days', cells: m.revenue.map((r) => String(35 + (r % 40)) + ' days') },
      { label: 'Receivable days', cells: m.revenue.map((r) => String(28 + (r % 35)) + ' days') }
    ],
    [m]
  );

  const shareRows = useMemo(() => {
    const fii = Math.round((100 - m.promoter - 12 - (hashStr(sym) % 8)) * 10) / 10;
    const dii = Math.round((12 + (hashStr(sym) % 6)) * 10) / 10;
    const publicPct = Math.max(0, Math.round((100 - m.promoter - fii - dii) * 10) / 10);
    return [
      { label: 'Promoters', cells: Array(5).fill(fmtPct(m.promoter)) },
      { label: 'FIIs', cells: Array(5).fill(fmtPct(fii)) },
      { label: 'DIIs', cells: Array(5).fill(fmtPct(dii)) },
      { label: 'Public & others', cells: Array(5).fill(fmtPct(publicPct)), emphasis: true }
    ];
  }, [m.promoter, sym]);

  const runSearch = () => {
    const t = input.trim().toUpperCase().replace(/\s+/g, '');
    setSym(t || 'STOCK');
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Financials
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 960 }}>
          Enter a symbol to browse profit and loss, balance sheet, cash flow, ratios, and shareholding in a screener-style layout. Figures are
          illustrative and derived from the ticker for demo only — replace with Screener / CMOTS / vendor APIs for filings.
        </Typography>
      </Box>

      <Alert severity="info" icon={<InfoCircleOutlined />}>
        Mock data for UI preview. Wire your backend to the same sections for live annual and quarterly statements.
      </Alert>

      <MainCard>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} flexWrap="wrap">
            <TextField
              fullWidth
              sx={{ maxWidth: { sm: 360 } }}
              label="Stock symbol"
              placeholder="e.g. RELIANCE, TCS"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" size="large" onClick={runSearch} sx={{ minWidth: 120 }}>
              Search
            </Button>
            <ToggleButtonGroup exclusive size="small" value={view} onChange={(_, v) => v && setView(v)} color="primary">
              <ToggleButton value="consolidated">Consolidated</ToggleButton>
              <ToggleButton value="standalone">Standalone</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {m.name}
            </Typography>
            <Chip label={m.sym} size="small" color="primary" variant="outlined" />
            <Chip label={m.sector} size="small" variant="outlined" />
            <Chip label={`BSE / NSE · FV ₹${m.faceValue}`} size="small" variant="outlined" />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Illustrative CMP ₹{fmtNum(m.cmp, 2)} · Market cap {fmtCr(m.marketCapCr)} · P/E {fmtNum(m.pe, 1)} · P/B {fmtNum(m.pb, 1)} · Div yield{' '}
            {fmtPct(m.divYield)}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard label="ROCE (latest FY)" value={fmtPct(m.roce[0])} sub="Return on capital employed" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard label="ROE (latest FY)" value={fmtPct(m.roe[0])} sub="Return on equity" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard label="Debt / Equity" value={`${fmtNum(m.debtEq, 2)}x`} sub="On book equity" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard label="Interest coverage" value={`${fmtNum(m.interestCov, 1)}x`} sub="EBIT / interest" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard label="Promoter holding" value={fmtPct(m.promoter)} sub={m.pledged > 0 ? `Pledged ${fmtPct(m.pledged)}` : 'Pledged 0%'} />
            </Grid>
          </Grid>
        </Stack>
      </MainCard>

      <MainCard sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" textColor="primary" indicatorColor="primary">
            <Tab label="Profit & loss" />
            <Tab label="Balance sheet" />
            <Tab label="Cash flow" />
            <Tab label="Ratios" />
            <Tab label="Shareholding" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2 }}>
          {tab === 0 && <FinTable years={m.years} rows={pnlRows} />}
          {tab === 1 && <FinTable years={m.years} rows={bsRows} />}
          {tab === 2 && <FinTable years={m.years} rows={cfRows} />}
          {tab === 3 && <FinTable years={m.years} rows={ratioRows} />}
          {tab === 4 && <FinTable years={m.years} rows={shareRows} />}
        </Box>
      </MainCard>
    </Stack>
  );
}
