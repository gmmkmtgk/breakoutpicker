import { useMemo, useState } from 'react';

import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import ReloadOutlined from '@ant-design/icons/ReloadOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useSWR from 'swr';

import MainCard from 'components/MainCard';
import { INDIAN_MARKET_NEWS_FEEDS } from 'data/indianMarketNewsFeeds';

const SWR_KEY = 'indian-market-news-v1';

function stripHtml(html) {
  if (!html) return '';
  const t = String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > 320 ? `${t.slice(0, 317)}…` : t;
}

function formatPubDate(isoOrStr) {
  if (!isoOrStr) return '';
  const d = new Date(isoOrStr);
  if (Number.isNaN(d.getTime())) return String(isoOrStr);
  return d.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

async function rssToJson(rssUrl) {
  const apiKey = import.meta.env.VITE_RSS2JSON_API_KEY;
  const u = new URL('https://api.rss2json.com/v1/api.json');
  u.searchParams.set('rss_url', rssUrl);
  if (apiKey) u.searchParams.set('api_key', apiKey);
  const res = await fetch(u.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'Feed parse error');
  return json;
}

async function fetchMergedIndianMarketNews() {
  const settled = await Promise.allSettled(
    INDIAN_MARKET_NEWS_FEEDS.map(async (f) => {
      const json = await rssToJson(f.rss);
      const items = json.items || [];
      return items.map((item) => ({
        title: item.title?.trim() || 'Untitled',
        link: item.link || '#',
        pubDate: item.pubDate,
        description: stripHtml(item.description || item.content || ''),
        thumbnail: item.thumbnail || item.enclosure?.link,
        sourceId: f.id,
        sourceLabel: f.label,
        feedTitle: json.feed?.title || f.label
      }));
    })
  );

  const errors = [];
  const rows = [];
  settled.forEach((r, i) => {
    if (r.status === 'fulfilled') rows.push(...r.value);
    else errors.push(`${INDIAN_MARKET_NEWS_FEEDS[i].label}: ${r.reason?.message || 'failed'}`);
  });

  const seen = new Set();
  const deduped = [];
  for (const it of rows) {
    const key = it.link || it.title;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    deduped.push(it);
  }

  deduped.sort((a, b) => {
    const ta = new Date(a.pubDate).getTime();
    const tb = new Date(b.pubDate).getTime();
    return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
  });

  return { items: deduped.slice(0, 60), errors, okCount: settled.filter((x) => x.status === 'fulfilled').length };
}

export default function News() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');

  const { data, error, isLoading, isValidating, mutate } = useSWR(SWR_KEY, fetchMergedIndianMarketNews, {
    revalidateOnFocus: true,
    dedupingInterval: 5 * 60 * 1000,
    refreshInterval: 15 * 60 * 1000
  });

  const filtered = useMemo(() => {
    const items = data?.items || [];
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (source !== 'all' && it.sourceId !== source) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.sourceLabel.toLowerCase().includes(q)
      );
    });
  }, [data, query, source]);

  const partialNote = data?.errors?.length && data?.okCount > 0;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          News
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          Headlines pulled from major <strong>India markets</strong> RSS wires (Moneycontrol, Economic Times, Business Standard, Mint, and a Google News
          India query). Stories open on the publisher site in a new tab.
        </Typography>
      </Box>

      <Alert severity="info" icon={<GlobalOutlined />}>
        Data is loaded in your browser via{' '}
        <Link href="https://rss2json.com/" target="_blank" rel="noopener noreferrer">
          rss2json
        </Link>
        . If feeds are empty or stale, set <code>VITE_RSS2JSON_API_KEY</code> in <code>.env</code> (free tier on rss2json) and rebuild.
      </Alert>

      {error ? (
        <Alert severity="error" action={<Button onClick={() => mutate()}>Retry</Button>}>
          Could not load news: {error.message}
        </Alert>
      ) : null}

      {data?.errors?.length && !error ? (
        <Alert severity={partialNote ? 'warning' : 'error'}>
          {partialNote
            ? `Some feeds failed (${data.errors.length}). Showing ${data.items.length} articles from working sources.`
            : `All feeds failed: ${data.errors.join(' · ')}`}
        </Alert>
      ) : null}

      <MainCard>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} flexWrap="wrap" useFlexGap>
            <TextField
              size="small"
              placeholder="Filter headlines…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: { sm: 260 }, flex: { sm: '1 1 240px' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined style={{ opacity: 0.65 }} />
                  </InputAdornment>
                )
              }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              <Chip
                label="All sources"
                onClick={() => setSource('all')}
                color={source === 'all' ? 'primary' : 'default'}
                variant={source === 'all' ? 'filled' : 'outlined'}
              />
              {INDIAN_MARKET_NEWS_FEEDS.map((f) => (
                <Chip
                  key={f.id}
                  label={f.label}
                  onClick={() => setSource(f.id)}
                  color={source === f.id ? 'primary' : 'default'}
                  variant={source === f.id ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
              <Button
                startIcon={isValidating ? <CircularProgress size={16} color="inherit" /> : <ReloadOutlined />}
                onClick={() => mutate()}
                disabled={isValidating}
                variant="outlined"
                size="small"
              >
                Refresh
              </Button>
            </Stack>
          </Stack>

          {isLoading && !data ? (
            <Stack alignItems="center" py={6} spacing={2}>
              <CircularProgress />
              <Typography color="text.secondary">Loading Indian market headlines…</Typography>
            </Stack>
          ) : null}

          {!isLoading && !error && filtered.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 4 }}>
              No articles match your filter, or every feed failed. Try Refresh or widen the search.
            </Typography>
          ) : null}

          <Stack spacing={1.5}>
            {filtered.map((it, idx) => (
              <Card
                key={`${it.link}-${idx}`}
                variant="outlined"
                sx={{
                  borderLeft: 3,
                  borderColor: 'primary.main',
                  transition: 'background-color 0.15s',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.08 : 0.04) }
                }}
              >
                <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                      <Chip size="small" label={it.sourceLabel} variant="outlined" />
                      <Typography variant="caption" color="text.secondary">
                        {formatPubDate(it.pubDate)}
                      </Typography>
                    </Stack>
                    <Link
                      href={it.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ fontWeight: 700, fontSize: '1.05rem', color: 'text.primary' }}
                    >
                      {it.title}
                    </Link>
                    {it.description ? (
                      <Typography variant="body2" color="text.secondary">
                        {it.description}
                      </Typography>
                    ) : null}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </MainCard>
    </Stack>
  );
}
