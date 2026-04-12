import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';

import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import LikeFilled from '@ant-design/icons/LikeFilled';
import LikeOutlined from '@ant-design/icons/LikeOutlined';
import PlayCircleFilled from '@ant-design/icons/PlayCircleFilled';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { useVideosHub } from 'contexts/VideosHubContext';
import { formatDuration, formatViews, getSuggested, getVideoById } from 'data/stockMarketVideos';

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

function SuggestionRow({ video, onNavigate }) {
  const [a, b] = video.thumb || ['#334155', '#0f172a'];
  return (
    <CardActionArea
      component={RouterLink}
      to={`/videos/watch/${video.id}`}
      onClick={onNavigate}
      sx={{ borderRadius: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 0.75, px: 0.5 }}
    >
      <Box
        sx={{
          width: 168,
          flexShrink: 0,
          aspectRatio: '16/9',
          borderRadius: 1.5,
          background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            right: 6,
            bottom: 6,
            px: 0.5,
            py: 0.125,
            borderRadius: 0.75,
            bgcolor: alpha('#000', 0.75),
            color: '#fff',
            fontWeight: 600,
            fontSize: 11
          }}
        >
          {formatDuration(video.durationSec)}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700} sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.35 }}>
          {video.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {video.channel.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatViews(video.views)}
        </Typography>
      </Box>
    </CardActionArea>
  );
}

export default function VideoWatch() {
  const { videoId } = useParams();
  const video = useMemo(() => getVideoById(videoId), [videoId]);
  const { toggleLike, toggleWatchLater, toggleSubscribe, isLiked, isWatchLater, isSubscribed, recordWatch } = useVideosHub();
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (video?.id) recordWatch(video.id);
  }, [video?.id, recordWatch]);

  if (!video) {
    return <Navigate to="/videos" replace />;
  }

  const liked = isLiked(video.id);
  const later = isWatchLater(video.id);
  const subbed = isSubscribed(video.channel.key);
  const suggested = getSuggested(video.id, 10);

  const [a, b] = video.thumb || ['#334155', '#0f172a'];

  const copyShare = () => {
    const url = `${window.location.origin}/videos/watch/${video.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => setShareOpen(true));
    } else {
      setShareOpen(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 1,
                color: alpha('#fff', 0.95)
              }}
            >
              <PlayCircleFilled style={{ fontSize: 72, opacity: 0.95 }} />
              <Typography variant="body2" sx={{ px: 2, textAlign: 'center', maxWidth: 480, fontWeight: 600 }}>
                Demo player — educational catalog only, not live streams
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" fontWeight={800} sx={{ mt: 2, lineHeight: 1.25 }}>
            {video.title}
          </Typography>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} sx={{ mt: 1, columnGap: 2, rowGap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {formatViews(video.views)} · {formatUploaded(video.uploadedAt)}
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              <Button
                size="small"
                variant={liked ? 'contained' : 'outlined'}
                color={liked ? 'primary' : 'inherit'}
                startIcon={liked ? <LikeFilled /> : <LikeOutlined />}
                onClick={() => toggleLike(video.id)}
              >
                Like
              </Button>
              <Button
                size="small"
                variant={later ? 'contained' : 'outlined'}
                color={later ? 'secondary' : 'inherit'}
                startIcon={<ClockCircleOutlined />}
                onClick={() => toggleWatchLater(video.id)}
              >
                Watch later
              </Button>
              <Button size="small" variant="outlined" color="inherit" startIcon={<ShareAltOutlined />} onClick={copyShare}>
                Share
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                flexShrink: 0
              }}
            >
              {video.channel.initial}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={800}>{video.channel.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {video.channel.handle} · {video.channel.subsText}
              </Typography>
            </Box>
            <Button variant={subbed ? 'outlined' : 'contained'} color="primary" onClick={() => toggleSubscribe(video.channel.key)} sx={{ flexShrink: 0 }}>
              {subbed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
            {video.description}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
            Up next
          </Typography>
          <Stack spacing={0.5} divider={<Divider flexItem sx={{ opacity: 0.5 }} />}>
            {suggested.map((v) => (
              <SuggestionRow key={v.id} video={v} onNavigate={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Snackbar open={shareOpen} autoHideDuration={2500} onClose={() => setShareOpen(false)} message="Link ready to share (copied when supported)" anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Container>
  );
}
