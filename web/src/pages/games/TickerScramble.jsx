import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { SCRAMBLE_TICKERS } from 'data/stockMarketGameTickers';

const ROUNDS = 6;

function shuffleStr(s) {
  const arr = s.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const out = arr.join('');
  return out === s ? shuffleStr(s) : out;
}

function pickRounds() {
  const a = [...SCRAMBLE_TICKERS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, ROUNDS);
}

export default function TickerScramble() {
  const rounds = useMemo(() => pickRounds(), []);
  const [ix, setIx] = useState(0);
  const [scrambled, setScrambled] = useState(() => shuffleStr(rounds[0].symbol));
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);

  const current = rounds[ix];

  useEffect(() => {
    if (done || !rounds[ix]) return;
    setScrambled(shuffleStr(rounds[ix].symbol));
    setInput('');
    setFeedback('');
    setBusy(false);
  }, [ix, done, rounds]);

  const goNext = useCallback((correct, symbol) => {
    if (correct) setScore((x) => x + 1);
    setFeedback(correct ? 'Correct — +1' : `Answer: ${symbol}`);
    window.setTimeout(() => {
      setIx((i) => {
        if (i + 1 >= ROUNDS) {
          setDone(true);
          return i;
        }
        return i + 1;
      });
    }, correct ? 400 : 650);
  }, []);

  const submit = () => {
    if (done || !current || busy) return;
    setBusy(true);
    const ok = input.trim().toUpperCase() === current.symbol;
    goNext(ok, current.symbol);
  };

  const reset = () => window.location.reload();

  if (!current && !done) return null;

  return (
    <Container maxWidth="sm">
      <Button component={RouterLink} to="/games" startIcon={<ArrowLeftOutlined />} sx={{ mb: 2 }}>
        All games
      </Button>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Ticker scramble
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Round {Math.min(ix + 1, ROUNDS)} of {ROUNDS} — take your time, then submit.
      </Typography>

      {!done && current && (
        <MainCard>
          <Typography variant="caption" color="text.secondary">
            Hint
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {current.hint}
          </Typography>
          <Typography variant="h3" fontWeight={900} letterSpacing={2} sx={{ mb: 0.5, fontFamily: 'monospace' }}>
            {scrambled}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Unscramble the NSE-style symbol
          </Typography>
          <TextField
            fullWidth
            label="Your answer"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            autoFocus
            inputProps={{ style: { textTransform: 'uppercase' } }}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={submit} disabled={busy}>
              Submit
            </Button>
          </Stack>
          {feedback && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {feedback}
            </Typography>
          )}
        </MainCard>
      )}

      {done && (
        <MainCard>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Finished
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={900}>
            {score} / {ROUNDS}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            Symbols are for practice only.
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
