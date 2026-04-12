import { Link as RouterLink } from 'react-router-dom';

import RiseOutlined from '@ant-design/icons/RiseOutlined';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import SortAscendingOutlined from '@ant-design/icons/SortAscendingOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const GAMES = [
  {
    slug: '/games/market-quiz',
    title: 'Market Quiz',
    blurb: 'Ten quick MCQs on markets, orders, and common terms.',
    icon: QuestionCircleOutlined,
    color: '#2563eb'
  },
  {
    slug: '/games/ticker-scramble',
    title: 'Ticker Scramble',
    blurb: 'Unscramble NSE-style symbols before the timer runs out.',
    icon: SortAscendingOutlined,
    color: '#059669'
  },
  {
    slug: '/games/bull-or-bear',
    title: 'Bull or Bear',
    blurb: 'Read the headline — tap bull or bear for broad market sentiment.',
    icon: ThunderboltOutlined,
    color: '#d97706'
  }
];

export default function GamesHub() {
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <RiseOutlined style={{ fontSize: 36, color: '#16a34a' }} />
        <Box>
          <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
            Stock market games
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Short, educational mini-games — for practice and fun, not trading advice.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {GAMES.map((g) => {
          const Ico = g.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={g.slug}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                <CardActionArea component={RouterLink} to={g.slug} sx={{ height: '100%', alignItems: 'stretch' }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${g.color}22`,
                          color: g.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Ico style={{ fontSize: 26 }} />
                      </Box>
                      <Typography variant="h5" fontWeight={800}>
                        {g.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {g.blurb}
                      </Typography>
                      <Typography variant="subtitle2" color="primary" fontWeight={700}>
                        Play →
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
