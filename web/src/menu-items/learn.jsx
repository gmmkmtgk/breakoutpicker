// assets
import { BookOutlined, ScheduleOutlined, VideoCameraOutlined, NodeCollapseOutlined } from '@ant-design/icons';

// icons
const icons = {
  BookOutlined,
  ScheduleOutlined,
  VideoCameraOutlined,
  NodeCollapseOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const learn = {
  id: 'learn',
  title: 'Learn',
  type: 'group',
  children: [
    {
      id: 'roadmap',
      title: 'Roadmap',
      type: 'item',
      url: '/roadmap',
      icon: icons.NodeCollapseOutlined
    },
    {
      id: 'books',
      title: 'Books',
      type: 'item',
      url: '/books',
      icon: icons.BookOutlined
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'item',
      url: '/courses',
      icon: icons.VideoCameraOutlined
    },
    {
      id: 'workshops',
      title: 'Workshops',
      type: 'item',
      url: '/workshops',
      icon: icons.ScheduleOutlined
    }
  ]
};

export default learn;
