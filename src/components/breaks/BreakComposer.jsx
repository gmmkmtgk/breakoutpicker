import { useCallback, useRef, useState } from 'react';

import PictureOutlined from '@ant-design/icons/PictureOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useBreaks } from 'contexts/BreaksContext';

import avatarMe from 'assets/images/users/avatar-4.png';

const TIMEFRAMES = ['1D', '2D', '1W', '2W', '1M', '3M', '6M', '1Y'];

const defaultAuthor = {
  id: 'u-me',
  name: 'You',
  handle: 'your_handle',
  avatar: avatarMe
};

export default function BreakComposer() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const { addBreak } = useBreaks();
  const [kind, setKind] = useState('general');
  const [symbol, setSymbol] = useState('');
  const [body, setBody] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [timeframe, setTimeframe] = useState('1W');
  const [chartPreview, setChartPreview] = useState('');
  const [chartFileName, setChartFileName] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const onChart = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file for the chart.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setChartPreview(String(reader.result || ''));
      setChartFileName(file.name);
      setError('');
    };
    reader.readAsDataURL(file);
  }, []);

  const resetSpecialFields = () => {
    setTargetPrice('');
    setStopLoss('');
    setTimeframe('1W');
    setChartPreview('');
    setChartFileName('');
  };

  const handleSubmit = () => {
    setOk('');
    const trimmed = body.trim();
    if (!trimmed) {
      setError('Write something for your Break.');
      return;
    }
    if (kind === 'special') {
      if (!chartPreview) {
        setError('Special Breaks require a chart image.');
        return;
      }
      const tp = Number(targetPrice);
      const sl = Number(stopLoss);
      if (!Number.isFinite(tp) || tp <= 0) {
        setError('Enter a valid target price.');
        return;
      }
      if (!Number.isFinite(sl) || sl <= 0) {
        setError('Enter a valid stop loss.');
        return;
      }
      if (tp === sl) {
        setError('Target and stop loss must be different.');
        return;
      }
    }

    addBreak({
      kind,
      symbol: symbol.trim().toUpperCase() || undefined,
      body: trimmed,
      author: defaultAuthor,
      ...(kind === 'special'
        ? {
            chartImage: chartPreview,
            targetPrice: Number(targetPrice),
            stopLoss: Number(stopLoss),
            timeframe
          }
        : {})
    });

    setBody('');
    setSymbol('');
    setError('');
    setOk(kind === 'special' ? 'Special Break posted — tracking started.' : 'Break posted.');
    if (kind === 'special') resetSpecialFields();
  };

  const canPost = body.trim().length > 0;

  const openChartPicker = () => fileInputRef.current?.click();

  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onChart} />
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar src={avatarMe} alt="You" sx={{ width: 40, height: 40, mt: 0.25 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={kind}
            onChange={(_, v) => {
              if (!v) return;
              setKind(v);
              setError('');
              setOk('');
            }}
            sx={{
              mb: 1,
              '& .MuiToggleButton-root': {
                px: 1.25,
                py: 0.25,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 'none',
                borderRadius: `${theme.shape.borderRadius * 3}px !important`,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' }
                }
              }
            }}
          >
            <ToggleButton value="general">General</ToggleButton>
            <ToggleButton value="special">Special</ToggleButton>
          </ToggleButtonGroup>

          <InputBase
            placeholder={kind === 'special' ? 'Thesis / setup — NSE & BSE' : "What's happening in the markets?"}
            multiline
            minRows={3}
            fullWidth
            value={body}
            onChange={(e) => setBody(e.target.value)}
            inputProps={{ maxLength: 2000 }}
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.35,
              '& .MuiInputBase-input': { py: 0.5 }
            }}
          />

          <InputBase
            placeholder="$SYMBOL (optional)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            sx={{ mt: 1, fontSize: '0.95rem', fontWeight: 600, color: 'primary.main', maxWidth: 200 }}
          />

          {kind === 'special' && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 4,
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 1.5 }}>
                Evaluation · chart required
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
                <TextField
                  label="Target ₹"
                  type="number"
                  size="small"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Stop ₹"
                  type="number"
                  size="small"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  fullWidth
                />
                <TextField select label="Timeframe" size="small" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} fullWidth>
                  {TIMEFRAMES.map((tf) => (
                    <MenuItem key={tf} value={tf}>
                      {tf}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Button
                size="small"
                variant="text"
                onClick={openChartPicker}
                startIcon={<PictureOutlined />}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                {chartFileName || 'Add chart'}
              </Button>
              {chartPreview && (
                <Box
                  component="img"
                  src={chartPreview}
                  alt=""
                  sx={{
                    mt: 1.5,
                    maxHeight: 200,
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                />
              )}
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 1.5 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {ok && (
            <Alert severity="success" sx={{ mt: 1.5 }} onClose={() => setOk('')}>
              {ok}
            </Alert>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Stack direction="row" alignItems="center" spacing={0.25}>
              <Tooltip title={kind === 'special' ? 'Add chart' : 'Media (soon)'}>
                <span>
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label="Add chart"
                    disabled={kind !== 'special'}
                    onClick={() => kind === 'special' && openChartPicker()}
                  >
                    <PictureOutlined />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
            <Button
              variant="contained"
              disabled={!canPost}
              onClick={handleSubmit}
              sx={{
                borderRadius: 999,
                px: 2.5,
                py: 0.75,
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' }
              }}
            >
              Break
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
