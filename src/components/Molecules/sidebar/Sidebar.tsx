import React from 'react';

import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

const defaultLinks: linkProps[] = [
  { title: 'Users', to: '/users', icon: 'user' },
  { title: 'Roles', to: '/roles', icon: 'role' },
  { title: 'Academies', to: '/academies', icon: 'academy', fill: false },
  { title: 'Faculties', to: '/faculties', icon: 'faculty' },
  { title: 'Programs', to: '/programs', icon: 'faculty' },
  { title: 'Levels', to: '/levels', icon: 'level' },
  // { title: 'Popup test', to: '/popup', icon: 'notification' },
  { title: 'Modules', to: '/modules', icon: 'module' },
  { title: 'Subjects', to: '/subjects', icon: 'module' },
  { title: 'Intakes', to: '/intakes', icon: 'academy', fill: false },
  {
    title: 'Registration Control',
    to: '/registration-control',
    icon: 'reg-control',
    fill: true,
  },
  // {
  //   title: 'Login',
  //   to: '/login',
  //   icon: '',
  //   fill: false,
  // },
  // {
  //   title: 'Register',
  //   to: '/register',
  //   icon: '',
  //   fill: false,
  // },
];

export default function Sidebar() {
  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Rwanda_National_Police.png"
          alt="academy logo">
          Rwanda National Police
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks} />
    </div>
  );
}
