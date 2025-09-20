// import React, { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Box, CircularProgress, Typography, Alert } from '@mui/material';

// // project imports
// import { useAuth } from 'contexts/AuthContext';

// const GoogleCallback = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { checkAuthStatus } = useAuth();
//   const [error, setError] = React.useState(null);

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         const token = searchParams.get('token');
//         const userStr = searchParams.get('user');

//         if (token && userStr) {
//           // Store token and user data
//           localStorage.setItem('token', token);
//           const userData = JSON.parse(decodeURIComponent(userStr));

//           // Update auth context immediately
//           await checkAuthStatus();

//           // Navigate to home page
//           navigate('/', { replace: true });
//         } else {
//           setError('Authentication failed. Please try again.');
//         }
//       } catch (err) {
//         console.error('Callback error:', err);
//         setError('Authentication failed. Please try again.');
//       }
//     };

//     handleCallback();
//   }, [searchParams, navigate, checkAuthStatus]);

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         p={3}
//       >
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//         <Typography
//           variant="body2"
//           color="primary"
//           sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//           onClick={() => navigate('/login')}
//         >
//           Try logging in again
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//     >
//       <CircularProgress size={40} />
//       <Typography variant="h6" sx={{ mt: 2 }}>
//         Completing sign-in...
//       </Typography>
//     </Box>
//   );
// };

// export default GoogleCallback;
