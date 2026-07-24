import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { BULL_BEAR_PROMPTS } from 'data/stockMarketBullBear';

const ROUNDS = 8;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BullOrBear() {
  const prompts = useMemo(() => shuffle(BULL_BEAR_PROMPTS).slice(0, ROUNDS), []);
  const [ix, setIx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  const p = prompts[ix];
  const progress = done ? 100 : ((ix + (picked ? 1 : 0)) / ROUNDS) * 100;

  const onPick = (side) => {
    if (picked || done || !p) return;
    setPicked(side);
    if (side === p.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (!picked) return;
    if (ix + 1 >= ROUNDS) {
      setDone(true);
      return;
    }
    setIx((i) => i + 1);
    setPicked(null);
  };

  const reset = () => window.location.reload();

  return (
    <Container maxWidth="sm">
      <Button component={RouterLink} to="/games" startIcon={<ArrowLeftOutlined />} sx={{ mb: 2 }}>
        All games
      </Button>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Bull or bear
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {ROUNDS} headlines · broad market sentiment (simplified quiz)
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 8, borderRadius: 1 }} />

      {!done && p && (
        <MainCard>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Round {ix + 1} of {ROUNDS}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.5 }}>
            {p.text}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              variant={picked === 'bull' ? 'contained' : 'outlined'}
              color="success"
              startIcon={<RiseOutlined />}
              onClick={() => onPick('bull')}
              disabled={picked !== null}
              sx={{ py: 2 }}
            >
              Bull
            </Button>
            <Button
              fullWidth
              size="large"
              variant={picked === 'bear' ? 'contained' : 'outlined'}
              color="error"
              startIcon={<ArrowDownOutlined />}
              onClick={() => onPick('bear')}
              disabled={picked !== null}
              sx={{ py: 2 }}
            >
              Bear
            </Button>
          </Stack>
          {picked && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight={600} color={picked === p.answer ? 'success.main' : 'error.main'}>
                {picked === p.answer ? 'Right call.' : `Answer: ${p.answer === 'bull' ? 'Bull' : 'Bear'}`}
              </Typography>
              <Button sx={{ mt: 1 }} variant="contained" onClick={next}>
                {ix + 1 >= ROUNDS ? 'See results' : 'Next'}
              </Button>
            </Box>
          )}
        </MainCard>
      )}

      {done && (
        <MainCard>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Results
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={900}>
            {score} / {ROUNDS}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            Headlines are stylised — real markets need more context.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={reset}>
              Play again
            </Button>
            <Button component={RouterLink} to="/games" variant="outlined">
              Lobby
            </Button>
          </Stack>
        </MainCard>
      )}
    </Container>
  );
}
