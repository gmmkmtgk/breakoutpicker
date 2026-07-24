import { useMemo, useState } from 'react';

import BookOutlined from '@ant-design/icons/BookOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import MainCard from 'components/MainCard';
import { BOOK_THEMES, STOCK_MARKET_BOOKS } from 'data/stockMarketBooks';
import { amazonInAffiliateUrl, flipkartSearchUrl } from 'utils/affiliateLinks';

export default function Books() {
  const theme = useTheme();
  const [themeId, setThemeId] = useState('all');
  const [query, setQuery] = useState('');

  const hasAmazonTag = Boolean(import.meta.env.VITE_AMAZON_AFFILIATE_TAG);
  const hasFlipkartAff = Boolean(import.meta.env.VITE_FLIPKART_AFFILIATE_ID);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STOCK_MARKET_BOOKS.filter((b) => {
      if (themeId !== 'all' && !b.themes.includes(themeId)) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.blurb.toLowerCase().includes(q)
      );
    });
  }, [themeId, query]);

  return (
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
          <BookOutlined style={{ fontSize: 36, color: theme.palette.primary.main }} />
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Books
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 960 }}>
          Curated reads on Indian and global markets — fundamentals, trading psychology, derivatives, and personal finance. Buy via{' '}
          <strong>Amazon.in</strong> or <strong>Flipkart</strong>; when you configure affiliate IDs below, qualifying purchases can support this site at no
          extra cost to readers.
        </Typography>
      </Box>

      <Alert severity="info" icon={<ShoppingCartOutlined />}>
        <Typography variant="body2" component="span" display="block" gutterBottom>
          <strong>Affiliate disclosure:</strong> Purchase links may include our partner parameters. You pay the same retail price; the retailer may share a
          small commission with us. We do not guarantee availability or pricing — always verify on the store page.
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          Configure <code>VITE_AMAZON_AFFILIATE_TAG</code> (Amazon Associates India) and optionally <code>VITE_FLIPKART_AFFILIATE_ID</code> in{' '}
          <code>.env</code>, then rebuild. Amazon tag: {hasAmazonTag ? 'set' : 'not set'} · Flipkart aff: {hasFlipkartAff ? 'set' : 'not set'}.
        </Typography>
      </Alert>

      <MainCard>
        <Stack spacing={2}>
          <TextField
            size="small"
            placeholder="Search title, author, or topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ maxWidth: 420 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BookOutlined style={{ opacity: 0.6 }} />
                </InputAdornment>
              )
            }}
          />
          <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
            {BOOK_THEMES.map((t) => (
              <Chip
                key={t.id}
                label={t.label}
                onClick={() => setThemeId(t.id)}
                color={themeId === t.id ? 'primary' : 'default'}
                variant={themeId === t.id ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Stack>
      </MainCard>

      <Grid container spacing={2}>
        {filtered.map((book) => (
          <Grid item xs={12} sm={6} lg={4} key={book.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: 3,
                borderColor: 'primary.main',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 2.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 64,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <BookOutlined style={{ fontSize: 26, color: theme.palette.primary.main }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {book.author}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={0.5} useFlexGap sx={{ mb: 1.5 }}>
                  {book.themes.map((tid) => {
                    const lab = BOOK_THEMES.find((x) => x.id === tid);
                    if (!lab || lab.id === 'all') return null;
                    return <Chip key={tid} label={lab.label} size="small" variant="outlined" />;
                  })}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ flex: 1, mb: 2 }}>
                  {book.blurb}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <Button
                    component={Link}
                    href={amazonInAffiliateUrl(book.amazonAsin)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    variant="contained"
                    size="medium"
                    fullWidth
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                  >
                    Amazon.in
                  </Button>
                  <Button
                    component={Link}
                    href={flipkartSearchUrl(book.flipkartQuery)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                  >
                    Flipkart
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No books match this filter. Try another theme or clear the search.
        </Typography>
      ) : null}

      <Typography variant="caption" color="text.secondary" display="block" sx={{ maxWidth: 720 }}>
        Title list is editorial only; we are not the publisher. For Flipkart, links use search results so the correct edition is easy to pick — replace with
        official affiliate deep links from your Flipkart dashboard if you prefer exact SKUs.
      </Typography>
    </Stack>
  );
}
