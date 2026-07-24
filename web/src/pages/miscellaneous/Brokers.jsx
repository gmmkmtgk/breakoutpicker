import { useMemo, useState } from 'react';

import BankOutlined from '@ant-design/icons/BankOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LinkOutlined from '@ant-design/icons/LinkOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
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
import { visuallyHidden } from '@mui/utils';

import MainCard from 'components/MainCard';
import {
  BROKER_TYPES,
  brokerMatchesSearch,
  INDIAN_STOCK_BROKERS,
  SEGMENT_LABELS,
  segmentFilter
} from 'data/indianStockBrokers';

const TYPE_ORDER = { discount: 0, 'full-service': 1, bank: 2 };

const MAX_COMPARE = 4;

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'type') {
    return TYPE_ORDER[b.type] - TYPE_ORDER[a.type];
  }
  if (orderBy === 'brand') {
    return b.brand.localeCompare(a.brand, undefined, { sensitivity: 'base' });
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const headCells = [
  { id: 'compare', label: 'Compare', sortable: false },
  { id: 'brand', label: 'Broker', sortable: true },
  { id: 'type', label: 'Type', sortable: true },
  { id: 'equityDelivery', label: 'Delivery', sortable: false },
  { id: 'equityIntraday', label: 'Intraday', sortable: false },
  { id: 'equityFno', label: 'F&O', sortable: false },
  { id: 'dematAmc', label: 'Demat AMC', sortable: false },
  { id: 'segments', label: 'Segments', sortable: false }
];

const compareRows = [
  { key: 'legalName', label: 'Legal entity' },
  { key: 'type', label: 'Category', format: (v) => ({ discount: 'Discount / online', bank: 'Bank-backed', 'full-service': 'Full-service' }[v] || v) },
  { key: 'accountOpening', label: 'Account opening (typical)' },
  { key: 'dematAmc', label: 'Demat AMC' },
  { key: 'equityDelivery', label: 'Equity delivery' },
  { key: 'equityIntraday', label: 'Equity intraday' },
  { key: 'equityFno', label: 'Equity F&O' },
  { key: 'mutualFunds', label: 'Mutual funds' },
  { key: 'ipo', label: 'IPO' },
  { key: 'usStocks', label: 'US / global equities' },
  { key: 'mtf', label: 'MTF / leverage' },
  { key: 'apiAlgo', label: 'API / algo' },
  { key: 'research', label: 'Research & advice' },
  { key: 'branches', label: 'Branches / touchpoints' },
  { key: 'platforms', label: 'Platforms', format: (v) => (Array.isArray(v) ? v.join(' · ') : v) },
  { key: 'idealFor', label: 'Often suits' },
  { key: 'pros', label: 'Pros', format: (v) => (Array.isArray(v) ? v : []) },
  { key: 'cons', label: 'Cons', format: (v) => (Array.isArray(v) ? v : []) },
  { key: 'website', label: 'Official site' }
];

export default function Brokers() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [segFilter, setSegFilter] = useState('all');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('brand');
  const [compareIds, setCompareIds] = useState(() => new Set());
  const [compareOpen, setCompareOpen] = useState(false);
  const [snack, setSnack] = useState('');

  const filtered = useMemo(() => {
    return INDIAN_STOCK_BROKERS.filter(
      (b) => brokerMatchesSearch(b, search) && (typeFilter === 'all' || b.type === typeFilter) && segmentFilter(b, segFilter)
    );
  }, [search, typeFilter, segFilter]);

  const sorted = useMemo(() => stableSort(filtered, getComparator(order, orderBy)), [filtered, order, orderBy]);

  const compareBrokers = useMemo(
    () => INDIAN_STOCK_BROKERS.filter((b) => compareIds.has(b.id)).slice(0, MAX_COMPARE),
    [compareIds]
  );

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (next.size >= MAX_COMPARE) {
        setSnack(`You can compare up to ${MAX_COMPARE} brokers at once.`);
        return prev;
      }
      next.add(id);
      return next;
    });
  };

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <MainCard title="Indian stock brokers — compare">
      <Stack spacing={2.5}>
        <Alert severity="warning" icon={<BankOutlined />}>
          Fees, products, and offers change frequently. This page is a <strong>planning aid only</strong> — not financial advice, not an endorsement, and not
          guaranteed accurate. Always verify tariffs, MTF interest, DP charges, and SEBI registration on each broker’s official website before opening an account.
        </Alert>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flexWrap="wrap" useFlexGap>
          <TextField
            size="small"
            placeholder="Search broker, platform…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="broker-type-filter">Broker type</InputLabel>
            <Select labelId="broker-type-filter" label="Broker type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {BROKER_TYPES.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="seg-filter">Must offer segment</InputLabel>
            <Select labelId="seg-filter" label="Must offer segment" value={segFilter} onChange={(e) => setSegFilter(e.target.value)}>
              <MenuItem value="all">Any segment</MenuItem>
              {Object.entries(SEGMENT_LABELS).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
          <Typography variant="body2" color="text.secondary">
            {sorted.length} broker{sorted.length !== 1 ? 's' : ''} shown · tick up to {MAX_COMPARE} for a side-by-side sheet
          </Typography>
          {compareIds.size > 0 && (
            <Button variant="contained" size="small" onClick={() => setCompareOpen(true)} disabled={compareIds.size < 2}>
              Open comparison ({compareIds.size})
            </Button>
          )}
          {compareIds.size > 0 && (
            <Button size="small" onClick={() => setCompareIds(new Set())}>
              Clear selection
            </Button>
          )}
        </Stack>

        <TableContainer sx={{ maxHeight: 560, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headCells.map((h) => (
                  <TableCell key={h.id} sortDirection={orderBy === h.id ? order : false} sx={{ fontWeight: 700, bgcolor: 'background.paper' }}>
                    {h.sortable ? (
                      <TableSortLabel active={orderBy === h.id} direction={orderBy === h.id ? order : 'asc'} onClick={(e) => handleRequestSort(e, h.id)}>
                        {h.label}
                        {orderBy === h.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      h.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((b) => (
                <TableRow key={b.id} hover selected={compareIds.has(b.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={compareIds.has(b.id)}
                      onChange={() => toggleCompare(b.id)}
                      inputProps={{ 'aria-label': `Compare ${b.brand}` }}
                      disabled={!compareIds.has(b.id) && compareIds.size >= MAX_COMPARE}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={700}>{b.brand}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 280 }}>
                      {b.idealFor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={{ discount: 'Discount', bank: 'Bank', 'full-service': 'Full-service' }[b.type]}
                      color={b.type === 'bank' ? 'primary' : b.type === 'full-service' ? 'secondary' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal', verticalAlign: 'top' }}>{b.equityDelivery}</TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal', verticalAlign: 'top' }}>{b.equityIntraday}</TableCell>
                  <TableCell sx={{ maxWidth: 180, whiteSpace: 'normal', verticalAlign: 'top' }}>{b.equityFno}</TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal', verticalAlign: 'top' }}>{b.dematAmc}</TableCell>
                  <TableCell>
                    <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: 0.5 }}>
                      {b.segments.map((s) => (
                        <Chip key={s} label={s} size="small" variant="filled" />
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {sorted.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No brokers match these filters. Try clearing the segment filter or search.
          </Typography>
        )}
      </Stack>

      <Dialog open={compareOpen} onClose={() => setCompareOpen(false)} maxWidth="lg" fullWidth scroll="paper">
        <DialogTitle sx={{ pr: 6 }}>
          Compare brokers
          <IconButton aria-label="close" onClick={() => setCompareOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, width: 200 }}>Field</TableCell>
                {compareBrokers.map((b) => (
                  <TableCell key={b.id} sx={{ fontWeight: 800, verticalAlign: 'bottom', minWidth: 200 }}>
                    {b.brand}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {compareRows.map((row) => (
                <TableRow key={row.key}>
                  <TableCell sx={{ fontWeight: 600, verticalAlign: 'top', bgcolor: 'action.hover' }}>{row.label}</TableCell>
                  {compareBrokers.map((b) => {
                    const raw = b[row.key];
                    let cell;
                    if (row.key === 'website') {
                      cell = (
                        <Link href={b.website} target="_blank" rel="noopener noreferrer" underline="hover">
                          {b.website.replace(/^https?:\/\//, '')}{' '}
                          <LinkOutlined style={{ fontSize: 14, verticalAlign: 'middle' }} />
                        </Link>
                      );
                    } else if (row.format) {
                      if (row.key === 'pros' || row.key === 'cons') {
                        const list = row.format(raw, b);
                        cell = (
                          <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
                            {list.map((x) => (
                              <li key={x}>
                                <Typography variant="body2" component="span">
                                  {x}
                                </Typography>
                              </li>
                            ))}
                          </Box>
                        );
                      } else {
                        cell = <Typography variant="body2">{row.format(raw, b)}</Typography>;
                      }
                    } else {
                      cell = (
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                          {raw}
                        </Typography>
                      );
                    }
                    return (
                      <TableCell key={b.id} sx={{ verticalAlign: 'top' }}>
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Snackbar open={Boolean(snack)} autoHideDuration={4000} onClose={() => setSnack('')} message={snack} />
    </MainCard>
  );
}
