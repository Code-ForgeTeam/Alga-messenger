import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppHeader } from '../components/AppHeader';

type Target = {
  x: number;
  y: number;
  size: number;
  id: number;
};

const GAME_DURATION_SEC = 30;
const BEST_SCORE_KEY = 'alga.game.bestScore.v1';

const readBestScore = (): number => {
  if (typeof window === 'undefined') return 0;
  const raw = Number(localStorage.getItem(BEST_SCORE_KEY) || 0);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
};

export default function GamePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const areaRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(readBestScore);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SEC);
  const [running, setRunning] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);

  const spawnTarget = () => {
    const area = areaRef.current;
    const width = Math.max(240, area?.clientWidth ?? 320);
    const height = Math.max(260, area?.clientHeight ?? 420);
    const size = 52 + Math.floor(Math.random() * 28);
    const maxX = Math.max(6, width - size - 6);
    const maxY = Math.max(6, height - size - 6);
    idRef.current += 1;
    setTarget({
      x: 6 + Math.round(Math.random() * maxX),
      y: 6 + Math.round(Math.random() * maxY),
      size,
      id: idRef.current,
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION_SEC);
    setRunning(true);
    spawnTarget();
  };

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setTarget(null);
      return;
    }

    const timerId = window.setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [running, timeLeft]);

  useEffect(() => {
    if (!running) return;
    const moveEvery = Math.max(320, 900 - score * 7);
    const timerId = window.setTimeout(spawnTarget, moveEvery);
    return () => window.clearTimeout(timerId);
  }, [running, score, target?.id]);

  useEffect(() => {
    if (running || score <= 0) return;
    if (score <= bestScore) return;
    setBestScore(score);
    if (typeof window !== 'undefined') {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
    }
  }, [running, score, bestScore]);

  const accuracy = useMemo(() => {
    if (!running && timeLeft === GAME_DURATION_SEC && score === 0) return 0;
    return Math.round((score / Math.max(1, GAME_DURATION_SEC - timeLeft)) * 10) / 10;
  }, [score, timeLeft, running]);

  return (
    <Box
      sx={{
        p: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 96px)',
        height: '100%',
        overflowY: 'auto',
        bgcolor: isDark ? '#0D1A2E' : '#FFFFFF',
      }}
    >
      <AppHeader title="Игра" />

      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: isDark ? 'rgba(162,188,216,0.24)' : 'rgba(31,163,91,0.2)',
          bgcolor: isDark ? 'rgba(17,33,50,0.78)' : '#F7FBF8',
        }}
      >
        <Typography sx={{ fontWeight: 800, mb: 0.5 }}>Alga Rush</Typography>
        <Typography variant="body2" color="text.secondary">
          Нажимай на цель как можно быстрее. Игра длится {GAME_DURATION_SEC} секунд.
        </Typography>
        <Box sx={{ mt: 1.1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Счёт</Typography>
            <Typography sx={{ fontWeight: 800 }}>{score}</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Рекорд</Typography>
            <Typography sx={{ fontWeight: 800 }}>{bestScore}</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Время</Typography>
            <Typography sx={{ fontWeight: 800 }}>{timeLeft}s</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Темп</Typography>
            <Typography sx={{ fontWeight: 800 }}>{accuracy}/с</Typography>
          </Paper>
        </Box>
        <Box sx={{ mt: 1.2 }}>
          <Button variant="contained" onClick={startGame}>
            {running ? 'Начать заново' : 'Старт'}
          </Button>
        </Box>
      </Paper>

      <Paper
        ref={areaRef}
        elevation={0}
        sx={{
          mt: 1.4,
          height: 'calc(100dvh - 290px)',
          minHeight: 320,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid',
          borderColor: isDark ? 'rgba(122,172,220,0.26)' : 'rgba(31,163,91,0.24)',
          background: isDark
            ? 'radial-gradient(circle at 20% 20%, rgba(58,98,140,0.32), rgba(11,26,42,0.95))'
            : 'radial-gradient(circle at 20% 20%, rgba(157,230,192,0.34), rgba(242,252,246,0.95))',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
        }}
      >
        {!running && (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', p: 2 }}>
            <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
              {score > 0 ? `Финиш! Твой результат: ${score}` : 'Нажми "Старт", чтобы начать игру'}
            </Typography>
          </Box>
        )}

        {running && target && (
          <Box
            component="button"
            key={target.id}
            onPointerDown={(event) => {
              event.preventDefault();
              setScore((prev) => prev + 1);
              spawnTarget();
            }}
            sx={{
              position: 'absolute',
              left: target.x,
              top: target.y,
              width: target.size,
              height: target.size,
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: target.size * 0.45,
              fontWeight: 800,
              color: '#fff',
              background: 'linear-gradient(145deg, #1FA35B, #0D7A40)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.22)',
              transition: 'transform 100ms ease',
              '&:active': { transform: 'scale(0.92)' },
            }}
          >
            A
          </Box>
        )}
      </Paper>
    </Box>
  );
}
