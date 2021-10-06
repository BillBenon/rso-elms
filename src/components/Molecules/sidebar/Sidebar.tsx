import React, { useEffect, useState } from 'react';

import { authenticatorStore } from '../../../store';
import { UserInfo } from '../../../types/services/user.types';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const [authUser, setAuthUser] = useState<UserInfo>();
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    setAuthUser(data?.data.data);
  }, [data?.data.data]);

  const defaultLinks = (): linkProps[] => {
    const routes: linkProps[] = [];
    const institutionAdminLinks: linkProps[] = [
      { title: 'Users', to: '/dashboard/users', icon: 'user' },
      { title: 'Academies', to: '/dashboard/academies', icon: 'academy', fill: false },
      { title: 'Roles', to: '/dashboard/roles', icon: 'role' },
      { title: 'Privileges', to: '/dashboard/privileges', icon: 'module' },
    ];
    const academicAdminLinks: linkProps[] = [
      { title: 'Programs', to: '/dashboard/programs', icon: 'program' },
      { title: 'Divisions', to: '/dashboard/divisions', icon: 'faculty' },
      { title: 'Levels', to: '/dashboard/levels', icon: 'level' },
      { title: 'Modules', to: '/dashboard/modules', icon: 'module' },
      // { title: 'Subjects', to: '/dashboard/subjects', icon: 'module' },
      { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
      {
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
        fill: true,
      },
    ];

    if (authUser?.user_type == 'SUPER_ADMIN' || import.meta.env.DEV)
      routes.push(...institutionAdminLinks);
    if (authUser?.user_type == 'ADMIN' || import.meta.env.DEV)
      routes.push(...academicAdminLinks);

    return routes;
  };

  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Rwanda_National_Police.png"
          alt="academy logo">
          Rwanda National Police
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
