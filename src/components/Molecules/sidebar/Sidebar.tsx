import React, { useEffect, useState } from 'react';

import { authenticatorStore } from '../../../store/administration';
import intakeProgramStore from '../../../store/administration/intake-program.store';
import { UserInfo, UserType } from '../../../types/services/user.types';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const [authUser, setAuthUser] = useState<UserInfo>();
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    setAuthUser(data?.data.data);
  }, [data?.data.data]);

  const getStudent = intakeProgramStore.getStudentShipByUserId(authUser?.id + '' || '')
    .data?.data.data[0];

  const getPrograms = intakeProgramStore.getIntakeProgramsByStudent(
    getStudent?.id + '' || '',
  ).data?.data.data[0];

  const getLevels =
    intakeProgramStore.getStudentLevels(getPrograms?.id + '' || '').data?.data.data || [];

  const defaultLinks = (): linkProps[] => {
    const routes: linkProps[] = [];
    const institutionAdminLinks: linkProps[] = [
      { title: 'Users', to: '/dashboard/users', icon: 'user' },
      { title: 'Roles', to: '/dashboard/roles', icon: 'role' },
      { title: 'Academies', to: '/dashboard/academies', icon: 'academy', fill: false },
      { title: 'Privileges', to: '/dashboard/privileges', icon: 'module' },
    ];
    const academicAdminLinks: linkProps[] = [
      { title: 'Users', to: '/dashboard/users', icon: 'user' },
      { title: 'Divisions', to: '/dashboard/divisions', icon: 'faculty' },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
      { title: 'Intakes', to: '/dashboard/intakes', icon: 'academy', fill: false },
      { title: 'Levels', to: '/dashboard/levels', icon: 'level' },
      { title: 'Events', to: '/dashboard/events', icon: 'calendar' },
      { title: 'Venues', to: '/dashboard/venues', icon: 'program' },
      {
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
      },
      { title: 'Academic years', to: '/dashboard/academic-years', icon: 'program' },
    ];

    const instructorLinks: linkProps[] = [
      { title: 'Evaluations', to: '/dashboard/evaluations', icon: 'evaluation' },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
      { title: 'Events', to: '/dashboard/events', icon: 'calendar' },
    ];

    const studentLinks: linkProps[] = [
      getLevels.length > 0
        ? {
            title: 'Levels',
            to: `/dashboard/student/levels/${getLevels[0].id || ''}`,
            icon: 'level',
          }
        : {
            title: '',
            to: '',
            icon: 'level',
          },
      // { title: 'Modules', to: '/dashboard/modules', icon: 'module' },
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
