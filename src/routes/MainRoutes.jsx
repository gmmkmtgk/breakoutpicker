/* eslint-disable */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const AIBaskets = Loadable(lazy(() => import('pages/portfolio/AIBaskets.jsx')));
const AIBasketDetail = Loadable(lazy(() => import('pages/portfolio/AIBasketDetail.jsx')));
const CorrelatedStocks = Loadable(lazy(() => import('pages/portfolio/CorrelatedStocks.jsx')));
// Buy Portfolios — to be implemented later
// const BuyPortfolios = Loadable(lazy(() => import('pages/portfolio/BuyPortfolios.jsx')));
const StocksMomentum = Loadable(lazy(() => import('pages/portfolio/StocksMomentum.jsx')));
const PeopleInvest = Loadable(lazy(() => import('pages/portfolio/PeopleInvest.jsx')));
const CompareIndex = Loadable(lazy(() => import('pages/portfolio/CompareIndex.jsx')));

const Brokers = Loadable(lazy(() => import('pages/miscellaneous/Brokers.jsx')));
const Terms = Loadable(lazy(() => import('pages/miscellaneous/Terms.jsx')));
const ContactUs = Loadable(lazy(() => import('pages/miscellaneous/ContactUs.jsx')));

const CoursesLayout = Loadable(lazy(() => import('pages/learn/CoursesLayout.jsx')));
const Courses = Loadable(lazy(() => import('pages/learn/Courses.jsx')));
const CourseDetail = Loadable(lazy(() => import('pages/learn/CourseDetail.jsx')));
const CourseCart = Loadable(lazy(() => import('pages/learn/CourseCart.jsx')));
const MyLearning = Loadable(lazy(() => import('pages/learn/MyLearning.jsx')));
const Books = Loadable(lazy(() => import('pages/learn/Books.jsx')));
const Workshops = Loadable(lazy(() => import('pages/learn/Workshops.jsx')));
const Roadmap = Loadable(lazy(() => import('pages/learn/Roadmap.jsx')));

const ChartsAI = Loadable(lazy(() => import('pages/research/ChartsAI.jsx')));
const CompareStocks = Loadable(lazy(() => import('pages/research/CompareStocks.jsx')));
const FAndOMax = Loadable(lazy(() => import('pages/research/F&OMax.jsx')));
const Financials = Loadable(lazy(() => import('pages/research/Financials.jsx')));
const News = Loadable(lazy(() => import('pages/research/News.jsx')));
const WaBot = Loadable(lazy(() => import('pages/research/WaBot.jsx')));

const AthIpos = Loadable(lazy(() => import('pages/ipos/AthIpos.jsx')));

const Breaks = Loadable(lazy(() => import('pages/community/Breaks.jsx')));
const Voices = Loadable(lazy(() => import('pages/community/Voices.jsx')));
const VideosLayout = Loadable(lazy(() => import('pages/community/VideosLayout.jsx')));
const VideosHome = Loadable(lazy(() => import('pages/community/VideosHome.jsx')));
const VideoWatch = Loadable(lazy(() => import('pages/community/VideoWatch.jsx')));
const Shorts = Loadable(lazy(() => import('pages/community/Shorts.jsx')));

const GamesLayout = Loadable(lazy(() => import('pages/games/GamesLayout.jsx')));
const GamesHub = Loadable(lazy(() => import('pages/games/GamesHub.jsx')));
const MarketQuiz = Loadable(lazy(() => import('pages/games/MarketQuiz.jsx')));
const TickerScramble = Loadable(lazy(() => import('pages/games/TickerScramble.jsx')));
const BullOrBear = Loadable(lazy(() => import('pages/games/BullOrBear.jsx')));

const Yoga = Loadable(lazy(() => import('pages/health/Yoga.jsx')));
const Pranayam = Loadable(lazy(() => import('pages/health/Pranayam.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes ={};
const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Breaks />
    },
    {
      path: 'breaks',
      element: <Navigate to="/" replace />
    },
    {
      path: 'ai-baskets/:basketId',
      element: <AIBasketDetail />
    },
    {
      path: 'ai-baskets',
      element: <AIBaskets />
    },
    // {
    //   path: 'buy-portfolio',
    //   element: <BuyPortfolios />
    // },
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
      element: <CoursesLayout />,
      children: [
        { index: true, element: <Courses /> },
        { path: 'cart', element: <CourseCart /> },
        { path: 'my-learning', element: <MyLearning /> },
        { path: ':courseId', element: <CourseDetail /> }
      ]
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
      element: <ContactUs />
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
      element: <VideosLayout />,
      children: [
        { index: true, element: <VideosHome /> },
        { path: 'watch/:videoId', element: <VideoWatch /> }
      ]
    },
    {
      path: 'shorts',
      element: <Shorts />
    },
    {
      path: 'games-1',
      element: <Navigate to="/games" replace />
    },
    {
      path: 'games',
      element: <GamesLayout />,
      children: [
        { index: true, element: <GamesHub /> },
        { path: 'market-quiz', element: <MarketQuiz /> },
        { path: 'ticker-scramble', element: <TickerScramble /> },
        { path: 'bull-or-bear', element: <BullOrBear /> }
      ]
    },
    {
      path: 'yoga',
      element: <Yoga />
    },
    {
      path: 'pranayam',
      element: <Pranayam />
    }
  ]
};

export default MainRoutes;
