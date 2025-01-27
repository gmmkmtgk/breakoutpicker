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

const games = {
  id: 'games',
  title: 'Games',
  type: 'group',
  children: [
    {
      id: 'game1',
      title: 'Game 1',
      type: 'item',
      url: '/games-1',
      icon: icons.OpenAIOutlined
    }
  ]
};

export default games;
