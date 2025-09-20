import { lazy } from 'react';


// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';


// render - Google OAuth login (same for both login and register)
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
//const GoogleCallback = Loadable(lazy(() => import('pages/authentication/GoogleCallback')));


// ==============================|| AUTH ROUTING ||============================== //


const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthLogin />
    },
    {
      path: '/signup',
      element: <AuthLogin />}
    // },
    // {
    //   path: '/auth/callback',
    //   element: <GoogleCallback />
    // }
  ]
};


export default LoginRoutes;