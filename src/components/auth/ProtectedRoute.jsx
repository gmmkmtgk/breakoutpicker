// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { Box, CircularProgress } from '@mui/material';


// // project imports
// import { useAuth } from 'contexts/AuthContext';


// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();


//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <Box 
//         display="flex" 
//         justifyContent="center" 
//         alignItems="center" 
//         minHeight="100vh"
//       >
//         <CircularProgress size={40} />
//       </Box>
//     );
//   }


//   // If not authenticated, redirect to login with the current location
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }


//   // If authenticated, render the protected component
//   return children;
// };


// export default ProtectedRoute;