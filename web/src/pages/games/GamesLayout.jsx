import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

export default function GamesLayout() {
  return (
    <Box sx={{ pb: 2 }}>
      <Outlet />
    </Box>
  );
}
