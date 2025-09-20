import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Box, Typography } from '@mui/material';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';


const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { googleLogin } = useAuth();


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin(credentialResponse.credential);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error('Google login failed:', error);
      if (onError) {
        onError(error);
      }
    }
  };


  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    if (onError) {
      onError(error);
    }
  };


  return (
    <Box sx={{ width: '100%' }}>
      {/* Real Google OAuth button */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme="outline"
        size="large"
        width="100%"
        text="signin_with"
        shape="rectangular"
      />
      
      {/* Fallback button if Google OAuth fails */}
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleOutlined />}
          onClick={() => {
            // Fallback to mock authentication if real Google OAuth fails
            handleGoogleSuccess({
              credential: 'mock_google_credential_token'
            });
          }}
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            borderColor: '#dadce0',
            color: '#3c4043',
            '&:hover': {
              backgroundColor: '#f8f9fa',
              borderColor: '#dadce0'
            }
          }}
        >
          Or continue with demo
        </Button>
      </Box>
      
      <Typography 
        variant="caption" 
        color="textSecondary"
        align="center" 
        sx={{ mt: 1, display: 'block' }}
      >
        Fast, secure sign-in with your Google account
      </Typography>
    </Box>
  );
};


export default GoogleLoginButton;