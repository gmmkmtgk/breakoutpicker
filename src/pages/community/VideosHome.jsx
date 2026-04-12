import React, { useMemo, useState } from 'react';
import { Link as RouterLink, useOutletContext } from 'react-router-dom';

import FireOutlined from '@ant-design/icons/FireOutlined';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { formatDuration, formatViews, STOCK_MARKET_VIDEOS, VIDEO_CATEGORIES } from 'data/stockMarketVideos';

function formatUploaded(iso) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function matchesSearch(v, q) {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    v.title.toLowerCase().includes(s) ||
    v.description.toLowerCase().includes(s) ||
    v.channel.name.toLowerCase().includes(s) ||
    v.channel.handle.toLowerCase().includes(s)
  );
}

function VideoThumb({ video }) {
  const [a, b] = video.thumb || ['#334155', '#0f172a'];
  return (
    <Box
      sx={{
        position: 'relative',
        pt: '56.25%',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'grey.900',
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 30% 20%, ${alpha('#fff', 0.12)} 0%, transparent 45%)`
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          bgcolor: alpha('#000', 0.78),
          color: '#fff',
          fontWeight: 600,
          fontSize: 12
        }}
      >
        {formatDuration(video.durationSec)}
      </Typography>
    </Box>
  );
}

function VideoMeta({ video }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ mt: 1, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          flexShrink: 0
        }}
      >
        {video.channel.initial}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {video.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
          {video.channel.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatViews(video.views)} · {formatUploaded(video.uploadedAt)}
        </Typography>
      </Box>
    </Stack>
  );
}

function VideoCard({ video }) {
  return (
    <Box>
      <CardActionArea component={RouterLink} to={`/videos/watch/${video.id}`} sx={{ borderRadius: 2 }}>
        <VideoThumb video={video} />
      </CardActionArea>
      <VideoMeta video={video} />
    </Box>
  );
}

export default function VideosHome() {
  const { search } = useOutletContext();
  const [category, setCategory] = useState('all');

  const trending = useMemo(() => [...STOCK_MARKET_VIDEOS].sort((a, b) => b.views - a.views).slice(0, 8), []);

  const filtered = useMemo(() => {
    return STOCK_MARKET_VIDEOS.filter((v) => {
      if (category !== 'all' && v.category !== category) return false;
      return matchesSearch(v, search || '');
    });
  }, [category, search]);

  const showTrendingRow = category === 'all' && !(search || '').trim();

  const listForGrid = useMemo(() => {
    if (!showTrendingRow) return filtered;
    const tid = new Set(trending.map((t) => t.id));
    return filtered.filter((v) => !tid.has(v.id));
  }, [filtered, showTrendingRow, trending]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1, mb: 3 }}>
        {VIDEO_CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            onClick={() => setCategory(c.id)}
            color={category === c.id ? 'primary' : 'default'}
            variant={category === c.id ? 'filled' : 'outlined'}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Stack>

      {showTrendingRow && (
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <FireOutlined style={{ color: '#f97316' }} />
            <Typography variant="h6" fontWeight={800}>
              Trending in markets
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }
            }}
          >
            {trending.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </Box>
        </Box>
      )}

      {(listForGrid.length > 0 || !showTrendingRow) && (
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          {(search || '').trim()
            ? `Results (${filtered.length})`
            : category === 'all' && showTrendingRow
              ? 'More videos'
              : VIDEO_CATEGORIES.find((c) => c.id === category)?.label || 'Videos'}
        </Typography>
      )}

      <Grid container spacing={2}>
        {listForGrid.map((v) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={v.id}>
            <VideoCard video={v} />
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          No videos match your filters. Try another category or search term.
        </Typography>
      )}
    </Container>
  );
}
