// assets
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import SortAscendingOutlined from '@ant-design/icons/SortAscendingOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';

// icons
const icons = {
  TrophyOutlined,
  QuestionCircleOutlined,
  SortAscendingOutlined,
  ThunderboltOutlined
};

// ==============================|| MENU ITEMS - GAMES ||============================== //

const games = {
  id: 'games',
  title: 'Games',
  type: 'group',
  children: [
    {
      id: 'games-hub',
      title: 'Stock Games',
      type: 'item',
      url: '/games',
      icon: icons.TrophyOutlined
    },
    {
      id: 'games-quiz',
      title: 'Market Quiz',
      type: 'item',
      url: '/games/market-quiz',
      icon: icons.QuestionCircleOutlined
    },
    {
      id: 'games-ticker',
      title: 'Ticker Scramble',
      type: 'item',
      url: '/games/ticker-scramble',
      icon: icons.SortAscendingOutlined
    },
    {
      id: 'games-bull',
      title: 'Bull or Bear',
      type: 'item',
      url: '/games/bull-or-bear',
      icon: icons.ThunderboltOutlined
    }
  ]
};

export default games;
