// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import ApiService from '../services/api';


// // Initial state
// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   loading: true,
//   error: null
// };


// // Actions
// const AUTH_ACTIONS = {
//   SET_LOADING: 'SET_LOADING',
//   SET_USER: 'SET_USER',
//   SET_ERROR: 'SET_ERROR',
//   LOGOUT: 'LOGOUT'
// };


// // Reducer
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case AUTH_ACTIONS.SET_LOADING:
//       return {
//         ...state,
//         loading: action.payload
//       };
//     case AUTH_ACTIONS.SET_USER:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload,
//         loading: false,
//         error: null
//       };
//     case AUTH_ACTIONS.SET_ERROR:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         loading: false,
//         error: action.payload
//       };
//     case AUTH_ACTIONS.LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         loading: false,
//         error: null
//       };
//     default:
//       return state;
//   }
// };


// // Create context
// const AuthContext = createContext();


// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);


//   // Check if user is already logged in on app start
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);


//   const checkAuthStatus = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
//         return;
//       }


//       const userData = await ApiService.getCurrentUser();
//       dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData.user });
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       // Don't set error state for authentication check failures
//       // Just clear the token and set loading to false
//       localStorage.removeItem('token');
//       dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
//     }
//   };


//   const login = async () => {
//     // Redirect to Google OAuth (disabled local login)
//     throw new Error('Local login is disabled. Please use Google OAuth.');
//   };


//   const register = async () => {
//     // Redirect to Google OAuth (disabled local registration)
//     throw new Error('Local registration is disabled. Please use Google OAuth.');
//   };


//   const googleLogin = async (credential) => {
//     try {
//       dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
//       const response = await ApiService.googleVerify(credential);
      
//       localStorage.setItem('token', response.token);
//       dispatch({ type: AUTH_ACTIONS.SET_USER, payload: response.user });
      
//       return response;
//     } catch (error) {
//       dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
//       throw error;
//     }
//   };


//   const logout = async () => {
//     try {
//       await ApiService.logout();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('token');
//       dispatch({ type: AUTH_ACTIONS.LOGOUT });
//     }
//   };


//   const clearError = () => {
//     dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });
//   };


//   const value = {
//     ...state,
//     login,
//     register,
//     googleLogin,
//     logout,
//     clearError,
//     checkAuthStatus
//   };


//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// export default AuthContext;