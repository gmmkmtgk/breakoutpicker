import { useMemo, useState } from 'react';

import AudioMutedOutlined from '@ant-design/icons/AudioMutedOutlined';
import BellOutlined from '@ant-design/icons/BellOutlined';
import BellFilled from '@ant-design/icons/BellFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import SoundOutlined from '@ant-design/icons/SoundOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { VoicesSpacesProvider, useVoicesSpaces } from 'contexts/VoicesSpacesContext';

function formatWhen(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function WaveBars() {
  return (
    <Stack direction="row" alignItems="flex-end" spacing={0.4} sx={{ height: 28 }}>
      {[6, 14, 22, 12, 18, 8, 16, 24, 10, 20].map((h, i) => (
        <Box
          key={i}
          sx={{
            width: 3,
            height: h,
            borderRadius: 1,
            bgcolor: 'common.white',
            opacity: 0.85,
            animation: `bpVoicePulse 0.9s ease-in-out ${i * 0.07}s infinite alternate`,
            '@keyframes bpVoicePulse': {
              from: { transform: 'scaleY(0.45)', opacity: 0.45 },
              to: { transform: 'scaleY(1)', opacity: 1 }
            }
          }}
        />
      ))}
    </Stack>
  );
}

function SpaceCard({ space, variant, onJoin, onOpenDetail, joinedId, onRemind, hasReminder }) {
  const theme = useTheme();
  const isLive = space.status === 'live';
  const isSched = space.status === 'scheduled';
  const joined = joinedId === space.id;

  const bg =
    variant === 'live'
      ? `linear-gradient(135deg, ${alpha('#5b21b6', 0.95)} 0%, ${alpha('#312e81', 0.98)} 55%, ${alpha('#1e1b4b', 1)} 100%)`
      : isSched
        ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)
        : theme.palette.action.hover;

  const color = variant === 'live' ? theme.palette.common.white : 'text.primary';

  return (
    <Paper
      elevation={variant === 'live' ? 6 : 0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        background: bg,
        color,
        border: variant === 'live' ? 'none' : 1,
        borderColor: isSched ? 'primary.light' : 'divider',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {variant === 'live' ? (
        <Chip
          label="LIVE"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: alpha('#f43f5e', 0.95),
            color: '#fff',
            fontWeight: 900,
            letterSpacing: 1,
            animation: 'bpBlink 1.2s ease-in-out infinite',
            '@keyframes bpBlink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.72 } }
          }}
        />
      ) : null}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ bgcolor: variant === 'live' ? alpha('#fff', 0.2) : 'primary.main', color: variant === 'live' ? '#fff' : 'primary.contrastText', fontWeight: 800 }}>
          {space.host.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25, color }}>
            {space.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: variant === 'live' ? alpha('#fff', 0.85) : 'text.secondary' }}>
            Host {space.host.name} · {space.host.handle}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1.25 }}>
            {(space.topics || []).map((t) => (
              <Chip key={t} label={t} size="small" variant={variant === 'live' ? 'filled' : 'outlined'} sx={variant === 'live' ? { bgcolor: alpha('#fff', 0.12), color: '#fff' } : {}} />
            ))}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap" useFlexGap>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TeamOutlined style={{ opacity: variant === 'live' ? 0.9 : 0.7 }} />
              <Typography variant="body2" sx={{ color: variant === 'live' ? alpha('#fff', 0.9) : 'text.secondary', fontWeight: 600 }}>
                {space.displayListeners} listening
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: variant === 'live' ? alpha('#fff', 0.65) : 'text.disabled' }}>
              {isLive && space.startedAt ? `Started ${formatWhen(space.startedAt)}` : null}
              {isSched && space.scheduledFor ? formatWhen(space.scheduledFor) : null}
              {space.status === 'ended' ? `Ended ${formatWhen(space.endedAt || space.startedAt)}` : null}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
            {isLive ? (
              <>
                <Button
                  variant={joined ? 'outlined' : 'contained'}
                  color={joined ? 'inherit' : 'secondary'}
                  onClick={() => onJoin(space)}
                  sx={{
                    fontWeight: 800,
                    textTransform: 'none',
                    borderColor: joined ? alpha('#fff', 0.5) : undefined,
                    color: joined ? '#fff' : undefined
                  }}
                >
                  {joined ? 'Leave' : 'Join live'}
                </Button>
                <Button variant="text" onClick={() => onOpenDetail(space)} sx={{ color: variant === 'live' ? alpha('#fff', 0.9) : 'primary', fontWeight: 700, textTransform: 'none' }}>
                  About Space
                </Button>
              </>
            ) : null}
            {isSched ? (
              <>
                <Button variant="contained" onClick={() => onRemind(space)} startIcon={hasReminder ? <BellFilled /> : <BellOutlined />} sx={{ fontWeight: 700, textTransform: 'none' }}>
                  {hasReminder ? 'Reminder on' : 'Remind me'}
                </Button>
                <Button variant="outlined" onClick={() => onOpenDetail(space)} sx={{ fontWeight: 700, textTransform: 'none' }}>
                  Details
                </Button>
              </>
            ) : null}
            {space.status === 'ended' ? (
              <Button variant="outlined" disabled sx={{ fontWeight: 700, textTransform: 'none' }}>
                Replay (soon)
              </Button>
            ) : null}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

function VoicesInner() {
  const theme = useTheme();
  const { live, upcoming, ended, joinLive, leaveLive, toggleReminder, hasReminder, createSpace } = useVoicesSpaces();
  const [joinedId, setJoinedId] = useState(null);
  const [joinedSpace, setJoinedSpace] = useState(null);
  const [detail, setDetail] = useState(null);
  const [hostOpen, setHostOpen] = useState(false);
  const [hostErr, setHostErr] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    hostName: '',
    hostHandle: '',
    topics: 'Nifty, Discussion',
    mode: 'live',
    scheduledFor: ''
  });

  const dockSpace = useMemo(() => {
    if (!joinedId) return null;
    return live.find((s) => s.id === joinedId) || joinedSpace;
  }, [joinedId, live, joinedSpace]);

  const handleJoin = (space) => {
    if (joinedId === space.id) {
      leaveLive(space.id);
      setJoinedId(null);
      setJoinedSpace(null);
      return;
    }
    joinLive(space.id, joinedId);
    setJoinedId(space.id);
    setJoinedSpace(space);
  };

  const submitHost = () => {
    setHostErr('');
    if (!form.title.trim() || !form.description.trim() || !form.hostName.trim()) {
      setHostErr('Title, description, and host name are required.');
      return;
    }
    if (form.mode === 'scheduled' && !form.scheduledFor) {
      setHostErr('Pick a date and time for a scheduled Space.');
      return;
    }
    createSpace(form);
    setHostOpen(false);
    setForm({
      title: '',
      description: '',
      hostName: '',
      hostHandle: '',
      topics: 'Nifty, Discussion',
      mode: 'live',
      scheduledFor: ''
    });
  };

  return (
    <Stack spacing={3} sx={{ px: { xs: 2, sm: 3 }, py: 2, pb: joinedId ? 18 : 2 }}>
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
          <SoundOutlined style={{ fontSize: 36, color: theme.palette.secondary.main }} />
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Voices
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 900 }}>
          Twitter <strong>Spaces</strong>-style rooms for Indian market folks: live audio hangouts, scheduled sessions, and replays (placeholder). Host a room,
          join listeners, set reminders — demo data lives in your browser until you wire Agora / LiveKit / 100ms.
        </Typography>
      </Box>

      <Alert severity="info">
        No real audio is streamed here. Ship WebRTC or a vendor SDK for production; add moderation and SEBI-appropriate disclaimers before public market calls.
      </Alert>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Button variant="contained" size="large" onClick={() => setHostOpen(true)} sx={{ fontWeight: 800, textTransform: 'none' }}>
          Start a Space
        </Button>
        <Typography variant="body2" color="text.secondary">
          {live.length} live · {upcoming.length} upcoming · {ended.length} past
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={800}>
          Live now
        </Typography>
        {live.length === 0 ? (
          <Typography color="text.secondary">No live Spaces right now. Start one or check back later.</Typography>
        ) : (
          <Stack spacing={2}>
            {live.map((s) => (
              <SpaceCard key={s.id} space={s} variant="live" onJoin={handleJoin} onOpenDetail={setDetail} joinedId={joinedId} />
            ))}
          </Stack>
        )}
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={800}>
          Upcoming
        </Typography>
        {upcoming.length === 0 ? (
          <Typography color="text.secondary">Nothing scheduled.</Typography>
        ) : (
          <Stack spacing={2}>
            {upcoming.map((s) => (
              <SpaceCard
                key={s.id}
                space={s}
                variant="scheduled"
                onJoin={() => {}}
                onOpenDetail={setDetail}
                joinedId={null}
                onRemind={() => toggleReminder(s.id)}
                hasReminder={hasReminder(s.id)}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={800}>
          Recently ended
        </Typography>
        <Stack spacing={2}>
          {ended.map((s) => (
            <SpaceCard key={s.id} space={s} variant="ended" onJoin={() => {}} onOpenDetail={setDetail} joinedId={null} />
          ))}
        </Stack>
      </Stack>

      <Dialog open={Boolean(detail)} onClose={() => setDetail(null)} maxWidth="sm" fullWidth>
        {detail ? (
          <>
            <DialogTitle>{detail.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {detail.host.name} · {detail.host.handle}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                {detail.description}
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Speakers
              </Typography>
              <Stack spacing={0.5}>
                {(detail.speakers || []).map((sp) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={sp}>
                    <UserOutlined />
                    <Typography variant="body2">{sp}</Typography>
                  </Stack>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetail(null)}>Close</Button>
              {detail.status === 'live' ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    handleJoin(detail);
                    setDetail(null);
                  }}
                >
                  {joinedId === detail.id ? 'Leave Space' : 'Join live'}
                </Button>
              ) : null}
            </DialogActions>
          </>
        ) : null}
      </Dialog>

      <Dialog open={hostOpen} onClose={() => setHostOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start a Space</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 0.5 }}>
            {hostErr ? <Alert severity="error">{hostErr}</Alert> : null}
            <TextField label="Space title" fullWidth value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <TextField label="What will you talk about?" fullWidth multiline minRows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            <TextField label="Your name (as host)" fullWidth value={form.hostName} onChange={(e) => setForm((f) => ({ ...f, hostName: e.target.value }))} />
            <TextField label="Handle (optional)" fullWidth placeholder="@you" value={form.hostHandle} onChange={(e) => setForm((f) => ({ ...f, hostHandle: e.target.value }))} />
            <TextField label="Topics (comma separated)" fullWidth value={form.topics} onChange={(e) => setForm((f) => ({ ...f, topics: e.target.value }))} />
            <Typography variant="subtitle2">When</Typography>
            <ToggleButtonGroup exclusive value={form.mode} onChange={(_, v) => v && setForm((f) => ({ ...f, mode: v }))} color="primary" size="small">
              <ToggleButton value="live">Go live now</ToggleButton>
              <ToggleButton value="scheduled">Schedule</ToggleButton>
            </ToggleButtonGroup>
            {form.mode === 'scheduled' ? (
              <TextField type="datetime-local" label="Starts at" InputLabelProps={{ shrink: true }} fullWidth value={form.scheduledFor} onChange={(e) => setForm((f) => ({ ...f, scheduledFor: e.target.value }))} />
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHostOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitHost} sx={{ fontWeight: 800 }}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      {dockSpace && joinedId ? (
        <Paper
          elevation={12}
          sx={{
            position: 'fixed',
            left: { xs: 8, sm: 24 },
            right: { xs: 8, sm: 24 },
            bottom: 16,
            zIndex: theme.zIndex.drawer + 2,
            borderRadius: 3,
            p: 2,
            background: `linear-gradient(90deg, ${alpha('#4c1d95', 0.97)} 0%, ${alpha('#312e81', 0.98)} 100%)`,
            color: '#fff',
            border: 1,
            borderColor: alpha('#fff', 0.12)
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center" flex={1} minWidth={0}>
              <WaveBars />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={800} noWrap>
                  {dockSpace.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ opacity: 0.85 }}>
                  <AudioMutedOutlined />
                  <Typography variant="caption">You are muted (demo) · audio off</Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={`${dockSpace.displayListeners} in room`} size="small" sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', display: { xs: 'none', sm: 'flex' } }} />
              <IconButton
                aria-label="Leave space"
                onClick={() => {
                  leaveLive(joinedId);
                  setJoinedId(null);
                  setJoinedSpace(null);
                }}
                sx={{ color: '#fff', bgcolor: alpha('#fff', 0.1) }}
              >
                <CloseOutlined />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}

export default function Voices() {
  return (
    <VoicesSpacesProvider>
      <VoicesInner />
    </VoicesSpacesProvider>
  );
}
