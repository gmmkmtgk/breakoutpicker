import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LikeFilled from '@ant-design/icons/LikeFilled';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { ShortsHubProvider, useShortsHub } from 'contexts/ShortsHubContext';
import { formatShortCount, formatShortDuration, STOCK_MARKET_SHORTS } from 'data/stockMarketShorts';

const VIEWPORT_SX = {
  height: { xs: 'calc(100dvh - 132px)', sm: 'calc(100dvh - 148px)' },
  maxHeight: { xs: 'none', sm: 720 },
  minHeight: { xs: 420, sm: 480 }
};

function ReelSlide({ item, onShare }) {
  const theme = useTheme();
  const { toggleLike, isLiked } = useShortsHub();
  const [a, b] = item.thumb || ['#0f172a', '#334155'];
  const liked = isLiked(item.id);

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bgcolor: '#000',
        borderBottom: (t) => `1px solid ${alpha(t.palette.common.white, 0.08)}`
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: { xs: '100%', sm: 420 },
          mx: 'auto',
          aspectRatio: { xs: '9/16', sm: '9/16' },
          maxHeight: '100%',
          borderRadius: { xs: 0, sm: 2 },
          overflow: 'hidden',
          background: `linear-gradient(160deg, ${a} 0%, ${b} 55%, #0a0a0a 100%)`
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 50% at 50% 18%, ${alpha('#fff', 0.14)} 0%, transparent 55%)`,
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none'
          }}
        >
          <Chip size="small" label={formatShortDuration(item.durationSec)} sx={{ bgcolor: alpha('#000', 0.55), color: '#fff', fontWeight: 700 }} />
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.85), fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            Demo clip
          </Typography>
        </Box>

        <Stack
          direction="column"
          spacing={1.5}
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 100,
            alignItems: 'center'
          }}
        >
          <Tooltip title={liked ? 'Unlike' : 'Like'}>
            <IconButton
              onClick={() => toggleLike(item.id)}
              sx={{
                bgcolor: alpha('#000', 0.35),
                color: liked ? theme.palette.error.main : '#fff',
                '&:hover': { bgcolor: alpha('#000', 0.5) }
              }}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              {liked ? <LikeFilled /> : <LikeOutlined />}
            </IconButton>
          </Tooltip>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            {formatShortCount(item.likes)}
          </Typography>
          <Tooltip title="Share">
            <IconButton
              onClick={() => onShare?.()}
              sx={{
                bgcolor: alpha('#000', 0.35),
                color: '#fff',
                '&:hover': { bgcolor: alpha('#000', 0.5) }
              }}
              aria-label="Share"
            >
              <ShareAltOutlined />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 56,
            bottom: 0,
            p: 2,
            pb: 2.5,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.75))'
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: alpha('#fff', 0.2),
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 15,
                border: `2px solid ${alpha('#fff', 0.35)}`
              }}
            >
              {item.channel.initial}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800 }}>
                {item.channel.name}
              </Typography>
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.75) }}>
                {item.channel.handle}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.45, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {item.caption}
          </Typography>
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.8), mt: 1, display: 'block' }}>
            {item.hashtags.map((h) => `#${h}`).join(' ')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function ShortsInner() {
  const theme = useTheme();
  const [shareTip, setShareTip] = useState(false);
  const [hint, setHint] = useState(true);

  const onShare = useCallback(() => {
    const url = `${window.location.origin}/shorts`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => setShareTip(true));
    } else {
      setShareTip(true);
    }
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        useFlexGap
        sx={{ gap: 1.5, mb: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <RiseOutlined style={{ fontSize: 28, color: theme.palette.success.main }} />
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
              Market Reels
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scroll one clip at a time — stock ideas in seconds (demo catalog).
            </Typography>
          </Box>
        </Stack>
        <Chip
          component={RouterLink}
          to="/videos"
          clickable
          icon={<VideoCameraOutlined />}
          label="Full videos"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      </Stack>

      {hint && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          Tip: use your mouse wheel or drag the scrollbar to snap between reels.
        </Typography>
      )}

      <Box
        onScroll={() => hint && setHint(false)}
        sx={{
          ...VIEWPORT_SX,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: (t) => (t.palette.mode === 'dark' ? `0 0 0 1px ${alpha('#fff', 0.06)} inset` : 'none')
        }}
      >
        {STOCK_MARKET_SHORTS.map((item) => (
          <ReelSlide key={item.id} item={item} onShare={onShare} />
        ))}
      </Box>

      <Snackbar open={shareTip} autoHideDuration={2200} onClose={() => setShareTip(false)} message="Reels hub link copied when clipboard is available" anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  );
}

export default function Shorts() {
  return (
    <ShortsHubProvider>
      <ShortsInner />
    </ShortsHubProvider>
  );
}
