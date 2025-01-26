// assets
import { MoneyCollectOutlined, OpenAIOutlined, FireOutlined, SlidersOutlined } from '@ant-design/icons';

// icons
const icons = {
  MoneyCollectOutlined,
  OpenAIOutlined,
  FireOutlined,
  SlidersOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const portfolio = {
  id: 'portfolio',
  title: 'Portfolio',
  type: 'group',
  children: [
    {
      id: 'aibaskets',
      title: 'AI Baskets',
      type: 'item',
      url: '/ai-baskets',
      icon: icons.OpenAIOutlined
    },
    {
      id: 'peopleinvest',
      title: 'People Invest',
      type: 'item',
      url: '/people-invest',
      icon: icons.MoneyCollectOutlined
    },
    {
      id: 'buyportfolio',
      title: 'Buy Portfolios',
      type: 'item',
      url: '/buy-portfolio',
      icon: icons.SlidersOutlined
    },
    {
      id: 'mstocks',
      title: 'Momentum Stocks',
      type: 'item',
      url: '/momentum-stocks',
      icon: icons.FireOutlined
    }
  ]
};

export default portfolio;


