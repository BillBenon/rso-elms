import React from 'react';

import Navigation from './navigation/Navigation';
import Sidebar from './sidebar/Sidebar';

type IDashboard = { children: React.ReactNode; links?: any; activeIndex?: number };

const defaultLinks = [
  { label: 'Users', to: '/users', icon: 'user', active: false },
  { label: 'Roles', to: '/roles', icon: 'role', active: false },
  { label: 'Academies', to: '/academies', icon: 'academy', active: false },
  { label: 'Notifications', to: '/users', icon: 'notification', active: true },
];
export default function Dashboard({
  children,
  links = defaultLinks,
  activeIndex = 0,
}: IDashboard) {
  return (
    <div className="bg-gray-50 h-screen">
      {/* inner block */}
      <div className="lg:flex gap-0 h-5/6">
        <div className="lg:w-64 h-full top-0 lg:sticky">
          <Sidebar links={links} activeIndex={activeIndex} />
        </div>
        {/* navbar and body */}
        <div className="block w-full">
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="block w-full h-full py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
