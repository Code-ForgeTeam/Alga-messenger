import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppHeader } from '../components/AppHeader';

type Tile = {
  id: string;
  face: string;
  row: number;
  col: number;
  removed: boolean;
};

const ROWS = 6;
const COLS = 8;
const TILE_COUNT = ROWS * COLS;
const BEST_TIME_KEY = 'alga.mahjong.best-time-sec.v1';
const WINS_KEY = 'alga.mahjong.wins.v1';

const TILE_FACES = [
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
  'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
];

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const readStoredNumber = (key: string): number => {
  if (typeof window === 'undefined') return 0;
  const raw = Number(localStorage.getItem(key) || 0);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
};

const buildNewBoard = (): Tile[] => {
  const faces = shuffle([...TILE_FACES, ...TILE_FACES]);
  return Array.from({ length: TILE_COUNT }).map((_, index) => ({
    id: `tile-${index}-${faces[index]}`,
    face: faces[index],
    row: Math.floor(index / COLS),
    col: index % COLS,
    removed: false,
  }));
};

const isTileFree = (tiles: Tile[], tile: Tile): boolean => {
  if (tile.removed) return false;
  const leftBusy = tiles.some((item) => !item.removed && item.row === tile.row && item.col === tile.col - 1);
  const rightBusy = tiles.some((item) => !item.removed && item.row === tile.row && item.col === tile.col + 1);
  return !leftBusy || !rightBusy;
};

const findHintPair = (tiles: Tile[]): [string, string] | null => {
  const freeTiles = tiles.filter((item) => !item.removed && isTileFree(tiles, item));
  for (let i = 0; i < freeTiles.length; i += 1) {
    for (let j = i + 1; j < freeTiles.length; j += 1) {
      if (freeTiles[i].face === freeTiles[j].face) {
        return [freeTiles[i].id, freeTiles[j].id];
      }
    }
  }
  return null;
};

export default function GamePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [tiles, setTiles] = useState<Tile[]>(() => buildNewBoard());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hintPair, setHintPair] = useState<[string, string] | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [won, setWon] = useState(false);
  const [wins, setWins] = useState(() => readStoredNumber(WINS_KEY));
  const [bestTimeSec, setBestTimeSec] = useState(() => readStoredNumber(BEST_TIME_KEY));

  const sortedTiles = useMemo(
    () => [...tiles].sort((a, b) => (a.row === b.row ? a.col - b.col : a.row - b.row)),
    [tiles],
  );

  const freeById = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const tile of tiles) {
      map.set(tile.id, isTileFree(tiles, tile));
    }
    return map;
  }, [tiles]);

  const remainingTiles = useMemo(
    () => tiles.filter((item) => !item.removed).length,
    [tiles],
  );
  const freeTilesCount = useMemo(
    () => tiles.filter((item) => !item.removed && freeById.get(item.id)).length,
    [tiles, freeById],
  );
  const matchCount = (TILE_COUNT - remainingTiles) / 2;

  const startNewGame = () => {
    setTiles(buildNewBoard());
    setSelectedId(null);
    setHintPair(null);
    setMoves(0);
    setSeconds(0);
    setRunning(true);
    setWon(false);
  };

  const reshuffleRemaining = () => {
    setTiles((prev) => {
      const activeFaces = shuffle(prev.filter((item) => !item.removed).map((item) => item.face));
      let index = 0;
      return prev.map((tile) => {
        if (tile.removed) return tile;
        const nextFace = activeFaces[index];
        index += 1;
        return { ...tile, face: nextFace, id: `${tile.row}-${tile.col}-${nextFace}-${index}` };
      });
    });
    setSelectedId(null);
    setHintPair(null);
  };

  const showHint = () => {
    const pair = findHintPair(tiles);
    setHintPair(pair);
    if (pair) {
      setSelectedId(pair[0]);
      window.setTimeout(() => setHintPair(null), 900);
    }
  };

  const onTileTap = (tileId: string) => {
    if (!running) return;
    const tile = tiles.find((item) => item.id === tileId);
    if (!tile || tile.removed) return;
    if (!freeById.get(tile.id)) return;
    setHintPair(null);

    if (!selectedId) {
      setSelectedId(tileId);
      return;
    }
    if (selectedId === tileId) {
      setSelectedId(null);
      return;
    }

    const selectedTile = tiles.find((item) => item.id === selectedId);
    if (!selectedTile || selectedTile.removed || !freeById.get(selectedTile.id)) {
      setSelectedId(tileId);
      return;
    }

    setMoves((prev) => prev + 1);
    if (selectedTile.face !== tile.face) {
      setSelectedId(tileId);
      return;
    }

    setTiles((prev) =>
      prev.map((item) =>
        item.id === selectedTile.id || item.id === tile.id
          ? { ...item, removed: true }
          : item,
      ),
    );
    setSelectedId(null);
  };

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (remainingTiles > 0 || !running) return;
    setRunning(false);
    setWon(true);
    const nextWins = wins + 1;
    setWins(nextWins);
    if (typeof window !== 'undefined') {
      localStorage.setItem(WINS_KEY, String(nextWins));
    }

    if (bestTimeSec === 0 || seconds < bestTimeSec) {
      setBestTimeSec(seconds);
      if (typeof window !== 'undefined') {
        localStorage.setItem(BEST_TIME_KEY, String(seconds));
      }
    }
  }, [remainingTiles, running, seconds, wins, bestTimeSec]);

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
      <AppHeader title="Игра: Mahjong Titan" />

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
        <Typography sx={{ fontWeight: 800, mb: 0.45 }}>Mahjong Titan (мини)</Typography>
        <Typography variant="body2" color="text.secondary">
          Собери все пары свободных плиток. Свободная плитка: у нее открыт левый или правый бок.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1.1, flexWrap: 'wrap', rowGap: 1 }}>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Пары</Typography>
            <Typography sx={{ fontWeight: 800 }}>{matchCount}/24</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Ходы</Typography>
            <Typography sx={{ fontWeight: 800 }}>{moves}</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Время</Typography>
            <Typography sx={{ fontWeight: 800 }}>{seconds}s</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Рекорд</Typography>
            <Typography sx={{ fontWeight: 800 }}>{bestTimeSec > 0 ? `${bestTimeSec}s` : '—'}</Typography>
          </Paper>
          <Paper sx={{ px: 1.2, py: 0.8, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Победы</Typography>
            <Typography sx={{ fontWeight: 800 }}>{wins}</Typography>
          </Paper>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.8} sx={{ mt: 1.2 }}>
          <Button variant="contained" onClick={startNewGame}>Новая партия</Button>
          <Button variant="outlined" onClick={reshuffleRemaining} disabled={!running || remainingTiles === 0}>Перемешать</Button>
          <Button variant="outlined" onClick={showHint} disabled={!running || remainingTiles === 0}>Подсказка</Button>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          mt: 1.4,
          p: 1,
          borderRadius: 4,
          border: '1px solid',
          borderColor: isDark ? 'rgba(122,172,220,0.26)' : 'rgba(31,163,91,0.24)',
          background: isDark
            ? 'linear-gradient(165deg, rgba(12,31,52,0.96), rgba(6,20,35,0.97))'
            : 'linear-gradient(165deg, rgba(247,253,249,0.98), rgba(234,246,239,0.98))',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            gap: 0.7,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
          }}
        >
          {sortedTiles.map((tile) => {
            const isSelected = selectedId === tile.id;
            const isHinted = !!hintPair && (hintPair[0] === tile.id || hintPair[1] === tile.id);
            const free = !!freeById.get(tile.id);
            return (
              <Box
                key={tile.id}
                component="button"
                onPointerDown={() => onTileTap(tile.id)}
                disabled={tile.removed || !running}
                sx={{
                  height: { xs: 42, sm: 48 },
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: tile.removed
                    ? 'transparent'
                    : isSelected
                      ? '#2AAE66'
                      : isHinted
                        ? '#E7A523'
                        : free
                          ? isDark ? 'rgba(183,206,229,0.36)' : 'rgba(53,98,78,0.25)'
                          : isDark ? 'rgba(92,112,133,0.34)' : 'rgba(120,134,129,0.3)',
                  background: tile.removed
                    ? 'transparent'
                    : free
                      ? isDark
                        ? 'linear-gradient(160deg, #F0F7FF, #DCEAFE)'
                        : 'linear-gradient(160deg, #FFFFFF, #F1F7F3)'
                      : isDark
                        ? 'linear-gradient(160deg, #D4DEE9, #C8D5E2)'
                        : 'linear-gradient(160deg, #EEF1EF, #E3E8E5)',
                  color: tile.removed ? 'transparent' : '#1A2A39',
                  fontSize: { xs: 12, sm: 13 },
                  fontWeight: 800,
                  letterSpacing: 0.3,
                  cursor: tile.removed ? 'default' : 'pointer',
                  opacity: tile.removed ? 0 : 1,
                  boxShadow: tile.removed
                    ? 'none'
                    : free
                      ? 'inset 0 0 0 1px rgba(255,255,255,0.55), 0 3px 10px rgba(0,0,0,0.1)'
                      : 'inset 0 0 0 1px rgba(255,255,255,0.42)',
                  transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
                  '&:active': { transform: tile.removed ? 'none' : 'scale(0.96)' },
                }}
              >
                {tile.removed ? '' : tile.face}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ pt: 1, px: 0.2 }}>
          {!running && won && (
            <Typography sx={{ fontWeight: 700, color: isDark ? '#92E1B8' : '#1F8A56' }}>
              Победа! Время: {seconds}s
            </Typography>
          )}
          {!running && !won && (
            <Typography color="text.secondary">Начни новую партию.</Typography>
          )}
          {running && remainingTiles > 0 && (
            <Typography color="text.secondary" sx={{ fontSize: 13 }}>
              Осталось плиток: {remainingTiles}. Свободных: {freeTilesCount}.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
