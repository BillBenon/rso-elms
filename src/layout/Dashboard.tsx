import React from 'react';

import Navigation from '../components/Molecules/navigation/Navigation';
import Sidebar from '../components/Molecules/sidebar/Sidebar';
import { Link } from '../types';

type IDashboard = { children: React.ReactNode; links?: any };
interface ILinks extends Omit<Link, 'icon'> {
  icon: string;
}

const defaultLinks: ILinks[] = [
  { title: 'users', to: '/users', icon: 'user' },
  { title: 'roles', to: '/roles', icon: 'role' },
  { title: 'academies', to: '/academies', icon: 'academy' },
  { title: 'notifications', to: '/users', icon: 'notification' },
  { title: 'popup test', to: '/popup', icon: 'notification' },
  { title: 'modules', to: '/modules', icon: 'notification' },
  { title: 'faculties', to: '/faculties', icon: 'faculty' },
];
export default function Dashboard({ children, links = defaultLinks }: IDashboard) {
  return (
    <div className="grid grid-cols-12 bg-gray-50">
      <div className="hidden md:block md:col-span-3 xl:col-span-2 h-screen top-0 lg:sticky ">
        <Sidebar links={links} />
      </div>
      {/* navbar and body */}
      <div className="w-full md:col-span-9 xl:col-span-10 col-span-10 block">
        <Navigation />
        <div className="block w-full h-auto py-5 px-8">{children}</div>
      </div>
    </div>
  );
}
