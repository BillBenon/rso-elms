import React from 'react';

import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

const defaultLinks: linkProps[] = [
  { title: 'Users', to: '/dashboard/users', icon: 'user' },
  { title: 'Roles', to: '/dashboard/roles', icon: 'role' },
  { title: 'Academies', to: '/dashboard/academies', icon: 'academy', fill: false },
  { title: 'Faculties', to: '/dashboard/faculties', icon: 'faculty' },
  { title: 'Programs', to: '/dashboard/programs', icon: 'faculty' },
  { title: 'Levels', to: '/dashboard/levels', icon: 'level' },
  { title: 'Modules', to: '/dashboard/modules', icon: 'module' },
  { title: 'Subjects', to: '/dashboard/subjects', icon: 'module' },
  { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
  {
    title: 'Registration Control',
    to: '/dashboard/registration-control',
    icon: 'reg-control',
    fill: true,
  },
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
