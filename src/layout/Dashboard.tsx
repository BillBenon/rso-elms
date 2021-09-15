import React from 'react';

import Navigation from '../components/Molecules/navigation/Navigation';
import Sidebar from '../components/Molecules/sidebar/Sidebar';
import { Link } from '../types';

type IDashboard = { children: React.ReactNode; links?: any };
interface ILinks extends Omit<Link, 'icon'> {
  icon: string;
}

const defaultLinks: ILinks[] = [
  { title: 'Users', to: '/users', icon: 'user' },
  { title: 'Roles', to: '/roles', icon: 'role' },
  { title: 'Academies', to: '/academies', icon: 'academy' },
  { title: 'Notifications', to: '/users', icon: 'notification' },
  { title: 'Popup test', to: '/popup', icon: 'notification' },
  { title: 'Modules', to: '/modules', icon: 'notification' },
  { title: 'Registration Control', to: '/registration-control', icon: 'reg-control' },
];
export default function Dashboard({ children, links = defaultLinks }: IDashboard) {
  return (
    <div className="flex bg-gray-50">
      <div className="hidden md:block w-80 h-screen top-0 lg:sticky ">
        <Sidebar links={links} />
      </div>
      {/* navbar and body */}
      <div className="w-full md:col-span-9 xl:col-span-9 col-span-10 block">
        <Navigation />
        <div className="block w-full h-auto py-5 px-8">{children}</div>
      </div>
    </div>
  );
}
