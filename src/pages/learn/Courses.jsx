import { useMemo, useState } from 'react';

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import StarFilled from '@ant-design/icons/StarFilled';
import PlayCircleOutlined from '@ant-design/icons/PlayCircleOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { useCoursesMarketplace } from 'contexts/CoursesMarketplaceContext';
import { COURSE_CATEGORIES } from 'data/stockMarketCourses';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function Courses() {
  const theme = useTheme();
  const { courses, addToCart, toggleWishlist, isWishlisted, isPurchased, isInCart } = useCoursesMarketplace();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = courses.filter((c) => {
      if (cat !== 'all' && !c.categories.includes(cat)) return false;
      if (!query) return true;
      return (
        c.title.toLowerCase().includes(query) ||
        c.subtitle.toLowerCase().includes(query) ||
        c.instructor.name.toLowerCase().includes(query)
      );
    });
    const sorted = [...list];
    if (sort === 'popular') sorted.sort((a, b) => b.students - a.students);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'priceAsc') sorted.sort((a, b) => a.priceINR - b.priceINR);
    if (sort === 'priceDesc') sorted.sort((a, b) => b.priceINR - a.priceINR);
    if (sort === 'newest') sorted.sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));
    return sorted;
  }, [courses, cat, q, sort]);

  const featured = useMemo(() => courses.find((c) => c.bestseller && c.students > 80000) || courses[0], [courses]);

  return (
    <Stack spacing={3} sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}>
      <Alert severity="info">
        Demo marketplace: checkout does not charge a real card. Purchases are stored in <strong>localStorage</strong> so you can test cart, checkout, and My
        learning. Connect a payment gateway and CMS when you go live.
      </Alert>

      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          background: `linear-gradient(120deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.88)} 45%, ${alpha(theme.palette.secondary.dark, 0.85)} 100%)`,
          color: 'primary.contrastText'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 700 }}>
              Featured
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
              {featured.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, opacity: 0.95, maxWidth: 720 }}>
              {featured.subtitle}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
              <Chip size="small" label={`${featured.hours}h total`} sx={{ bgcolor: alpha('#fff', 0.15), color: 'inherit' }} />
              <Chip size="small" label={featured.level} sx={{ bgcolor: alpha('#fff', 0.15), color: 'inherit' }} />
              <Chip size="small" icon={<StarFilled />} label={`${featured.rating} rating`} sx={{ bgcolor: alpha('#fff', 0.15), color: 'inherit' }} />
            </Stack>
            <Button
              component={RouterLink}
              to={`/courses/${featured.id}`}
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2.5, fontWeight: 800, textTransform: 'none', px: 3 }}
              startIcon={<PlayCircleOutlined />}
            >
              View course
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="h4" fontWeight={800}>
                {formatINR(featured.priceINR)}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', opacity: 0.85 }}>
                {formatINR(featured.listPriceINR)}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.85 }}>
                {featured.students.toLocaleString('en-IN')}+ learners
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} flexWrap="wrap" useFlexGap>
        <TextField
          size="small"
          placeholder="Search courses…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ flex: 1, minWidth: 220, maxWidth: { md: 400 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
        <Select size="small" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 200 }}>
          <MenuItem value="popular">Most popular</MenuItem>
          <MenuItem value="rating">Highest rated</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="priceAsc">Price: low to high</MenuItem>
          <MenuItem value="priceDesc">Price: high to low</MenuItem>
        </Select>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
        {COURSE_CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            onClick={() => setCat(c.id)}
            color={cat === c.id ? 'primary' : 'default'}
            variant={cat === c.id ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>

      <Typography variant="h5" fontWeight={800}>
        All courses ({filtered.length})
      </Typography>

      <Grid container spacing={2}>
        {filtered.map((course) => (
          <Grid item xs={12} sm={6} lg={4} key={course.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.2s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' }
              }}
            >
              <Box
                sx={{
                  height: 140,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.35)} 0%, ${alpha(theme.palette.secondary.main, 0.45)} 100%)`,
                  position: 'relative'
                }}
              >
                <IconButton
                  aria-label="wishlist"
                  onClick={() => toggleWishlist(course.id)}
                  sx={{ position: 'absolute', top: 8, right: 8, bgcolor: alpha('#fff', 0.9), '&:hover': { bgcolor: '#fff' } }}
                  size="small"
                >
                  {isWishlisted(course.id) ? <HeartFilled style={{ color: theme.palette.error.main }} /> : <HeartOutlined />}
                </IconButton>
                {course.bestseller ? (
                  <Chip label="Bestseller" size="small" color="warning" sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 800 }} />
                ) : null}
                <PlayCircleOutlined style={{ fontSize: 56, opacity: 0.35, position: 'absolute', bottom: 16, left: 16 }} />
              </Box>
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                  {course.instructor.name}
                </Typography>
                <Typography component={RouterLink} to={`/courses/${course.id}`} variant="h6" sx={{ fontWeight: 800, mt: 0.5, color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {course.subtitle}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {course.rating}
                  </Typography>
                  <StarFilled style={{ fontSize: 16, color: '#e59819' }} />
                  <Typography variant="caption" color="text.secondary">
                    ({course.ratingsCount.toLocaleString('en-IN')})
                  </Typography>
                  <Box flex={1} />
                  <Typography variant="caption" color="text.secondary">
                    {course.hours}h
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 2 }}>
                  <Typography variant="h6" fontWeight={800}>
                    {formatINR(course.priceINR)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    {formatINR(course.listPriceINR)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    component={RouterLink}
                    to={`/courses/${course.id}`}
                    variant="outlined"
                    fullWidth
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                  >
                    Details
                  </Button>
                  {isPurchased(course.id) ? (
                    <Button component={RouterLink} to="/courses/my-learning" variant="contained" fullWidth sx={{ fontWeight: 700, textTransform: 'none' }}>
                      Owned
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isInCart(course.id)}
                      onClick={() => addToCart(course.id)}
                      sx={{ fontWeight: 700, textTransform: 'none' }}
                    >
                      {isInCart(course.id) ? 'In cart' : 'Add to cart'}
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
