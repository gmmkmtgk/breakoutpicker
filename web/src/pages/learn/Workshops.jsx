import { useMemo, useState } from 'react';

import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { WorkshopsMeetupProvider, useWorkshopsMeetup } from 'contexts/WorkshopsMeetupContext';

function formatINR(n) {
  if (!n) return 'Free';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function formatWhen(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { d: '—', t: '', wd: '—' };
  return {
    d: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    t: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    wd: d.toLocaleDateString('en-IN', { weekday: 'short' })
  };
}

const MODE_OPTIONS = [
  { id: 'all', label: 'All formats' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'In person' },
  { id: 'hybrid', label: 'Hybrid' }
];

const PRICE_OPTIONS = [
  { id: 'all', label: 'Any price' },
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' }
];

const emptyHostForm = {
  title: '',
  organizer: '',
  description: '',
  startsAt: '',
  durationMin: '90',
  mode: 'offline',
  city: '',
  venue: '',
  meetingUrl: '',
  priceINR: '0',
  capacity: '40',
  topics: 'Stocks, Discussion'
};

function WorkshopsInner() {
  const theme = useTheme();
  const { workshops, goingCount, isJoined, toggleRsvp, addUserWorkshop } = useWorkshopsMeetup();
  const [modeFilter, setModeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [cityQ, setCityQ] = useState('');
  const [search, setSearch] = useState('');
  const [hostOpen, setHostOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [hostForm, setHostForm] = useState(emptyHostForm);
  const [hostErr, setHostErr] = useState('');

  const filtered = useMemo(() => {
    const cq = cityQ.trim().toLowerCase();
    const sq = search.trim().toLowerCase();
    return workshops.filter((w) => {
      if (modeFilter !== 'all' && w.mode !== modeFilter) return false;
      if (priceFilter === 'free' && w.priceINR > 0) return false;
      if (priceFilter === 'paid' && w.priceINR === 0) return false;
      if (cq && !w.city.toLowerCase().includes(cq)) return false;
      if (sq) {
        const blob = `${w.title} ${w.organizer} ${w.description} ${(w.topics || []).join(' ')}`.toLowerCase();
        if (!blob.includes(sq)) return false;
      }
      return true;
    });
  }, [workshops, modeFilter, priceFilter, cityQ, search]);

  const submitHost = () => {
    setHostErr('');
    if (!hostForm.title.trim() || !hostForm.organizer.trim() || !hostForm.description.trim() || !hostForm.startsAt) {
      setHostErr('Title, organizer, description, and date/time are required.');
      return;
    }
    if (hostForm.mode === 'offline' && !hostForm.city.trim()) {
      setHostErr('Add a city for in-person events.');
      return;
    }
    if (hostForm.mode === 'online' && !hostForm.meetingUrl.trim()) {
      setHostErr('Add a meeting link for online events (Zoom / Meet / etc.).');
      return;
    }
    if (hostForm.mode === 'hybrid') {
      if (!hostForm.venue.trim() || !hostForm.meetingUrl.trim()) {
        setHostErr('Hybrid events need both a physical venue and an online meeting link.');
        return;
      }
      if (!hostForm.city.trim()) {
        setHostErr('Add a city for hybrid events.');
        return;
      }
    }
    addUserWorkshop(hostForm);
    setHostOpen(false);
    setHostForm(emptyHostForm);
  };

  const modeIcon = (m) => {
    if (m === 'online') return <VideoCameraOutlined />;
    if (m === 'hybrid') return <GlobalOutlined />;
    return <EnvironmentOutlined />;
  };

  return (
    <Stack spacing={3} sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Workshops
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          Meetup-style gatherings for Indian market learners: <strong>online</strong>, <strong>in person</strong>, or <strong>hybrid</strong>,{' '}
          <strong>free</strong> or <strong>paid</strong>. Hosts post details here (stored in your browser for the demo). RSVP to save a seat — replace with
          a backend and payments when you go live.
        </Typography>
      </Box>

      <Alert severity="info" icon={<CalendarOutlined />}>
        Illustration only — verify hosts, venues, and compliance (SEBI / consumer law) before real ticket sales. No money is collected in this demo.
      </Alert>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} flexWrap="wrap" useFlexGap>
        <Button variant="contained" size="large" startIcon={<PlusOutlined />} onClick={() => setHostOpen(true)} sx={{ fontWeight: 800, textTransform: 'none' }}>
          Host a workshop
        </Button>
        <TextField
          size="small"
          label="Search"
          placeholder="Title, host, topic…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200, flex: 1 }}
        />
        <TextField
          size="small"
          label="City"
          placeholder="Mumbai, online…"
          value={cityQ}
          onChange={(e) => setCityQ(e.target.value)}
          sx={{ minWidth: 160 }}
        />
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
        {MODE_OPTIONS.map((m) => (
          <Chip key={m.id} label={m.label} onClick={() => setModeFilter(m.id)} color={modeFilter === m.id ? 'primary' : 'default'} variant={modeFilter === m.id ? 'filled' : 'outlined'} />
        ))}
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
        {PRICE_OPTIONS.map((p) => (
          <Chip key={p.id} label={p.label} onClick={() => setPriceFilter(p.id)} color={priceFilter === p.id ? 'secondary' : 'default'} variant={priceFilter === p.id ? 'filled' : 'outlined'} />
        ))}
      </Stack>

      <Typography variant="h6" fontWeight={800}>
        {filtered.length} workshop{filtered.length === 1 ? '' : 's'}
      </Typography>

      <Stack spacing={2}>
        {filtered.map((w) => {
          const { d, t, wd } = formatDateShort(w.startsAt);
          const going = goingCount(w);
          const full = going >= w.capacity;
          const joined = isJoined(w.id);
          return (
            <Paper
              key={w.id}
              variant="outlined"
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                '&:hover': { borderColor: 'primary.light', boxShadow: 2 }
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: 108 },
                  flexShrink: 0,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  py: 2,
                  px: 2,
                  textAlign: 'center',
                  borderRight: { sm: 1 },
                  borderBottom: { xs: 1, sm: 0 },
                  borderColor: 'divider'
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  {wd}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ lineHeight: 1.1 }}>
                  {d}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 1 }}>
                  <Chip size="small" icon={modeIcon(w.mode)} label={w.mode} variant="outlined" />
                  <Chip size="small" label={w.priceINR ? formatINR(w.priceINR) : 'Free'} color={w.priceINR ? 'default' : 'success'} variant={w.priceINR ? 'outlined' : 'filled'} />
                  {!w.isSeed ? <Chip size="small" label="Community host" color="info" variant="outlined" /> : null}
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {w.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Hosted by <strong>{w.organizer}</strong> · {w.city} · {w.durationMin} min
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                  {(w.topics || []).map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" />
                  ))}
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }} alignItems={{ sm: 'center' }}>
                  <Stack direction="row" spacing={0.75} alignItems="center" color="text.secondary">
                    <TeamOutlined />
                    <Typography variant="body2">
                      <strong>{going}</strong> / {w.capacity} going
                      {full ? ' · Full' : ''}
                    </Typography>
                  </Stack>
                  <Box flex={1} />
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => setDetail(w)} sx={{ textTransform: 'none', fontWeight: 700 }}>
                      Details
                    </Button>
                    <Button
                      variant={joined ? 'outlined' : 'contained'}
                      color={joined ? 'inherit' : 'primary'}
                      size="small"
                      disabled={full && !joined}
                      onClick={() => toggleRsvp(w.id)}
                      sx={{ textTransform: 'none', fontWeight: 700 }}
                    >
                      {joined ? 'Leave' : full ? 'Full' : 'RSVP'}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No workshops match filters. Clear search or host the first one.
        </Typography>
      ) : null}

      <Dialog open={hostOpen} onClose={() => setHostOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Host a workshop</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 0.5 }}>
            {hostErr ? <Alert severity="error">{hostErr}</Alert> : null}
            <TextField label="Workshop title" fullWidth required value={hostForm.title} onChange={(e) => setHostForm((f) => ({ ...f, title: e.target.value }))} />
            <TextField label="Host / group name" fullWidth required value={hostForm.organizer} onChange={(e) => setHostForm((f) => ({ ...f, organizer: e.target.value }))} />
            <TextField
              label="Description"
              fullWidth
              required
              multiline
              minRows={4}
              value={hostForm.description}
              onChange={(e) => setHostForm((f) => ({ ...f, description: e.target.value }))}
            />
            <TextField
              label="Starts at"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={hostForm.startsAt}
              onChange={(e) => setHostForm((f) => ({ ...f, startsAt: e.target.value }))}
            />
            <TextField label="Duration (minutes)" type="number" fullWidth value={hostForm.durationMin} onChange={(e) => setHostForm((f) => ({ ...f, durationMin: e.target.value }))} />
            <TextField label="Format" select fullWidth value={hostForm.mode} onChange={(e) => setHostForm((f) => ({ ...f, mode: e.target.value }))}>
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">In person</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </TextField>
            <TextField label="City / region" fullWidth value={hostForm.city} onChange={(e) => setHostForm((f) => ({ ...f, city: e.target.value }))} placeholder="Mumbai or India (online)" />
            <TextField label="Venue (in person)" fullWidth value={hostForm.venue} onChange={(e) => setHostForm((f) => ({ ...f, venue: e.target.value }))} />
            <TextField label="Meeting URL (online / hybrid)" fullWidth value={hostForm.meetingUrl} onChange={(e) => setHostForm((f) => ({ ...f, meetingUrl: e.target.value }))} />
            <TextField
              label="Ticket price (INR)"
              type="number"
              fullWidth
              value={hostForm.priceINR}
              onChange={(e) => setHostForm((f) => ({ ...f, priceINR: e.target.value }))}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              helperText="Use 0 for a free meetup."
            />
            <TextField label="Capacity" type="number" fullWidth value={hostForm.capacity} onChange={(e) => setHostForm((f) => ({ ...f, capacity: e.target.value }))} />
            <TextField label="Topics (comma separated)" fullWidth value={hostForm.topics} onChange={(e) => setHostForm((f) => ({ ...f, topics: e.target.value }))} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHostOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitHost} sx={{ fontWeight: 700 }}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(detail)} onClose={() => setDetail(null)} maxWidth="sm" fullWidth>
        {detail ? (
          <>
            <DialogTitle>{detail.title}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  {formatWhen(detail.startsAt)} · {detail.durationMin} minutes · {detail.city}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  <Chip icon={modeIcon(detail.mode)} label={detail.mode} />
                  <Chip label={detail.priceINR ? formatINR(detail.priceINR) : 'Free'} color={detail.priceINR ? 'default' : 'success'} />
                </Stack>
                <Divider />
                <Typography variant="subtitle2" color="text.secondary">
                  Host
                </Typography>
                <Typography fontWeight={700}>{detail.organizer}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  About
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {detail.description}
                </Typography>
                {detail.venue ? (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">
                      Venue
                    </Typography>
                    <Typography variant="body2">{detail.venue}</Typography>
                  </>
                ) : null}
                {detail.meetingUrl ? (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">
                      Online link
                    </Typography>
                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {detail.meetingUrl}
                    </Typography>
                  </>
                ) : null}
                <Typography variant="body2" color="text.secondary">
                  {goingCount(detail)} / {detail.capacity} participants (demo counter)
                </Typography>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetail(null)}>Close</Button>
              <Button
                variant={isJoined(detail.id) ? 'outlined' : 'contained'}
                disabled={goingCount(detail) >= detail.capacity && !isJoined(detail.id)}
                onClick={() => {
                  toggleRsvp(detail.id);
                  setDetail(null);
                }}
              >
                {isJoined(detail.id) ? 'Leave RSVP' : goingCount(detail) >= detail.capacity ? 'Full' : 'RSVP'}
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </Stack>
  );
}

export default function Workshops() {
  return (
    <WorkshopsMeetupProvider>
      <WorkshopsInner />
    </WorkshopsMeetupProvider>
  );
}
