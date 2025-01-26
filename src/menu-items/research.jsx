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
      icon: icons.MoneyCollectOutlined,
      target: true
    },
    {
      id: 'chartsai',
      title: 'Charts AI',
      type: 'item',
      url: '/chartsai',
      icon: icons.StockOutlined,
      target: true
    },
    {
      id: 'financials',
      title: 'Financials',
      type: 'item',
      url: '/financials',
      icon: icons.StockOutlined,
      target: true
    },
    {
      id: 'comparestocks',
      title: 'Compare Stocks',
      type: 'item',
      url: '/comparestocks',
      icon: icons.DiffOutlined,
      target: true
    },
    {
      id: 'wabot',
      title: 'WA Bot',
      type: 'item',
      url: '/wabot',
      icon: icons.RobotOutlined,
      target: true
    },
    {
      id: 'news',
      title: 'News',
      type: 'item',
      url: '/news',
      icon: icons.ContainerOutlined,
      target: true
    }
  ]
};

export default researchs;
