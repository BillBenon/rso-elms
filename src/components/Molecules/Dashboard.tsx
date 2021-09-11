import React from 'react';

import Navigation from './navigation/Navigation';
import Sidebar from './sidebar/Sidebar';

type IDashboard = { children: React.ReactNode };

export default function Dashboard({ children }: IDashboard) {
  const links = [
    { label: 'Users', to: '/users', icon: 'user', active: false },
    { label: 'Roles', to: '/roles', icon: 'role', active: false },
    { label: 'Academies', to: '/academies', icon: 'academy', active: false },
    { label: 'Notifications', to: '/users', icon: 'notification', active: true },
    { label: 'Popup test', to: '/popup', icon: 'notification', active: false },
  ];

  return (
    <div className="bg-gray-50 h-screen">
      {/* inner block */}
      <div className="lg:flex gap-0 h-5/6">
        <div className="lg:w-64 h-full top-0 lg:sticky">
          <Sidebar links={links} activeIndex={1} />
        </div>
        {/* navbar and body */}
        <div className="block w-full">
          <div className="">
            <Navigation />
          </div>
          <div className="block w-full h-full py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
