import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import BreakComposer from 'components/breaks/BreakComposer';
import BreakCard from 'components/breaks/BreakCard';
import TopTradersSidebar from 'components/breaks/TopTradersSidebar';
import { BreaksProvider, useBreaks } from 'contexts/BreaksContext';

/** Demo “following” set — replace with real follow graph later. */
const FOLLOWING_HANDLES = new Set(['meera_charts', 'rahul_index', 'your_handle', 'aditya_nifty']);

function BreaksFeed() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const { breaks } = useBreaks();

  const filtered = useMemo(() => {
    if (tab === 0) return breaks;
    return breaks.filter((b) => FOLLOWING_HANDLES.has(b.author?.handle));
  }, [breaks, tab]);

  const toolbarOffset = typeof theme.mixins.toolbar?.minHeight === 'number' ? theme.mixins.toolbar.minHeight : 64;

  return (
    <Box
      sx={{
        flex: '1 1 600px',
        maxWidth: 600,
        minWidth: 0,
        borderLeft: { md: '1px solid' },
        borderRight: { md: '1px solid' },
        borderColor: 'divider',
        minHeight: '70vh'
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          position: 'sticky',
          top: toolbarOffset,
          zIndex: 8,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          minHeight: 48,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '0.95rem', py: 1.5 }
        }}
      >
        <Tab label="For you" />
        <Tab label="Following" />
      </Tabs>

      <BreakComposer />

      {filtered.length === 0 ? (
        <Box sx={{ px: 3, py: 10, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Nothing here yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            When people you follow post Breaks, they will show up in this tab.
          </Typography>
        </Box>
      ) : (
        filtered.map((b) => <BreakCard key={b.id} item={b} />)
      )}
    </Box>
  );
}

export default function Breaks() {
  return (
    <BreaksProvider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: { xs: 0, lg: 3 },
          mx: { xs: -1, sm: -2, md: -3 }
        }}
      >
        <BreaksFeed />
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            width: 350,
            flexShrink: 0,
            position: 'sticky',
            top: (theme) => (typeof theme.mixins.toolbar?.minHeight === 'number' ? theme.mixins.toolbar.minHeight : 64) + 8,
            alignSelf: 'flex-start'
          }}
        >
          <TopTradersSidebar />
        </Box>
      </Box>
    </BreaksProvider>
  );
}
