import PropTypes from 'prop-types';

import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useBreaks } from 'contexts/BreaksContext';

const card = {
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'grey.50',
  overflow: 'hidden'
};

function Rank({ index }) {
  return (
    <Typography variant="caption" color="text.secondary" sx={{ width: 20, fontWeight: 800, flexShrink: 0 }}>
      {index + 1}
    </Typography>
  );
}

Rank.propTypes = {
  index: PropTypes.number.isRequired
};

export default function TopTradersSidebar() {
  const { topTraders, stats } = useBreaks();

  return (
    <Stack spacing={2} sx={{ pt: 0.5 }}>
      <OutlinedInput
        readOnly
        size="small"
        placeholder="Search BreakoutPicker"
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined style={{ color: 'inherit', opacity: 0.6 }} />
          </InputAdornment>
        }
        sx={{
          borderRadius: 999,
          bgcolor: 'grey.100',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }
        }}
        inputProps={{ 'aria-label': 'Search (coming soon)' }}
      />

      <Box sx={card}>
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
            Top Traders
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            From resolved Special Breaks · {stats.specialResolved} closed · {stats.specialOpen} open
          </Typography>
        </Box>
        <Box sx={{ px: 0, py: 0.5 }}>
          {!topTraders.length && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 2 }}>
              Traders appear here once Special Breaks resolve (target vs stop).
            </Typography>
          )}
          {topTraders.map((t, i) => (
            <Box
              key={t.userId}
              sx={{
                px: 2,
                py: 1.25,
                display: 'flex',
                gap: 1.25,
                alignItems: 'flex-start',
                cursor: 'default',
                transition: 'background-color 0.12s',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Rank index={i} />
              <Avatar src={t.avatar} alt={t.name} sx={{ width: 40, height: 40 }}>
                {t.name?.[0]}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                  {t.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  @{t.handle}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: 'block' }}>
                  {t.successRate}% hit · {t.wins}W / {t.losses}L
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Link
          href="#"
          underline="none"
          sx={{ display: 'block', px: 2, py: 1.25, color: 'primary.main', fontSize: '0.9rem' }}
          onClick={(e) => e.preventDefault()}
        >
          Show more
        </Link>
      </Box>

      <Box sx={card}>
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
            What&apos;s next
          </Typography>
        </Box>
        <Stack spacing={0} sx={{ py: 0.5 }}>
          {['Screeners & scanners', 'Broker integrations', 'Alerts & watchlists'].map((label) => (
            <Box
              key={label}
              sx={{
                px: 2,
                py: 1.25,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Coming soon
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
