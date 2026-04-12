import { useMemo, useState } from 'react';

import BulbOutlined from '@ant-design/icons/BulbOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import PartitionOutlined from '@ant-design/icons/PartitionOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
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

import MainCard from 'components/MainCard';
import { computeCorrelatedAllocations, findCorrelatedPreset, flattenPreset, listPresetHints } from 'data/correlatedStocksPresets';

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

export default function CorrelatedStocks() {
  const hints = useMemo(() => listPresetHints(), []);
  const [stockInput, setStockInput] = useState('Maruti');
  const [amountStr, setAmountStr] = useState('10000000');
  const [preset, setPreset] = useState(() => findCorrelatedPreset('Maruti'));
  const [notFound, setNotFound] = useState(false);

  const amount = Number(String(amountStr).replace(/,/g, ''));
  const amountOk = Number.isFinite(amount) && amount > 0;

  const flatRows = useMemo(() => (preset ? flattenPreset(preset) : []), [preset]);
  const allocatedRows = useMemo(() => computeCorrelatedAllocations(amountOk ? amount : 0, flatRows), [flatRows, amount, amountOk]);

  const anchorWeight = useMemo(() => {
    if (!preset) return 0;
    const anchor = preset.categories.find((c) => c.id === 'anchor');
    return anchor ? anchor.stocks.reduce((s, x) => s + x.weight, 0) : 0;
  }, [preset]);

  const runAi = () => {
    const p = findCorrelatedPreset(stockInput);
    setNotFound(!p);
    setPreset(p || null);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Correlated Stocks
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 900 }}>
          You type an anchor stock (e.g. <strong>Maruti</strong>) and how much capital you would deploy (say <strong>₹1 crore</strong>).
          Instead of putting 100% in one name, this tool proposes an <strong>AI-style split</strong> across the anchor,{' '}
          <strong>suppliers</strong> (glass, tyres, AC…), and <strong>competitors / adjacent OEMs</strong> (Tata Motors, M&amp;M,
          two-wheelers) — so risk is shared across the same industrial story.
        </Typography>
      </Box>

      <Alert severity="info" variant="outlined" icon={<InfoCircleOutlined />}>
        Demo presets only (<strong>Maruti</strong>, <strong>Reliance</strong>). Connect your model + live prices for production. Not
        investment advice.
      </Alert>

      <MainCard title="Build your correlated basket">
        <Stack spacing={2.5} sx={{ maxWidth: 560 }}>
          <TextField
            label="Anchor stock"
            placeholder="e.g. Maruti, MARUTI, Reliance"
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            fullWidth
            helperText={`Try: ${hints.map((h) => h.symbol).join(', ')}`}
          />
          <TextField
            label="Total capital to deploy"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
            helperText="Default ₹1,00,00,000 — edit freely."
          />
          <Button
            variant="contained"
            size="large"
            onClick={runAi}
            sx={{ alignSelf: 'flex-start', borderRadius: 99, px: 3, textTransform: 'none', fontWeight: 700 }}
          >
            Generate AI split
          </Button>
        </Stack>

        {notFound && (
          <Alert severity="warning" sx={{ mt: 2 }} onClose={() => setNotFound(false)}>
            No preset for &quot;{stockInput.trim()}&quot;. Use one of: {hints.map((h) => h.symbol).join(', ')}.
          </Alert>
        )}
      </MainCard>

      {preset && (
        <>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <BulbOutlined style={{ fontSize: 22 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {preset.aiHeadline}
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {preset.aiSummary}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 600 }}>
              {preset.concentrationNote}
            </Typography>
          </Paper>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Anchor weight
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {anchorWeight}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  vs 100% if you bought only {preset.anchorSymbol}
                </Typography>
                <LinearProgress variant="determinate" value={anchorWeight} sx={{ mt: 1.5, height: 8, borderRadius: 99 }} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Names in basket
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {flatRows.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Anchor + suppliers + peers (preset)
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  Ticket modelled
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {amountOk ? formatInr(amount) : '—'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Split by weights below
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <MainCard title="Category map" secondary={<PartitionOutlined />}>
            <Stack spacing={2}>
              {preset.categories.map((cat) => (
                <Box key={cat.id}>
                  <Typography variant="subtitle1" fontWeight={800}>
                    {cat.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {cat.description}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {cat.stocks.map((s) => (
                      <Chip key={s.symbol} label={`${s.symbol} ${s.weight}%`} size="small" variant="outlined" />
                    ))}
                  </Stack>
                  {cat.id !== preset.categories[preset.categories.length - 1].id && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Stack>
          </MainCard>

          <MainCard title="Rupee allocation & line items">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Each row: model weight × your ticket. LTPs are <strong>demo</strong> for quantity math only.
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Bucket</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">LTP</TableCell>
                    <TableCell align="right">Your ₹</TableCell>
                    <TableCell align="right">Est. units</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allocatedRows.map((r) => (
                    <TableRow key={r.symbol} hover>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{r.categoryLabel}</TableCell>
                      <TableCell>
                        <Typography fontWeight={700}>{r.symbol}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {r.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 220 }}>
                        <Typography variant="body2">{r.role}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {r.rationale}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{r.weight}%</TableCell>
                      <TableCell align="right">{formatInr2(r.price)}</TableCell>
                      <TableCell align="right">{amountOk ? formatInr2(r.allocatedInr) : '—'}</TableCell>
                      <TableCell align="right">{amountOk ? r.estUnits.toLocaleString('en-IN') : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {amountOk && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1.5 }}>
                Total allocated: <strong>{formatInr2(allocatedRows.reduce((s, r) => s + r.allocatedInr, 0))}</strong>
              </Typography>
            )}
          </MainCard>

          <Alert severity="warning" variant="outlined">
            Illustrative correlations only. Real baskets need fundamentals, liquidity, corporate actions, and compliance. Consult a
            SEBI-registered advisor.
          </Alert>
        </>
      )}
    </Stack>
  );
}
