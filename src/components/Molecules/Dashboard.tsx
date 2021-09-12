import React from 'react';

import { Link } from '../../types';
import Navigation from './navigation/Navigation';
import Sidebar from './sidebar/Sidebar';

type IDashboard = { children: React.ReactNode };
interface ILinks extends Omit<Link, 'icon'> {
  icon: string;
}

export default function Dashboard({ children }: IDashboard) {
  const links: ILinks[] = [
    { title: 'Users', to: '/users', icon: 'user', active: false },
    { title: 'Roles', to: '/roles', icon: 'role', active: false },
    { title: 'Academies', to: '/academies', icon: 'academy', active: false },
    { title: 'Notifications', to: '/users', icon: 'notification', active: true },
    { title: 'Popup test', to: '/popup', icon: 'notification', active: false },
    { title: 'Modules', to: '/modules', icon: 'notification', active: false },
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
