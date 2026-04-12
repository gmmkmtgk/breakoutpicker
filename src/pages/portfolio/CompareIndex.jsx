import { useMemo, useState } from 'react';

import CloseOutlined from '@ant-design/icons/CloseOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { INDIAN_INDICES } from 'data/compareIndexData';

function pct(n) {
  if (n == null || Number.isNaN(n)) return '—';
  const s = n > 0 ? '+' : '';
  return `${s}${n.toFixed(2)}%`;
}

function descendingComparator(a, b, orderBy) {
  const av = a.returns?.[orderBy] ?? 0;
  const bv = b.returns?.[orderBy] ?? 0;
  if (bv < av) return -1;
  if (bv > av) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function CompareIndex() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('r1y');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [constQuery, setConstQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = INDIAN_INDICES;
    if (q) {
      list = list.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.code.toLowerCase().includes(q) ||
          x.category.toLowerCase().includes(q) ||
          x.exchange.toLowerCase().includes(q)
      );
    }
    return [...list].sort(getComparator(order, orderBy));
  }, [query, order, orderBy]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredConstituents = useMemo(() => {
    if (!detail?.constituents) return [];
    const q = constQuery.trim().toLowerCase();
    if (!q) return detail.constituents;
    return detail.constituents.filter((s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }, [detail, constQuery]);

  const weightSum = useMemo(() => {
    if (!detail?.constituents?.length) return null;
    return detail.constituents.reduce((s, c) => s + (Number(c.weight) || 0), 0);
  }, [detail]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Compare Index
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          Browse major NSE and BSE indices with illustrative returns. Click a row to see sample constituents (replace with live index files).
        </Typography>
      </Box>

      <Alert severity="info" variant="outlined" icon={<InfoCircleOutlined />}>
        Returns are mock for UI. India VIX has no equity constituents.
      </Alert>

      <MainCard
        title="Indian market indices"
        secondary={
          <TextField
            size="small"
            placeholder="Search index…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 220 }}
          />
        }
      >
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Index</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Code</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Exchange</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'r1w'} direction={orderBy === 'r1w' ? order : 'asc'} onClick={() => handleSort('r1w')}>
                    1W
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'r1m'} direction={orderBy === 'r1m' ? order : 'asc'} onClick={() => handleSort('r1m')}>
                    1M
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'r3m'} direction={orderBy === 'r3m' ? order : 'asc'} onClick={() => handleSort('r3m')}>
                    3M
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'r6m'} direction={orderBy === 'r6m' ? order : 'asc'} onClick={() => handleSort('r6m')}>
                    6M
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'r1y'} direction={orderBy === 'r1y' ? order : 'asc'} onClick={() => handleSort('r1y')}>
                    1Y
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel active={orderBy === 'ytd'} direction={orderBy === 'ytd' ? order : 'asc'} onClick={() => handleSort('ytd')}>
                    YTD
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  # Stocks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((idx) => (
                <TableRow
                  key={idx.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setDetail(idx);
                    setConstQuery('');
                  }}
                >
                  <TableCell>
                    <Typography fontWeight={700}>{idx.name}</Typography>
                  </TableCell>
                  <TableCell>{idx.code}</TableCell>
                  <TableCell>
                    <Chip label={idx.exchange} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{idx.category}</TableCell>
                  <TableCell align="right">{pct(idx.returns.r1w)}</TableCell>
                  <TableCell align="right">{pct(idx.returns.r1m)}</TableCell>
                  <TableCell align="right">{pct(idx.returns.r3m)}</TableCell>
                  <TableCell align="right">{pct(idx.returns.r6m)}</TableCell>
                  <TableCell align="right">{pct(idx.returns.r1y)}</TableCell>
                  <TableCell align="right">{pct(idx.returns.ytd)}</TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={700}>{idx.constituents.length || '—'}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1.5 }}>
          Click a row to view stocks in that index.
        </Typography>
      </MainCard>

      <Dialog open={!!detail} onClose={() => setDetail(null)} maxWidth="md" fullWidth scroll="paper">
        {detail && (
          <>
            <DialogTitle sx={{ pr: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={800}>
                  {detail.name}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.75} alignItems="center">
                  <Chip label={detail.code} size="small" />
                  <Chip label={detail.exchange} size="small" variant="outlined" />
                  <Chip label={detail.category} size="small" variant="outlined" />
                  <Typography variant="caption" color="text.secondary">
                    1Y (demo): <strong>{pct(detail.returns.r1y)}</strong>
                  </Typography>
                </Stack>
              </Stack>
              <IconButton aria-label="close" onClick={() => setDetail(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseOutlined />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {detail.note && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {detail.note}
                </Alert>
              )}

              {!detail.constituents.length ? (
                <Typography color="text.secondary">No equity constituents for this index type.</Typography>
              ) : (
                <>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} gap={1} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={800}>
                      Constituents ({detail.constituents.length} shown)
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Filter symbol or name…"
                      value={constQuery}
                      onChange={(e) => setConstQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined />
                          </InputAdornment>
                        )
                      }}
                      sx={{ minWidth: 240 }}
                    />
                  </Stack>
                  {weightSum != null && weightSum > 0 && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      Sample weights sum to ~<strong>{weightSum.toFixed(1)}%</strong> (partial list).
                    </Typography>
                  )}
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Symbol</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Weight %
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredConstituents.map((c, i) => (
                          <TableRow key={c.symbol} hover>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                              <Typography fontWeight={700}>{c.symbol}</Typography>
                            </TableCell>
                            <TableCell>{c.name}</TableCell>
                            <TableCell align="right">{c.weight != null ? `${c.weight.toFixed(2)}%` : '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {!filteredConstituents.length && (
                    <Typography color="text.secondary" sx={{ py: 2 }}>
                      No matches for &quot;{constQuery}&quot;.
                    </Typography>
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setDetail(null)} sx={{ textTransform: 'none' }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
}
