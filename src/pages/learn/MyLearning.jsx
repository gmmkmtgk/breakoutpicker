import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { useCoursesMarketplace } from 'contexts/CoursesMarketplaceContext';

/** Deterministic mock progress 0–100 from course id */
function mockProgress(id) {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = Math.imul(31, h) + id.charCodeAt(i);
  return 15 + (Math.abs(h) % 70);
}

export default function MyLearning() {
  const { purchasedCourses } = useCoursesMarketplace();

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        My learning
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Courses you have purchased (stored in this browser). Progress bars are illustrative until you plug in a real LMS.
      </Typography>

      {purchasedCourses.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography color="text.secondary">You have not purchased any courses yet.</Typography>
          <Button component={RouterLink} to="/courses" variant="contained" sx={{ mt: 2, fontWeight: 700, textTransform: 'none' }}>
            Explore courses
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {purchasedCourses.map((c) => {
            const pct = mockProgress(c.id);
            return (
              <Grid item xs={12} md={6} key={c.id}>
                <Card variant="outlined" sx={{ height: '100%', borderLeft: 4, borderColor: 'primary.main' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={800}>
                      {c.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {c.instructor.name}
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Progress (demo)
                        </Typography>
                        <Typography variant="caption" fontWeight={700}>
                          {pct}%
                        </Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 1 }} />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button
                        component={RouterLink}
                        to={`/courses/${c.id}`}
                        variant="contained"
                        startIcon={<PlayCircleOutlined />}
                        sx={{ fontWeight: 700, textTransform: 'none' }}
                      >
                        Continue
                      </Button>
                      <Button component={RouterLink} to={`/courses/${c.id}`} variant="outlined" sx={{ textTransform: 'none' }}>
                        Syllabus
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
