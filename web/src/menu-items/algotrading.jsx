// assets
import { RobotOutlined } from '@ant-design/icons';

// icons
const icons = {
  RobotOutlined
};

// ==============================|| MENU ITEMS - ALGO TRADING ||============================== //

const algotrading = {
  id: 'algotrading',
  title: 'Algo Trading',
  type: 'group',
  children: [
    {
      id: 'backtesting',
      title: 'Backtesting',
      type: 'item',
      url: '/backtesting',
      icon: icons.RobotOutlined
    }
  ]
};

export default algotrading;
