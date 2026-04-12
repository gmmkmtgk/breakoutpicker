import { useMemo, useState } from 'react';

import BookOutlined from '@ant-design/icons/BookOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import NodeIndexOutlined from '@ant-design/icons/NodeIndexOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import MainCard from 'components/MainCard';
import { LEARNING_ROADMAPS } from 'data/learningRoadmaps';

export default function Roadmap() {
  const theme = useTheme();
  const [activeId, setActiveId] = useState(LEARNING_ROADMAPS[0].id);

  const active = useMemo(() => LEARNING_ROADMAPS.find((r) => r.id === activeId) || LEARNING_ROADMAPS[0], [activeId]);

  const totalPhases = active.phases.length;

  return (
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
          <NodeIndexOutlined style={{ fontSize: 36, color: theme.palette.primary.main }} />
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Learning roadmaps
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          Pick a theme to see a structured path — phases, topics, and what to study next. Mix and match tracks over time; markets reward consistency more
          than collecting unfinished courses.
        </Typography>
      </Box>

      <Alert severity="info" icon={<BookOutlined />}>
        Educational sequencing only, not investment advice. Adapt pacing to your schedule; verify tax and regulatory details with qualified professionals.
      </Alert>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4} lg={3}>
          <MainCard title="Themes" sx={{ height: '100%' }}>
            <List disablePadding dense>
              {LEARNING_ROADMAPS.map((r) => {
                const selected = r.id === activeId;
                return (
                  <ListItemButton
                    key={r.id}
                    selected={selected}
                    onClick={() => setActiveId(r.id)}
                    alignItems="flex-start"
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      border: 1,
                      borderColor: selected ? 'primary.main' : 'transparent',
                      bgcolor: selected ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.12 : 0.08) : 'transparent'
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight={800}>
                          {r.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          {r.level}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2, borderLeft: 4, borderColor: 'primary.main' }}>
              <Typography variant="overline" color="primary" fontWeight={800}>
                Active roadmap
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                {active.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 900 }}>
                {active.blurb}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                <Chip size="small" label={active.level} variant="outlined" />
                <Chip size="small" label={active.pace} color="primary" variant="outlined" />
                <Chip size="small" label={`${totalPhases} phases`} variant="outlined" />
              </Stack>
            </Paper>

            <Typography variant="subtitle1" fontWeight={800} sx={{ mt: 0.5 }}>
              Phases & milestones
            </Typography>

            <Stack spacing={2}>
              {active.phases.map((phase, idx) => (
                <Card key={phase.title} variant="outlined" sx={{ overflow: 'visible' }}>
                  <CardContent sx={{ py: 2.5, px: { xs: 2, sm: 2.5 } }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            flexShrink: 0
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight={800}>
                            {phase.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Suggested: {phase.weeks}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={2}>
                      {phase.items.map((it) => (
                        <Stack key={it.topic} direction="row" spacing={1.5} alignItems="flex-start">
                          <CheckCircleOutlined style={{ color: theme.palette.success.main, fontSize: 18, marginTop: 3, flexShrink: 0 }} />
                          <Box>
                            <Typography variant="subtitle2" fontWeight={700}>
                              {it.topic}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {it.detail}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.06) }}>
              <Typography variant="subtitle2" fontWeight={800} gutterBottom>
                How to use this page
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Work one phase at a time. Finish readings or courses that match each bullet, then tick it off in your own notes. Revisit{' '}
                <strong>Psychology & process</strong> alongside any technical track — it is the glue that keeps mistakes small when markets get loud.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
