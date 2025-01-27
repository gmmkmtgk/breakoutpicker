/* eslint-disable */
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

const AIBaskets = Loadable(lazy(() => import('pages/portfolio/AIBaskets')));
const CorrelatedStocks = Loadable(lazy(() => import('pages/portfolio/CorrelatedStocks')));
const BuyPortfolios = Loadable(lazy(() => import('pages/portfolio/BuyPortfolios')));
const MomentumStocks = Loadable(lazy(() => import('pages/portfolio/MomentumStocks')));
const PeopleInvest = Loadable(lazy(() => import('pages/portfolio/PeopleInvest')));

const Brokers = Loadable(lazy(() => import('pages/miscellaneous/Brokers')));
const Terms = Loadable(lazy(() => import('pages/miscellaneous/Terms')));
const Contactus = Loadable(lazy(() => import('pages/miscellaneous/Contactus')));

const Courses = Loadable(lazy(() => import('pages/learn/Courses')));
const Books = Loadable(lazy(() => import('pages/learn/Books')));
const Workshops = Loadable(lazy(() => import('pages/learn/Workshops')));
const Roadmap = Loadable(lazy(() => import('pages/learn/Roadmap')));

const ChartsAI = Loadable(lazy(() => import('pages/research/ChartsAI')));
const CompareStocks = Loadable(lazy(() => import('pages/research/CompareStocks')));
const FAndOMax = Loadable(lazy(() => import('pages/research/F&OMax')));
const Financials = Loadable(lazy(() => import('pages/research/Financials')));
const News = Loadable(lazy(() => import('pages/research/News')));
const WaBot = Loadable(lazy(() => import('pages/research/WaBot')));

const AthIpos = Loadable(lazy(() => import('pages/ipos/ath-ipos')));

// ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes ={};
const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'ai-baskets',
      element: <AIBaskets />
    },
    {
      path: 'buy-portfolio',
      element: <BuyPortfolios />
    },
    {
      path: 'momentum-stocks',
      element: <MomentumStocks />
    },
    {
      path: 'people-invest',
      element: <PeopleInvest />
    },
    {
      path: 'correlated-stocks',
      element: <CorrelatedStocks />
    },
    {
      path: 'charts-ai',
      element: <ChartsAI />
    },
    {
      path: 'compare-stocks',
      element: <CompareStocks />
    },
    {
      path: 'fando',
      element: <FAndOMax />
    },
    {
      path: 'financials',
      element: <Financials />
    },
    {
      path: 'news',
      element: <News />
    },
    {
      path: 'wabot',
      element: <WaBot />
    },
    {
      path: 'roadmap',
      element: <Roadmap />
    },
    {
      path: 'books',
      element: <Books />
    },
    {
      path: 'courses',
      element: <Courses />
    },
    {
      path: 'workshops',
      element: <Workshops />
    },
    {
      path: 'ath-ipos',
      element: <AthIpos />
    },
    {
      path: 'brokers',
      element: <Brokers />
    },
    {
      path: 't&c',
      element: <Terms />
    },
    {
      path: 'contactus',
      element: <Contactus />
    }
  ]
};

export default MainRoutes;
