import React from 'react';

import Navigation from '../components/Molecules/navigation/Navigation';
import Sidebar from '../components/Molecules/sidebar/Sidebar';
import { Link } from '../types';

type IDashboard = { children: React.ReactNode; links?: any; activeIndex?: number };
interface ILinks extends Omit<Link, 'icon'> {
  icon: string;
}

const defaultLinks: ILinks[] = [
  { title: 'Users', to: '/users', icon: 'user' },
  { title: 'Roles', to: '/roles', icon: 'role' },
  { title: 'Academies', to: '/academies', icon: 'academy' },
  { title: 'Notifications', to: '/users', icon: 'notification' },
  { title: 'Popup test', to: '/popup', icon: 'notification' },
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
          <div className="">
            <Navigation />
          </div>
          <div className="block w-full h-full py-5 px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
