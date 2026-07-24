// assets
import { RobotOutlined, StockOutlined, MoneyCollectOutlined, ContainerOutlined, DiffOutlined } from '@ant-design/icons';
// icons
const icons = {
  RobotOutlined,
  StockOutlined,
  MoneyCollectOutlined,
  ContainerOutlined,
  DiffOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const researchs = {
  id: 'research',
  title: 'Research',
  type: 'group',
  children: [
    {
      id: 'fando',
      title: 'F&O Max',
      type: 'item',
      url: '/fando',
      icon: icons.MoneyCollectOutlined
    },
    {
      id: 'chartsai',
      title: 'Charts AI',
      type: 'item',
      url: '/charts-ai',
      icon: icons.StockOutlined
    },
    {
      id: 'financials',
      title: 'Financials',
      type: 'item',
      url: '/financials',
      icon: icons.StockOutlined
    },
    {
      id: 'comparestocks',
      title: 'Compare Stocks',
      type: 'item',
      url: '/compare-stocks',
      icon: icons.DiffOutlined
    },
    {
      id: 'wabot',
      title: 'WA Bot',
      type: 'item',
      url: '/wabot',
      icon: icons.RobotOutlined
    },
    {
      id: 'news',
      title: 'News',
      type: 'item',
      url: '/news',
      icon: icons.ContainerOutlined
    }
  ]
};

export default researchs;
