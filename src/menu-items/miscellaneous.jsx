// assets
import { LoginOutlined, ProfileOutlined, ContactsOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  ContactsOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const miscellaneous = {
  id: 'miscellaneous',
  title: 'Miscellaneous',
  type: 'group',
  children: [
    {
      id: 'brokers',
      title: 'Indian Brokers',
      type: 'item',
      url: '/brokers',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'contact',
      title: 'Contact Us',
      type: 'item',
      url: '/contactus',
      icon: icons.ContactsOutlined,
      target: true
    },
    {
      id: 'terms',
      title: 'T&C',
      type: 'item',
      url: '/t&c',
      icon: icons.ContactsOutlined,
      target: true
    }
  ]
};

export default miscellaneous;
