import { Outlet } from 'react-router-dom';

import { CoursesMarketplaceProvider } from 'contexts/CoursesMarketplaceContext';

import CoursesChrome from './CoursesChrome';

export default function CoursesLayout() {
  return (
    <CoursesMarketplaceProvider>
      <CoursesChrome>
        <Outlet />
      </CoursesChrome>
    </CoursesMarketplaceProvider>
  );
}
