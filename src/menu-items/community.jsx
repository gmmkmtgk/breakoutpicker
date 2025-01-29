// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const community = {
  id: 'community',
  title: 'Community',
  type: 'group',
  children: [
    {
      id: 'voices',
      title: 'Voices',
      type: 'item',
      url: '/voices',
      icon: icons.LoginOutlined
    },
    {
      id: 'videos',
      title: 'Videos',
      type: 'item',
      url: '/videos',
      icon: icons.ProfileOutlined
    },
    {
      id: 'shorts',
      title: 'Shorts',
      type: 'item',
      url: '/shorts',
      icon: icons.ProfileOutlined
    }
  ]
};

export default community;
