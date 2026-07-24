import { useMemo, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import MainCard from 'components/MainCard';
import { computeAllocations, getBasketById } from 'data/aiBaskets';

function formatInr(n) {
  if (n == null || Number.isNaN(n)) return '—';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `₹${n}`;
  }
}

function formatInr2(n) {
  if (n == null || Number.isNaN(n)) return '—';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);
  } catch {
    return `₹${n}`;
  }
}

function pct(n, digits = 1) {
  if (n == null || Number.isNaN(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(digits)}%`;
}

function StatBox({ label, value, sub, positive }) {
  const valueColor = positive === true ? 'success.main' : positive === false ? 'error.main' : 'text.primary';
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%', borderRadius: 2 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: positive !== undefined ? valueColor : 'text.primary' }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
          {sub}
        </Typography>
      )}
    </Paper>
  );
}

export default function AIBasketDetail() {
  const { basketId } = useParams();
  const basket = useMemo(() => getBasketById(basketId || ''), [basketId]);
  const [amountStr, setAmountStr] = useState('100000');

  const amount = Number(String(amountStr).replace(/,/g, ''));
  const amountValid = Number.isFinite(amount) && amount > 0;

  const rows = useMemo(() => {
    if (!basket) return [];
    return computeAllocations(amountValid ? amount : 0, basket.constituents);
  }, [basket, amount, amountValid]);

  if (!basket) {
    return (
      <MainCard title="Basket not found">
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          This AI basket does not exist or was renamed.
        </Typography>
        <Button component={RouterLink} to="/ai-baskets" variant="contained">
          Back to AI Baskets
        </Button>
      </MainCard>
    );
  }

  const p = basket.performance;

  return (
    <Stack spacing={2.5}>
      <Breadcrumbs>
        <Link component={RouterLink} to="/ai-baskets" underline="hover" color="inherit">
          AI Baskets
        </Link>
        <Typography color="text.primary">{basket.title}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Box>
          <Button
            component={RouterLink}
            to="/ai-baskets"
            startIcon={<ArrowLeftOutlined />}
            size="small"
            sx={{ mb: 1, textTransform: 'none' }}
          >
            All baskets
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
            {basket.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
            {basket.tagline}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.5 }}>
            {basket.themes.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" color="primary" />
            ))}
            <Chip label={`Risk: ${basket.riskLabel}`} size="small" color="warning" variant="light" />
            <Chip label={`Min. ${formatInr(basket.minInvest)}`} size="small" variant="filled" />
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ maxWidth: 360 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Risk score (AI)
        </Typography>
        <LinearProgress variant="determinate" value={Math.min(10, basket.riskScore) * 10} sx={{ mt: 0.5, height: 8, borderRadius: 99 }} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="1 year return" value={pct(p.return1Y)} sub={`vs ${p.benchmark}`} positive={p.return1Y >= 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="CAGR (3Y)" value={pct(p.cagr3Y)} sub="Compounded" positive={p.cagr3Y >= 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox
            label="Since inception"
            value={pct(p.returnSinceInception)}
            sub={`from ${p.inception}`}
            positive={p.returnSinceInception >= 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="Alpha vs Nifty (1Y)" value={pct(p.alphaVsNifty1Y)} sub="Excess return" positive={p.alphaVsNifty1Y >= 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="Max drawdown (1Y)" value={pct(p.maxDrawdown1Y)} sub="Worst peak-to-trough" positive={false} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="Volatility (ann.)" value={`${p.volatilityAnn.toFixed(1)}%`} sub="Std. dev. of returns" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="Sharpe (est.)" value={p.sharpe.toFixed(2)} sub="Risk-adjusted" positive={p.sharpe >= 1} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatBox label="6 month" value={pct(p.return6M)} sub="Recent momentum" positive={p.return6M >= 0} />
        </Grid>
      </Grid>

      <Alert icon={<InfoCircleOutlined />} severity="info" variant="outlined">
        {basket.aiNote} Rebalancing cadence and universe rules are illustrative for this demo.
      </Alert>

      <MainCard title="Plan your allocation">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter how much you would deploy — we split it by the basket weights (Smallcase-style snapshot). Numbers are illustrative.
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Investment amount"
            type="text"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>
            }}
            helperText={!amountValid ? 'Enter a positive number (commas allowed).' : `Minimum suggested: ${formatInr(basket.minInvest)}`}
            sx={{ maxWidth: 320 }}
          />

          <Divider />

          <Typography variant="subtitle1" fontWeight={700}>
            Stock-wise split
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Stock</TableCell>
                  <TableCell align="right">Weight</TableCell>
                  <TableCell align="right">LTP (demo)</TableCell>
                  <TableCell align="right">Your ₹</TableCell>
                  <TableCell align="right">Est. units</TableCell>
                  <TableCell>Sector</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.symbol} hover>
                    <TableCell>
                      <Typography fontWeight={700}>{r.symbol}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {r.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{r.weight}%</TableCell>
                    <TableCell align="right">{formatInr2(r.price)}</TableCell>
                    <TableCell align="right">{amountValid ? formatInr2(r.allocatedInr) : '—'}</TableCell>
                    <TableCell align="right">{amountValid ? r.estUnits.toLocaleString('en-IN') : '—'}</TableCell>
                    <TableCell>{r.sector}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {amountValid && (
            <Typography variant="body2" color="text.secondary">
              Total allocated: <strong>{formatInr2(rows.reduce((s, r) => s + r.allocatedInr, 0))}</strong> (weights × amount; rounding may
              leave a few rupees unallocated in a live product.)
            </Typography>
          )}
        </Stack>
      </MainCard>

      <MainCard title="Performance trail (illustrative)">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Backtest-style metrics for storytelling — not live execution data.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="caption" color="text.secondary">
              1 month
            </Typography>
            <Typography variant="h6" fontWeight={800} color={p.return1M >= 0 ? 'success.main' : 'error.main'}>
              {pct(p.return1M)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="caption" color="text.secondary">
              3 months
            </Typography>
            <Typography variant="h6" fontWeight={800} color={p.return3M >= 0 ? 'success.main' : 'error.main'}>
              {pct(p.return3M)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="caption" color="text.secondary">
              CAGR since launch
            </Typography>
            <Typography variant="h6" fontWeight={800} color={p.cagrSince >= 0 ? 'success.main' : 'error.main'}>
              {pct(p.cagrSince)}
            </Typography>
          </Grid>
        </Grid>
      </MainCard>

      <Alert severity="warning" variant="outlined">
        BreakoutPicker AI Baskets are <strong>demo analytics only</strong>. Not investment advice. Past (or simulated) performance does not
        guarantee future results. Consult a SEBI-registered advisor before investing.
      </Alert>
    </Stack>
  );
}
