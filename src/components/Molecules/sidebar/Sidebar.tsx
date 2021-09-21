import React from 'react';

import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

const defaultLinks: linkProps[] = [
  { title: 'Users', to: '/users', icon: 'user' },
  { title: 'Roles', to: '/roles', icon: 'role' },
  { title: 'Academies', to: '/academies', icon: 'academy', fill: false },
  { title: 'Faculties', to: '/faculties', icon: 'faculty' },
  { title: 'Popup test', to: '/popup', icon: 'notification' },
  { title: 'Modules', to: '/modules', icon: 'module' },
  { title: 'Subjects', to: '/subjects', icon: 'module' },
  { title: 'Intakes', to: '/intakes', icon: 'academy', fill: false },
  {
    title: 'Registration Control',
    to: '/registration-control',
    icon: 'reg-control',
    fill: true,
  },
];

export default function Sidebar() {
  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="academy logo">
          University of Rwanda
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks} />
    </div>
  );
}
