import { useMemo } from 'react';

import CheckOutlined from '@ant-design/icons/CheckOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined';
import StarFilled from '@ant-design/icons/StarFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';

import { useCoursesMarketplace } from 'contexts/CoursesMarketplaceContext';
import { COURSE_CATEGORIES, getCourseById, totalCurriculumMinutes } from 'data/stockMarketCourses';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const theme = useTheme();
  const course = useMemo(() => getCourseById(courseId), [courseId]);
  const { addToCart, purchaseOne, toggleWishlist, isPurchased, isInCart, isWishlisted } = useCoursesMarketplace();
  if (!course) return <Navigate to="/courses" replace />;

  const totalMin = totalCurriculumMinutes(course);
  const discountPct = Math.round((1 - course.priceINR / course.listPriceINR) * 100);

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/courses" underline="hover" color="inherit">
          Courses
        </Link>
        <Typography color="text.primary">{course.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
            {course.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
            {course.subtitle}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 2 }}>
            {course.categories.map((cid) => {
              const lab = COURSE_CATEGORIES.find((c) => c.id === cid);
              if (!lab) return null;
              return <Chip key={cid} size="small" label={lab.label} variant="outlined" />;
            })}
          </Stack>

          <Box
            sx={{
              mt: 3,
              borderRadius: 2,
              height: { xs: 200, sm: 360 },
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderColor: 'divider'
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <PlayCircleOutlined style={{ fontSize: 72, opacity: 0.4 }} />
              <Typography color="text.secondary">Preview player (connect Vimeo / Mux / YouTube)</Typography>
            </Stack>
          </Box>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontWeight: 800 }}>{course.instructor.initial}</Avatar>
            <Box>
              <Typography fontWeight={800}>{course.instructor.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {course.instructor.headline}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            {course.instructor.bio}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" fontWeight={800} gutterBottom>
            What you will learn
          </Typography>
          <Grid container spacing={1}>
            {course.highlights.map((h) => (
              <Grid item xs={12} sm={6} key={h}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <CheckOutlined style={{ color: theme.palette.success.main, marginTop: 2 }} />
                  <Typography variant="body2">{h}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" fontWeight={800} gutterBottom>
            Requirements
          </Typography>
          <List dense>
            {course.requirements.map((r) => (
              <ListItem key={r} disableGutters>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <Typography>•</Typography>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={r} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" fontWeight={800} gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {course.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" fontWeight={800} gutterBottom>
            Curriculum
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {course.lectureCount} lectures · {Math.round(totalMin / 60)}h {totalMin % 60}m total
          </Typography>
          {course.curriculum.map((sec, idx) => (
            <Accordion key={sec.title} defaultExpanded={idx === 0} disableGutters>
              <AccordionSummary expandIcon={<DownOutlined />}>
                <Typography fontWeight={700}>
                  Section {idx + 1}: {sec.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <List dense>
                  {sec.lectures.map((lec) => (
                    <ListItem key={lec.title} disableGutters secondaryAction={<Typography variant="caption">{lec.min} min</Typography>}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <PlayCircleOutlined style={{ fontSize: 18, opacity: 0.6 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2">{lec.title}</Typography>
                            {lec.freePreview ? <Chip label="Preview" size="small" variant="outlined" /> : null}
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, position: { lg: 'sticky' }, top: 88 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  {formatINR(course.priceINR)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatINR(course.listPriceINR)}
                </Typography>
                <Chip label={`${discountPct}% off`} size="small" color="error" sx={{ mt: 1, fontWeight: 800 }} />
              </Box>
              <IconButton aria-label="wishlist" onClick={() => toggleWishlist(course.id)} color={isWishlisted(course.id) ? 'error' : 'default'}>
                {isWishlisted(course.id) ? <HeartFilled /> : <HeartOutlined />}
              </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight={800}>
                {course.rating}
              </Typography>
              <StarFilled style={{ color: '#e59819' }} />
              <Typography variant="body2" color="text.secondary">
                ({course.ratingsCount.toLocaleString('en-IN')} ratings)
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {course.students.toLocaleString('en-IN')}+ students · {course.language}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Last updated {course.updated} · {course.level}
            </Typography>
            <Divider sx={{ my: 2 }} />
            {isPurchased(course.id) ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                You own this course.
              </Alert>
            ) : null}
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={isPurchased(course.id)}
                onClick={() => purchaseOne(course.id)}
                sx={{ fontWeight: 800, textTransform: 'none', py: 1.25 }}
              >
                {isPurchased(course.id) ? 'Purchased' : 'Buy now'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                disabled={isPurchased(course.id) || isInCart(course.id)}
                onClick={() => addToCart(course.id)}
                sx={{ fontWeight: 700, textTransform: 'none' }}
              >
                {isInCart(course.id) ? 'In cart' : 'Add to cart'}
              </Button>
              <Button component={RouterLink} to="/courses/cart" fullWidth sx={{ textTransform: 'none' }}>
                Go to cart
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
              30-day satisfaction-style policy is for you to define when live. Demo purchases are instant and free.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
