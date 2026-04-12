import PlaySquareOutlined from '@ant-design/icons/PlaySquareOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useCoursesMarketplace } from 'contexts/CoursesMarketplaceContext';

export default function CoursesChrome({ children }) {
  const { pathname } = useLocation();
  const { cart, purchasedCourses } = useCoursesMarketplace();

  const tabSx = (mode) => {
    let active = false;
    if (mode === 'explore') active = pathname === '/courses';
    if (mode === 'learn') active = pathname.startsWith('/courses/my-learning');
    if (mode === 'cart') active = pathname.startsWith('/courses/cart');
    return {
      fontWeight: 700,
      color: active ? 'primary.main' : 'text.secondary'
    };
  };

  return (
    <Box sx={{ pb: 3 }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Toolbar sx={{ gap: 1, flexWrap: 'wrap', py: 1 }}>
          <Button
            component={RouterLink}
            to="/courses"
            startIcon={<PlaySquareOutlined />}
            sx={{ fontWeight: 800, textTransform: 'none', color: 'text.primary', mr: 1 }}
          >
            Breakout Academy
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button component={RouterLink} to="/courses" sx={{ ...tabSx('explore'), textTransform: 'none' }}>
            Explore
          </Button>
          <Button component={RouterLink} to="/courses/my-learning" startIcon={<UnorderedListOutlined />} sx={{ ...tabSx('learn'), textTransform: 'none' }}>
            My learning
            {purchasedCourses.length > 0 ? (
              <Box component="span" sx={{ ml: 0.75, typography: 'caption', color: 'text.secondary' }}>
                ({purchasedCourses.length})
              </Box>
            ) : null}
          </Button>
          <Button component={RouterLink} to="/courses/cart" startIcon={<ShoppingCartOutlined />} sx={{ ...tabSx('cart'), textTransform: 'none' }}>
            <Badge badgeContent={cart.length} color="primary" invisible={cart.length === 0}>
              <Box component="span" sx={{ pr: cart.length ? 1.5 : 0 }}>
                Cart
              </Box>
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
