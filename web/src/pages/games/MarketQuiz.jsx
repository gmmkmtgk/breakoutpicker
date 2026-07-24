import { useCallback, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import { MARKET_QUIZ_QUESTIONS } from 'data/stockMarketQuiz';

const QUIZ_LEN = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MarketQuiz() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  const questions = useMemo(() => shuffle(MARKET_QUIZ_QUESTIONS).slice(0, QUIZ_LEN), []);
  const q = questions[round];
  const progress = done ? 100 : ((round + (picked !== null ? 1 : 0)) / QUIZ_LEN) * 100;

  const reset = useCallback(() => {
    window.location.reload();
  }, []);

  const onPick = (idx) => {
    if (picked !== null || done || !q) return;
    setPicked(idx);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (picked === null) return;
    if (round + 1 >= QUIZ_LEN) {
      setDone(true);
      return;
    }
    setRound((r) => r + 1);
    setPicked(null);
  };

  return (
    <Container maxWidth="sm">
      <Button component={RouterLink} to="/games" startIcon={<ArrowLeftOutlined />} sx={{ mb: 2 }}>
        All games
      </Button>

      <Typography variant="h4" fontWeight={800} gutterBottom>
        Market quiz
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {QUIZ_LEN} questions · pick the best answer
      </Typography>

      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 8, borderRadius: 1 }} />

      {!done && q && (
        <MainCard>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Question {round + 1} of {QUIZ_LEN}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, lineHeight: 1.45 }}>
            {q.question}
          </Typography>
          <Stack spacing={1}>
            {q.options.map((opt, idx) => {
              return (
                <Button
                  key={opt}
                  fullWidth
                  variant={picked === idx ? 'contained' : 'outlined'}
                  color={picked === null ? 'inherit' : idx === q.correctIndex ? 'success' : idx === picked ? 'error' : 'inherit'}
                  onClick={() => onPick(idx)}
                  disabled={picked !== null}
                  sx={{ justifyContent: 'flex-start', textAlign: 'left', py: 1.25 }}
                >
                  {opt}
                </Button>
              );
            })}
          </Stack>
          {picked !== null && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
              {picked === q.correctIndex ? <CheckCircleOutlined style={{ color: '#16a34a' }} /> : <CloseCircleOutlined style={{ color: '#dc2626' }} />}
              <Typography variant="body2" color={picked === q.correctIndex ? 'success.main' : 'error.main'} fontWeight={600}>
                {picked === q.correctIndex ? 'Correct.' : `Correct answer: ${q.options[q.correctIndex]}`}
              </Typography>
            </Stack>
          )}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={next} disabled={picked === null}>
              {round + 1 >= QUIZ_LEN ? 'See results' : 'Next question'}
            </Button>
          </Box>
        </MainCard>
      )}

      {done && (
        <MainCard>
          <Typography variant="h5" fontWeight={800} gutterBottom>
            Results
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={900}>
            {score} / {QUIZ_LEN}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            {score === QUIZ_LEN ? 'Perfect score — great recall.' : score >= 7 ? 'Solid — keep learning.' : 'Review the basics and try again.'}
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
