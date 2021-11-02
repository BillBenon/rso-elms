import React, { useEffect, useState } from 'react';

import { authenticatorStore } from '../../../store';
import { UserInfo, UserType } from '../../../types/services/user.types';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const [authUser, setAuthUser] = useState<UserInfo>();
  // const [organization, setOrganization] = useState({ name: '', photo: '' });
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
      // { title: 'Programs', to: '/dashboard/programs', icon: 'program' },
      { title: 'Divisions', to: '/dashboard/divisions', icon: 'faculty' },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
      { title: 'Levels', to: '/dashboard/levels', icon: 'level' },
      // { title: 'Modules', to: '/dashboard/modules', icon: 'module' },
      // { title: 'Subjects', to: '/dashboard/subjects', icon: 'module' },
      { title: 'Evalutaions', to: '/dashboard/evaluations', icon: 'evaluation' },
      { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
      {
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
      },
    ];

    const instructorAdminLinks: linkProps[] = [
      { title: 'Evalutaions', to: '/dashboard/view-evaluation', icon: 'evaluation' },
    ];

    if (authUser?.user_type == UserType.SUPER_ADMIN)
      routes.push(...institutionAdminLinks);
    if (authUser?.user_type == UserType.ADMIN) routes.push(...academicAdminLinks);
    if (authUser?.user_type == UserType.INSTRUCTOR) routes.push(...instructorAdminLinks);

    return routes;
  };

  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard src="/images/nisslogo.png" alt="academy logo">
          {authUser?.academy
            ? authUser.academy.name
            : 'National Intelligence and Security Service'}
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
