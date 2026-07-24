import { useState } from 'react';

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { useCoursesMarketplace } from 'contexts/CoursesMarketplaceContext';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CourseCart() {
  const { cartCourses, cartTotalINR, cartListTotalINR, removeFromCart, clearCart, checkoutCart } = useCoursesMarketplace();
  const [doneOpen, setDoneOpen] = useState(false);

  const handleCheckout = () => {
    checkoutCart();
    setDoneOpen(true);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, maxWidth: 960, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Shopping cart
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Review courses before checkout. Demo mode: no payment processor is called.
      </Typography>

      {cartCourses.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <ShoppingCartOutlined style={{ fontSize: 48, opacity: 0.35 }} />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Your cart is empty.
          </Typography>
          <Button component={RouterLink} to="/courses" variant="contained" sx={{ mt: 2, fontWeight: 700, textTransform: 'none' }}>
            Browse courses
          </Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {cartCourses.map((c) => (
            <Paper key={c.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
                <Box>
                  <Typography component={RouterLink} to={`/courses/${c.id}`} variant="h6" sx={{ fontWeight: 800, color: 'text.primary', textDecoration: 'none' }}>
                    {c.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.instructor.name}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box textAlign="right">
                    <Typography fontWeight={800}>{formatINR(c.priceINR)}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {formatINR(c.listPriceINR)}
                    </Typography>
                  </Box>
                  <IconButton aria-label="Remove" onClick={() => removeFromCart(c.id)} color="error">
                    <DeleteOutlined />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Original total</Typography>
                <Typography sx={{ textDecoration: 'line-through' }}>{formatINR(cartListTotalINR)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={800}>You pay</Typography>
                <Typography variant="h6" fontWeight={800}>
                  {formatINR(cartTotalINR)}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" size="large" onClick={handleCheckout} sx={{ fontWeight: 800, textTransform: 'none', flex: 1 }}>
                Checkout (demo)
              </Button>
              <Button variant="outlined" color="inherit" onClick={clearCart} sx={{ textTransform: 'none' }}>
                Clear cart
              </Button>
            </Stack>
            <Alert severity="info" sx={{ mt: 2 }}>
              Wire <strong>Razorpay / Stripe</strong> here later; for now checkout marks all cart items as purchased locally.
            </Alert>
          </Paper>
        </Stack>
      )}

      <Dialog open={doneOpen} onClose={() => setDoneOpen(false)}>
        <DialogTitle>Thank you</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Your demo purchase is complete. Open <strong>My learning</strong> to continue.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDoneOpen(false)}>Close</Button>
          <Button component={RouterLink} to="/courses/my-learning" variant="contained" onClick={() => setDoneOpen(false)}>
            My learning
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
