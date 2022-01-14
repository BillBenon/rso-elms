import React, { useEffect, useState } from 'react';

import { authenticatorStore } from '../../../store/administration';
import { UserInfo, UserType } from '../../../types/services/user.types';
import { usePicture } from '../../../utils/file-util';
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
      { title: 'Ranks', to: '/dashboard/ranks', icon: 'rank' },
      { title: 'Roles', to: '/dashboard/roles', icon: 'role' },
      { title: 'Privileges', to: '/dashboard/privileges', icon: 'module' },
    ];
    const academicAdminLinks: linkProps[] = [
      { title: 'Users', to: '/dashboard/users', icon: 'user' },
      { title: 'Levels', to: '/dashboard/levels', icon: 'level' },
      { title: 'Divisions', to: '/dashboard/divisions', icon: 'faculty' },
      { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
      { title: 'Academic years', to: '/dashboard/academic-years', icon: 'program' },
      {
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
      },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
    ];

    const instructorLinks: linkProps[] = [
      { title: 'Modules', to: '/dashboard/inst-module', icon: 'module' },
      {
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        fill: false,
      },
      { title: 'Evaluations', to: '/dashboard/evaluations', icon: 'evaluation' },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
      { title: 'Events', to: '/dashboard/events', icon: 'calendar' },
    ];

    const studentLinks: linkProps[] = [
      { title: 'Module', to: '/dashboard/student', icon: 'module' },
      { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
    ];

    if (authUser?.user_type == UserType.SUPER_ADMIN)
      routes.push(...institutionAdminLinks);
    if (authUser?.user_type == UserType.ADMIN) routes.push(...academicAdminLinks);
    if (authUser?.user_type == UserType.INSTRUCTOR) routes.push(...instructorLinks);
    if (authUser?.user_type == UserType.STUDENT) routes.push(...studentLinks);

    return routes;
  };

  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src={usePicture(
            authUser?.academy?.logo_attachment_id,
            authUser?.academy?.id,
            '/images/rdf-logo.png',
            'logos',
          )}
          round={false}
          alt="insitution logo">
          {authUser?.institution_name === null
            ? 'Institution name'
            : authUser?.user_type === UserType.SUPER_ADMIN
            ? authUser.institution_name
            : authUser?.academy?.name}
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
