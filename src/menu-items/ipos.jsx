// assets
import { RiseOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  RiseOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const ipos = {
  id: 'ipos',
  title: 'IPOs',
  type: 'group',
  children: [
    {
      id: 'gmp',
      title: 'GMP',
      type: 'item',
      url: 'https://ipos.breakoutpicker.com/',
      icon: icons.ProfileOutlined,
      target: true,
      external: true
    },
    {
      id: 'ath',
      title: 'ATH Crossing IPOs',
      type: 'item',
      url: '/ath-ipos',
      icon: icons.RiseOutlined,
      target: true
    }
  ]
};

export default ipos;
