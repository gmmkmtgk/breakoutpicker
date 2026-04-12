import { Link as RouterLink } from 'react-router-dom';

import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { AI_BASKETS } from 'data/aiBaskets';

function formatInr(n) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `₹${n}`;
  }
}

function pct(n) {
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

export default function AIBaskets() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          AI Baskets
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
          Curated, theme-first stock mixes — similar in spirit to smallcases — with weights generated and refreshed by our models. Open a
          basket to see allocations, demo prices, and return analytics tuned for Indian investors.
        </Typography>
      </Box>

      <Alert severity="info" variant="outlined">
        Data on this page is <strong>demo-quality</strong> for UI and education. Connect your price feed and compliance layer before
        production.
      </Alert>

      <Grid container spacing={2.5}>
        {AI_BASKETS.map((b) => (
          <Grid item xs={12} md={6} key={b.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'box-shadow 0.2s, border-color 0.2s',
                '&:hover': { boxShadow: 4, borderColor: 'primary.light' }
              }}
            >
              <CardActionArea component={RouterLink} to={`/ai-baskets/${b.id}`} sx={{ height: '100%', alignItems: 'stretch' }}>
                <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Box>
                      <Typography variant="overline" color="primary" fontWeight={700}>
                        AI basket
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.25 }}>
                        {b.title}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={pct(b.performance.return1Y)}
                      color={b.performance.return1Y >= 0 ? 'success' : 'error'}
                      sx={{ fontWeight: 800 }}
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, flex: 1 }}>
                    {b.tagline}
                  </Typography>

                  <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 2 }}>
                    {b.themes.slice(0, 3).map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" />
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 2.5, pt: 2, borderTop: 1, borderColor: 'divider' }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {b.stockCount} stocks · Min {formatInr(b.minInvest)} · {b.riskLabel} risk
                    </Typography>
                    <Button endIcon={<ArrowRightOutlined />} size="small" color="primary">
                      View
                    </Button>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <MainCard title="How it works">
        <Stack spacing={1.5} sx={{ maxWidth: 800 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>1. Pick a theme</strong> — All-weather, contrarian value, digital growth, monsoon plays, PSU reform, and more over time.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>2. See the recipe</strong> — Each stock has a target weight; we show live-style LTPs and how rupees flow per line in the
            table.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>3. Read the stats</strong> — 1Y / 3Y CAGR, alpha vs Nifty, drawdowns, volatility, Sharpe — the numbers investors scan
            first.
          </Typography>
        </Stack>
      </MainCard>
    </Stack>
  );
}
