import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import CommentOutlined from '@ant-design/icons/CommentOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import RetweetOutlined from '@ant-design/icons/RetweetOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useBreaks } from 'contexts/BreaksContext';
import { formatRelativeTime } from 'utils/relativeTime';
import { EVALUATION_STATUS } from 'utils/breakEvaluation';

function formatInr(n) {
  if (n == null || Number.isNaN(n)) return '—';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `₹${n}`;
  }
}

function formatResolved(iso) {
  try {
    return new Date(iso).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) || 0;
  return Math.abs(h);
}

function pseudoCount(id, salt) {
  return 1 + (hashStr(`${id}:${salt}`) % 420);
}

function statusLabel(status) {
  switch (status) {
    case EVALUATION_STATUS.TARGET_HIT:
      return 'Target hit';
    case EVALUATION_STATUS.STOP_HIT:
      return 'Stop hit';
    case EVALUATION_STATUS.EXPIRED_NEUTRAL:
      return 'Neutral';
    case EVALUATION_STATUS.OPEN:
    default:
      return 'Tracking';
  }
}

export default function BreakCard({ item }) {
  const { resolveBreakDemo } = useBreaks();
  const [demoPrice, setDemoPrice] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const isSpecial = item.kind === 'special';
  const ev = item.evaluation?.status || (isSpecial ? EVALUATION_STATUS.OPEN : undefined);

  const counts = useMemo(
    () => ({
      replies: pseudoCount(item.id, 'r'),
      reposts: pseudoCount(item.id, 'p'),
      likes: pseudoCount(item.id, 'l'),
      views: pseudoCount(item.id, 'v') * 47
    }),
    [item.id]
  );

  const rel = formatRelativeTime(item.createdAt);

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.12s ease',
        cursor: 'default',
        '&:hover': { bgcolor: 'action.hover' }
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="flex-start">
        <Avatar src={item.author?.avatar} alt={item.author?.name} sx={{ width: 40, height: 40 }}>
          {item.author?.name?.[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" flexWrap="wrap" columnGap={0.5} sx={{ lineHeight: 1.2 }}>
            <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
              {item.author?.name}
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              @{item.author?.handle}
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              ·
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              {rel}
            </Typography>
            {item.symbol && (
              <>
                <Typography component="span" variant="body2" color="text.secondary">
                  ·
                </Typography>
                <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {item.symbol}
                </Typography>
              </>
            )}
            {isSpecial && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  ml: 0.5,
                  px: 0.75,
                  py: 0.125,
                  borderRadius: 1,
                  bgcolor: 'secondary.light',
                  color: 'secondary.dark',
                  fontWeight: 700
                }}
              >
                Special
              </Typography>
            )}
            {isSpecial && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  ml: 0.5,
                  px: 0.75,
                  py: 0.125,
                  borderRadius: 1,
                  fontWeight: 600,
                  bgcolor:
                    ev === EVALUATION_STATUS.TARGET_HIT
                      ? 'success.lighter'
                      : ev === EVALUATION_STATUS.STOP_HIT
                        ? 'error.lighter'
                        : 'grey.200',
                  color: 'text.secondary'
                }}
              >
                {statusLabel(ev)}
              </Typography>
            )}
          </Stack>

          <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.45 }}>
            {item.body}
          </Typography>

          {isSpecial && (
            <Box sx={{ mt: 1.25 }}>
              <Stack spacing={1}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    maxHeight: 360,
                    bgcolor: 'grey.50'
                  }}
                >
                  {item.chartImage ? (
                    <Box component="img" src={item.chartImage} alt="" sx={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ py: 4, px: 2, textAlign: 'center', color: 'text.secondary', typography: 'caption' }}>Chart (sample)</Box>
                  )}
                </Box>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ typography: 'caption', color: 'text.secondary' }}>
                  <Typography component="span" fontWeight={600} color="text.primary">
                    T {formatInr(item.targetPrice)}
                  </Typography>
                  <Typography component="span">·</Typography>
                  <Typography component="span" fontWeight={600} color="text.primary">
                    SL {formatInr(item.stopLoss)}
                  </Typography>
                  <Typography component="span">·</Typography>
                  <Typography component="span">{item.timeframe}</Typography>
                </Stack>
                {item.evaluation?.resolvedAt && (
                  <Typography variant="caption" color="text.secondary">
                    Closed {formatResolved(item.evaluation.resolvedAt)}
                    {item.evaluation.demoPrice != null ? ` · last ₹${item.evaluation.demoPrice}` : ''}
                  </Typography>
                )}
                {ev === EVALUATION_STATUS.OPEN && (
                  <>
                    <Button
                      size="small"
                      onClick={() => setShowDemo((s) => !s)}
                      sx={{ textTransform: 'none', alignSelf: 'flex-start', fontWeight: 600 }}
                    >
                      Demo resolve
                    </Button>
                    <Collapse in={showDemo}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ pt: 0.5 }}>
                        <TextField
                          size="small"
                          label="Last ₹"
                          value={demoPrice}
                          onChange={(e) => setDemoPrice(e.target.value)}
                          sx={{ maxWidth: 160 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            const n = Number(demoPrice);
                            if (!Number.isFinite(n)) return;
                            resolveBreakDemo(item.id, n);
                            setDemoPrice('');
                            setShowDemo(false);
                          }}
                        >
                          Apply
                        </Button>
                      </Stack>
                    </Collapse>
                  </>
                )}
              </Stack>
            </Box>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mt: 1.25,
              maxWidth: 420,
              color: 'text.secondary',
              '& .MuiIconButton-root': { color: 'inherit' }
            }}
          >
            <Tooltip title="Replies (soon)">
              <Stack direction="row" alignItems="center" spacing={0.25} component="span">
                <IconButton size="small" aria-label="replies">
                  <CommentOutlined style={{ fontSize: 18 }} />
                </IconButton>
                <Typography variant="caption">{counts.replies}</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Rebreaks (soon)">
              <Stack direction="row" alignItems="center" spacing={0.25} component="span">
                <IconButton size="small" aria-label="rebreak">
                  <RetweetOutlined style={{ fontSize: 18 }} />
                </IconButton>
                <Typography variant="caption">{counts.reposts}</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Likes (soon)">
              <Stack direction="row" alignItems="center" spacing={0.25} component="span">
                <IconButton size="small" aria-label="like">
                  <HeartOutlined style={{ fontSize: 18 }} />
                </IconButton>
                <Typography variant="caption">{counts.likes}</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Views">
              <Stack direction="row" alignItems="center" spacing={0.25} component="span">
                <IconButton size="small" aria-label="views" disableRipple sx={{ cursor: 'default' }}>
                  <BarChartOutlined style={{ fontSize: 18 }} />
                </IconButton>
                <Typography variant="caption">{counts.views >= 1000 ? `${(counts.views / 1000).toFixed(1)}K` : counts.views}</Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Share (soon)">
              <IconButton size="small" aria-label="share">
                <ShareAltOutlined style={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

BreakCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['general', 'special']).isRequired,
    body: PropTypes.string.isRequired,
    symbol: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      handle: PropTypes.string,
      avatar: PropTypes.string
    }),
    chartImage: PropTypes.string,
    targetPrice: PropTypes.number,
    stopLoss: PropTypes.number,
    timeframe: PropTypes.string,
    evaluation: PropTypes.shape({
      status: PropTypes.string,
      resolvedAt: PropTypes.string,
      demoPrice: PropTypes.number
    })
  }).isRequired
};
