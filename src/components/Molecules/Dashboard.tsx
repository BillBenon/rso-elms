import React from 'react';

import Navigation from './navigation/Navigation';
import Sidebar from './sidebar/Sidebar';

type IDashboard = { children: React.ReactNode };

export default function Dashboard({ children }: IDashboard) {
  const links = [
    { label: 'Users', to: '/users', icon: 'notification', active: false },
    { label: 'Notifications', to: '/users', icon: 'notification', active: true },
  ];

  return (
    <div className="bg-gray-50 h-screen">
      {/* inner block */}
      <div className="lg:flex gap-5 lg:p-5 h-5/6">
        <div className="lg:w-64 h-full top-0 lg:sticky">
          <Sidebar links={links} />
        </div>
        {/* navbar and body */}
        <div className="block lg:w-4/5">
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="block w-full h-full py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
