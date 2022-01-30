import React from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { Privileges } from '../../../types';
import { UserType } from '../../../types/services/user.types';
import { usePicture } from '../../../utils/file-util';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const { user } = useAuthenticator();

  const defaultLinks = (): linkProps[] => {
    const routes: linkProps[] = [];
    const instructorLinks: linkProps[] = [];
    const academicAdminLinks: linkProps[] = [];
    const studentLinks: linkProps[] = [];
    const institutionAdminLinks: linkProps[] = [];

    //Academic check
    institutionAdminLinks.push(
      {
        title: 'Users',
        to: '/dashboard/users',
        icon: 'user',
        privilege: Privileges.CAN_ACCESS_USERS,
      },
      {
        title: 'Academies',
        to: '/dashboard/academies',
        icon: 'academy',
        fill: false,
        privilege: Privileges.CAN_ACCESS_ACADEMY,
      },
      {
        title: 'Ranks',
        to: '/dashboard/ranks',
        icon: 'rank',
        privilege: Privileges.CAN_ACCESS_RANKS,
      },
      {
        title: 'Roles',
        to: '/dashboard/roles',
        icon: 'role',
        privilege: Privileges.CAN_ACCESS_ROLES,
      },
      { title: 'Privileges', to: '/dashboard/privileges', icon: 'module' },
    );

    //Academic years check
    academicAdminLinks.push(
      {
        title: 'Users',
        to: '/dashboard/users',
        icon: 'user',
        privilege: Privileges.CAN_ACCESS_USERS,
      },
      {
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        privilege: Privileges.CAN_ACCESS_INTAKES,
        fill: false,
      },
      {
        title: 'Schedule',
        to: '/dashboard/schedule',
        icon: 'calendar',
      },
      {
        title: 'Levels',
        to: '/dashboard/levels',
        icon: 'level',
        privilege: Privileges.CAN_ACCESS_LEVELS,
      },
      {
        title: 'Divisions',
        to: '/dashboard/divisions',
        icon: 'faculty',
        privilege: Privileges.CAN_ACCESS_DIVISIONS,
      },
      {
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
        privilege: Privileges.CAN_ACCESS_REG_CONTROLS,
      },
      {
        title: 'Academic years',
        to: '/dashboard/academic-years',
        icon: 'program',
        privilege: Privileges.CAN_ACCESS_ACADEMIC_YEARS,
      },
    );

    instructorLinks.push(
      {
        title: 'Modules',
        to: '/dashboard/inst-module',
        icon: 'module',
        privilege: Privileges.CAN_ACCESS_MODULES,
      },
      {
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        fill: false,
        privilege: Privileges.CAN_ACCESS_INTAKES,
      },
      { title: 'Evaluations', to: '/dashboard/evaluations', icon: 'evaluation' },
      { title: 'Schedule', to: '/dashboard/schedule', icon: 'calendar' },
    );
    studentLinks.push(
      {
        title: 'Module',
        to: '/dashboard/student',
        icon: 'module',
        privilege: Privileges.CAN_ACCESS_MODULES,
      },
      {
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        privilege: Privileges.CAN_ACCESS_INTAKES,
        fill: false,
      },
      {
        title: 'Calendar',
        to: '/dashboard/schedule/student/calendar',
        icon: 'calendar',
      },
      { title: 'Timetable', to: '/dashboard/schedule/timetable', icon: 'calendar' },
    );

    if (user?.user_type == UserType.SUPER_ADMIN) routes.push(...institutionAdminLinks);
    if (user?.user_type == UserType.ADMIN) routes.push(...academicAdminLinks);
    if (user?.user_type == UserType.INSTRUCTOR) routes.push(...instructorLinks);
    if (user?.user_type == UserType.STUDENT) routes.push(...studentLinks);

    return routes;
  };

  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src={usePicture(
            user?.academy?.logo_attachment_id,
            user?.academy?.id,
            '/images/rdf-logo.png',
            'logos',
          )}
          round={false}
          alt="insitution logo">
          {user?.institution_name === null
            ? 'Institution name'
            : user?.user_type === UserType.SUPER_ADMIN
            ? user.institution_name
            : user?.academy?.name}
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
