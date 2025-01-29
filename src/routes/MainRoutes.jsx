/* eslint-disable */
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index.jsx')));

const AIBaskets = Loadable(lazy(() => import('pages/portfolio/AIBaskets.jsx')));
const CorrelatedStocks = Loadable(lazy(() => import('pages/portfolio/CorrelatedStocks.jsx')));
const BuyPortfolios = Loadable(lazy(() => import('pages/portfolio/BuyPortfolios.jsx')));
const StocksMomentum = Loadable(lazy(() => import('pages/portfolio/StocksMomentum.jsx')));
const PeopleInvest = Loadable(lazy(() => import('pages/portfolio/PeopleInvest.jsx')));
const CompareIndex = Loadable(lazy(() => import('pages/portfolio/CompareIndex.jsx')));

const Brokers = Loadable(lazy(() => import('pages/miscellaneous/Brokers.jsx')));
const Terms = Loadable(lazy(() => import('pages/miscellaneous/Terms.jsx')));
const Contactus = Loadable(lazy(() => import('pages/miscellaneous/Contactus.jsx')));

const Courses = Loadable(lazy(() => import('pages/learn/Courses.jsx')));
const Books = Loadable(lazy(() => import('pages/learn/Books.jsx')));
const Workshops = Loadable(lazy(() => import('pages/learn/Workshops.jsx')));
const Roadmap = Loadable(lazy(() => import('pages/learn/Roadmap.jsx')));

const ChartsAI = Loadable(lazy(() => import('pages/research/ChartsAI.jsx')));
const CompareStocks = Loadable(lazy(() => import('pages/research/CompareStocks.jsx')));
const FAndOMax = Loadable(lazy(() => import('pages/research/F&OMax.jsx')));
const Financials = Loadable(lazy(() => import('pages/research/Financials.jsx')));
const News = Loadable(lazy(() => import('pages/research/News.jsx')));
const WaBot = Loadable(lazy(() => import('pages/research/WaBot.jsx')));

const AthIpos = Loadable(lazy(() => import('pages/ipos/ath-ipos.jsx')));

const Voices = Loadable(lazy(() => import('pages/community/voices.jsx')));
const Videos = Loadable(lazy(() => import('pages/community/videos.jsx')));
const Shorts = Loadable(lazy(() => import('pages/community/shorts.jsx')));

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
      element: <StocksMomentum />
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
    },
    {
      path: 'compare-index',
      element: <CompareIndex />
    },
    {
      path: 'voices',
      element: <Voices />
    },
    {
      path: 'videos',
      element: <Videos />
    },
    {
      path: 'shorts',
      element: <Shorts />
    }
  ]
};

export default MainRoutes;
