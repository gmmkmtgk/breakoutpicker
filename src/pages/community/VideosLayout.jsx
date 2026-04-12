import React, { useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';

import SearchOutlined from '@ant-design/icons/SearchOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { VideosHubProvider } from 'contexts/VideosHubContext';

function VideosChrome({ search, setSearch }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 2, py: 1, flexWrap: 'wrap' }}>
        <Box component={RouterLink} to="/videos" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
          <VideoCameraOutlined style={{ fontSize: 28, color: theme.palette.error.main }} />
          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: -0.5 }}>
            Breakout<span style={{ color: theme.palette.text.secondary }}>TV</span>
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Search stock market videos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/videos')}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 560,
            '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.06 : 0.04) }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined style={{ opacity: 0.6 }} />
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ flex: 1 }} />
        <IconButton size="small" sx={{ display: { xs: 'none', sm: 'inline-flex' } }} aria-label="Upload placeholder">
          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
            Upload (soon)
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function VideosLayoutInner() {
  const [search, setSearch] = useState('');
  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default' }}>
      <VideosChrome search={search} setSearch={setSearch} />
      <Outlet context={{ search, setSearch }} />
    </Box>
  );
}

export default function VideosLayout() {
  return (
    <VideosHubProvider>
      <VideosLayoutInner />
    </VideosHubProvider>
  );
}
