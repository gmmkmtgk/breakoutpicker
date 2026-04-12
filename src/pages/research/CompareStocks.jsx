import { useMemo, useState } from 'react';

import DiffOutlined from '@ant-design/icons/DiffOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import RobotOutlined from '@ant-design/icons/RobotOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
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
  MARUTI: 'Maruti Suzuki India Ltd',
  TITAN: 'Titan Company Ltd',
  SUNPHARMA: 'Sun Pharmaceutical Industries Ltd',
  ULTRACEMCO: 'UltraTech Cement Ltd',
  WIPRO: 'Wipro Ltd',
  HCLTECH: 'HCL Technologies Ltd',
  TECHM: 'Tech Mahindra Ltd'
};

const SECTORS = [
  'IT — Software',
  'Financial Services',
  'Oil & Gas',
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

function fmtCr(n) {
  return `₹ ${Math.round(n).toLocaleString('en-IN')} Cr`;
}

function fmtPct(n, d = 1) {
  if (n == null || Number.isNaN(n)) return '—';
  const s = n > 0 ? '+' : '';
  return `${s}${n.toFixed(d)}%`;
}

function fmtNum(n, d = 2) {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
}

function displayName(sym) {
  const u = sym.trim().toUpperCase();
  return KNOWN_NAMES[u] || `${u} Ltd`;
}

/** Deterministic mock snapshot per ticker (not live prices or filings). */
function buildSnapshot(raw) {
  const sym = raw.trim().toUpperCase() || 'A';
  const seed = hashStr(sym);
  const rnd = prng(seed);
  const sector = SECTORS[seed % SECTORS.length];
  const pe = 10 + rnd() * 38;
  const pb = 0.8 + rnd() * 7;
  const roce = 7 + rnd() * 38;
  const roe = 5 + rnd() * 32;
  const npm = 3 + rnd() * 24;
  const opm = 8 + rnd() * 28;
  const debtEq = rnd() * 2.8;
  const intCov = 1.5 + rnd() * 16;
  const divYield = rnd() * 2.8;
  const revGrowth = -4 + rnd() * 28;
  const patGrowth = -18 + rnd() * 48;
  const salesCr = Math.round(400 + rnd() * 12000);
  const patCr = Math.round(40 + rnd() * 6500);
  const mcapCr = Math.round(salesCr * (3 + rnd() * 9));
  const beta = Math.round((0.65 + rnd() * 0.95) * 100) / 100;
  const ret1y = -22 + rnd() * 58;
  const price = Math.round(80 + rnd() * 5200);
  const promoter = 35 + rnd() * 55;
  const fii = Math.max(0, Math.round((42 - promoter * 0.35 + rnd() * 18) * 10) / 10);
  const evEbitda = pe * (0.55 + rnd() * 0.35);

  return {
    sym,
    name: displayName(sym),
    sector,
    mcapCr: mcapCr,
    pe,
    pb,
    evEbitda,
    roce,
    roe,
    npm,
    opm,
    debtEq,
    intCov,
    divYield,
    revGrowth,
    patGrowth,
    salesCr,
    patCr,
    beta,
    ret1y,
    price,
    promoter,
    fii,
    salesPerShare: Math.round((20 + rnd() * 800) * 100) / 100,
    bookValue: Math.round((100 + rnd() * 2200) * 100) / 100
  };
}

function pickHigher(a, b, key) {
  const av = a[key];
  const bv = b[key];
  if (Math.abs(av - bv) < 0.05 * Math.max(Math.abs(av), Math.abs(bv), 1)) return 'tie';
  return av > bv ? 'a' : 'b';
}

function pickLower(a, b, key) {
  const av = a[key];
  const bv = b[key];
  if (Math.abs(av - bv) < 0.08 * Math.max(Math.abs(av), Math.abs(bv), 1)) return 'tie';
  return av < bv ? 'a' : 'b';
}

function WinnerCell({ side, label }) {
  if (side === 'tie') return <Chip size="small" label="Tie" variant="outlined" sx={{ height: 22 }} />;
  return (
    <Chip
      size="small"
      label={label}
      color={side === 'a' ? 'primary' : 'secondary'}
      variant={side === 'a' ? 'filled' : 'filled'}
      sx={{ height: 22, fontWeight: 700 }}
    />
  );
}

function CompareTable({ a, b, rows }) {
  const theme = useTheme();
  return (
    <TableContainer sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.06) }}>
            <TableCell sx={{ fontWeight: 700, minWidth: 160 }}>Metric</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
              {a.sym}
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
              {b.sym}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 700, width: 120 }}>
              Edge
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.label} hover>
              <TableCell sx={{ color: 'text.secondary', fontWeight: r.bold ? 700 : 500 }}>{r.label}</TableCell>
              <TableCell align="right">{r.av}</TableCell>
              <TableCell align="right">{r.bv}</TableCell>
              <TableCell align="center">
                {r.winner === 'skip' ? (
                  '—'
                ) : (
                  <WinnerCell side={r.winner} label={r.winner === 'a' ? a.sym : r.winner === 'b' ? b.sym : 'Tie'} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function buildCompareRows(a, b) {
  const rows = [];
  const add = (label, av, bv, winner, bold) => rows.push({ label, av, bv, winner, bold });

  add('Market cap', fmtCr(a.mcapCr), fmtCr(b.mcapCr), 'skip', false);
  add('CMP (mock)', `₹ ${fmtNum(a.price, 2)}`, `₹ ${fmtNum(b.price, 2)}`, 'skip', false);
  add('P/E (TTM)', `${fmtNum(a.pe, 1)}x`, `${fmtNum(b.pe, 1)}x`, pickLower(a, b, 'pe'), false);
  add('P/B', `${fmtNum(a.pb, 2)}x`, `${fmtNum(b.pb, 2)}x`, pickLower(a, b, 'pb'), false);
  add('EV / EBITDA', `${fmtNum(a.evEbitda, 1)}x`, `${fmtNum(b.evEbitda, 1)}x`, pickLower(a, b, 'evEbitda'), false);
  add('Dividend yield', fmtPct(a.divYield, 2), fmtPct(b.divYield, 2), pickHigher(a, b, 'divYield'), false);
  add('1Y return (mock)', fmtPct(a.ret1y, 1), fmtPct(b.ret1y, 1), pickHigher(a, b, 'ret1y'), false);
  add('Beta (mock)', fmtNum(a.beta, 2), fmtNum(b.beta, 2), 'skip', false);

  add('ROCE', fmtPct(a.roce, 1), fmtPct(b.roce, 1), pickHigher(a, b, 'roce'), true);
  add('ROE', fmtPct(a.roe, 1), fmtPct(b.roe, 1), pickHigher(a, b, 'roe'), true);
  add('OPM', fmtPct(a.opm, 1), fmtPct(b.opm, 1), pickHigher(a, b, 'opm'), false);
  add('NPM', fmtPct(a.npm, 1), fmtPct(b.npm, 1), pickHigher(a, b, 'npm'), false);

  add('Debt / equity', `${fmtNum(a.debtEq, 2)}x`, `${fmtNum(b.debtEq, 2)}x`, pickLower(a, b, 'debtEq'), false);
  add('Interest coverage', `${fmtNum(a.intCov, 1)}x`, `${fmtNum(b.intCov, 1)}x`, pickHigher(a, b, 'intCov'), false);

  add('Revenue YoY (mock)', fmtPct(a.revGrowth, 1), fmtPct(b.revGrowth, 1), pickHigher(a, b, 'revGrowth'), false);
  add('PAT YoY (mock)', fmtPct(a.patGrowth, 1), fmtPct(b.patGrowth, 1), pickHigher(a, b, 'patGrowth'), false);
  add('Sales (FY mock)', fmtCr(a.salesCr), fmtCr(b.salesCr), pickHigher(a, b, 'salesCr'), false);
  add('PAT (FY mock)', fmtCr(a.patCr), fmtCr(b.patCr), pickHigher(a, b, 'patCr'), false);
  add('Sales / share (mock)', `₹ ${fmtNum(a.salesPerShare, 2)}`, `₹ ${fmtNum(b.salesPerShare, 2)}`, pickHigher(a, b, 'salesPerShare'), false);
  add('Book value / share', `₹ ${fmtNum(a.bookValue, 2)}`, `₹ ${fmtNum(b.bookValue, 2)}`, pickHigher(a, b, 'bookValue'), false);

  add('Promoter % (mock)', fmtPct(a.promoter, 1), fmtPct(b.promoter, 1), pickHigher(a, b, 'promoter'), false);
  add('FII % (mock)', fmtPct(a.fii, 1), fmtPct(b.fii, 1), 'skip', false);

  return rows;
}

function buildCompareAi(a, b) {
  const lines = [];
  lines.push(`**${a.sym}** vs **${b.sym}** — illustrative numbers seeded from tickers, not exchange feeds.`);
  if (a.sector === b.sector) {
    lines.push(`Both map to **${a.sector}** in this demo — closer to a **peer-style** lens (still mock sector tags).`);
  } else {
    lines.push(
      `**Different** demo sectors — **${a.sector}** vs **${b.sector}**. Multiples and margins are not directly comparable; use same-industry peers for valuation work.`
    );
  }

  if (a.pe < b.pe * 0.92) lines.push(`**${a.sym}** shows a **lower P/E** (${fmtNum(a.pe, 1)}x vs ${fmtNum(b.pe, 1)}x) on this snapshot — cheaper headline multiple; pair with ROE and leverage before calling it “cheaper”.`);
  else if (b.pe < a.pe * 0.92) lines.push(`**${b.sym}** is **lower P/E** (${fmtNum(b.pe, 1)}x vs ${fmtNum(a.pe, 1)}x) in the mock set.`);

  if (a.roe > b.roe * 1.08) lines.push(`**${a.sym}** leads on **ROE** (${fmtPct(a.roe, 1)} vs ${fmtPct(b.roe, 1)}) — stronger book returns in this toy panel.`);
  else if (b.roe > a.roe * 1.08) lines.push(`**${b.sym}** leads on **ROE** (${fmtPct(b.roe, 1)} vs ${fmtPct(a.roe, 1)}).`);

  if (a.debtEq < b.debtEq * 0.85) lines.push(`**${a.sym}** carries **lighter leverage** (D/E ${fmtNum(a.debtEq, 2)}x vs ${fmtNum(b.debtEq, 2)}x) in the mock balance sheet style stats.`);
  else if (b.debtEq < a.debtEq * 0.85) lines.push(`**${b.sym}** shows **lower debt/equity** (${fmtNum(b.debtEq, 2)}x vs ${fmtNum(a.debtEq, 2)}x).`);

  if (a.revGrowth > b.revGrowth + 3) lines.push(`**Revenue growth** favours **${a.sym}** (${fmtPct(a.revGrowth, 1)} vs ${fmtPct(b.revGrowth, 1)} YoY, mock).`);
  else if (b.revGrowth > a.revGrowth + 3) lines.push(`**Revenue growth** favours **${b.sym}** (${fmtPct(b.revGrowth, 1)} vs ${fmtPct(a.revGrowth, 1)} YoY, mock).`);

  lines.push(
    'Swap this block for an **LLM** that ingests your real fundamentals, transcripts, and peer sets — the layout already separates **valuation**, **returns**, **leverage**, and **growth**.'
  );
  return lines;
}

export default function CompareStocks() {
  const theme = useTheme();
  const [inA, setInA] = useState('TCS');
  const [inB, setInB] = useState('INFY');
  const [symA, setSymA] = useState('TCS');
  const [symB, setSymB] = useState('INFY');

  const a = useMemo(() => buildSnapshot(symA), [symA]);
  const b = useMemo(() => buildSnapshot(symB), [symB]);
  const rows = useMemo(() => buildCompareRows(a, b), [a, b]);
  const aiLines = useMemo(() => buildCompareAi(a, b), [a, b]);

  const sameTicker = symA === symB;

  const barOpts = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false }, stacked: false },
      theme: { mode: theme.palette.mode },
      plotOptions: { bar: { horizontal: false, columnWidth: '52%', borderRadius: 4 } },
      dataLabels: { enabled: false },
      xaxis: { categories: ['ROCE %', 'ROE %', 'NPM %', 'OPM %'], labels: { style: { colors: theme.palette.text.secondary } } },
      yaxis: { labels: { formatter: (v) => `${fmtNum(v, 0)}%` } },
      legend: { position: 'top', labels: { colors: theme.palette.text.secondary } },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      grid: { borderColor: theme.palette.divider }
    }),
    [theme]
  );

  const barSeries = useMemo(
    () => [
      { name: a.sym, data: [a.roce, a.roe, a.npm, a.opm] },
      { name: b.sym, data: [b.roce, b.roe, b.npm, b.opm] }
    ],
    [a, b]
  );

  const valBarOpts = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false } },
      theme: { mode: theme.palette.mode },
      plotOptions: { bar: { horizontal: true, barHeight: '65%', borderRadius: 3 } },
      dataLabels: { enabled: true, formatter: (v) => `${Number(v).toFixed(1)}x`, style: { fontSize: '11px' } },
      xaxis: { categories: ['P/E', 'P/B', 'EV/EBITDA'] },
      legend: { position: 'top', labels: { colors: theme.palette.text.secondary } },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      grid: { borderColor: theme.palette.divider }
    }),
    [theme]
  );

  const valBarSeries = useMemo(
    () => [
      { name: a.sym, data: [a.pe, a.pb, a.evEbitda] },
      { name: b.sym, data: [b.pe, b.pb, b.evEbitda] }
    ],
    [a, b]
  );

  const runCompare = () => {
    const A = inA.trim().toUpperCase().replace(/\s+/g, '') || 'A';
    const B = inB.trim().toUpperCase().replace(/\s+/g, '') || 'B';
    setSymA(A);
    setSymB(B);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Compare Stocks
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 960 }}>
          Enter two NSE-style symbols for a side-by-side view:{' '}
          <strong>valuation</strong>, <strong>returns</strong>, <strong>leverage</strong>, <strong>growth</strong>, and <strong>ownership</strong>{' '}
          (mock). When both map to the same demo sector, the read is closer to a peer comparison. Use the <strong>AI panel</strong> for a plain-language
          take — replace with your model on live fundamentals later.
        </Typography>
      </Box>

      <Alert severity="info" icon={<InfoCircleOutlined />}>
        All figures are <strong>deterministic mocks</strong> from the tickers. Not suitable for trading or research conclusions.
      </Alert>

      <MainCard>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <DiffOutlined style={{ fontSize: 28, color: theme.palette.primary.main }} />
            <Typography variant="h5" fontWeight={800}>
              Pick two stocks
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'flex-end' }}>
            <TextField
              fullWidth
              label="Stock A"
              placeholder="e.g. TCS"
              value={inA}
              onChange={(e) => setInA(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && runCompare()}
              InputProps={{ startAdornment: <SearchOutlined style={{ marginRight: 8, opacity: 0.65 }} /> }}
            />
            <TextField
              fullWidth
              label="Stock B"
              placeholder="e.g. INFY"
              value={inB}
              onChange={(e) => setInB(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && runCompare()}
              InputProps={{ startAdornment: <SearchOutlined style={{ marginRight: 8, opacity: 0.65 }} /> }}
            />
            <Button variant="contained" size="large" onClick={runCompare} sx={{ minWidth: 160, fontWeight: 700 }}>
              Compare
            </Button>
          </Stack>
          {sameTicker ? (
            <Alert severity="warning">
              You entered the <strong>same</strong> symbol twice — add a different ticker for a meaningful compare.
            </Alert>
          ) : null}
        </Stack>
      </MainCard>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Paper variant="outlined" sx={{ p: 2, flex: 1, borderLeft: 4, borderColor: 'primary.main' }}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>
                  {a.sym}
                </Typography>
                <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
                  {a.name}
                </Typography>
                <Chip size="small" label={a.sector} sx={{ mt: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                  MCap {fmtCr(a.mcapCr)} · P/E {fmtNum(a.pe, 1)}x · ROE {fmtPct(a.roe, 1)}
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, flex: 1, borderLeft: 4, borderColor: 'secondary.main' }}>
                <Typography variant="overline" color="text.secondary" fontWeight={700}>
                  {b.sym}
                </Typography>
                <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
                  {b.name}
                </Typography>
                <Chip size="small" label={b.sector} color="secondary" variant="outlined" sx={{ mt: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                  MCap {fmtCr(b.mcapCr)} · P/E {fmtNum(b.pe, 1)}x · ROE {fmtPct(b.roe, 1)}
                </Typography>
              </Paper>
            </Stack>

            {a.sector === b.sector ? (
              <Chip color="success" variant="outlined" label={`Same demo sector: ${a.sector}`} sx={{ alignSelf: 'flex-start', fontWeight: 700 }} />
            ) : (
              <Chip color="warning" variant="outlined" label="Different demo sectors — use caution comparing multiples" sx={{ alignSelf: 'flex-start', fontWeight: 700 }} />
            )}

            <Box>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                Traditional compare (table)
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                <strong>Edge</strong> flags the side that wins on simple rules (e.g. lower P/E, higher ROE). Ties when values are close.
              </Typography>
              <CompareTable a={a} b={b} rows={rows} />
            </Box>

            <Divider />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                  Returns & margins (%)
                </Typography>
                <ReactApexChart options={barOpts} series={barSeries} type="bar" height={320} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                  Valuation multiples (x)
                </Typography>
                <ReactApexChart options={valBarOpts} series={valBarSeries} type="bar" height={320} />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              height: '100%',
              minHeight: 360,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              borderColor: 'primary.light'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <RobotOutlined style={{ fontSize: 22, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={800}>
                AI compare
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Rule-based summary for demo — same pattern as Charts AI.
            </Typography>
            <Stack spacing={1.5}>
              {aiLines.map((line, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ '& strong': { color: 'text.primary' } }}>
                  {line.split('**').map((chunk, j) => (j % 2 === 1 ? <strong key={`${i}-${j}`}>{chunk}</strong> : <span key={`${i}-${j}`}>{chunk}</span>))}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
