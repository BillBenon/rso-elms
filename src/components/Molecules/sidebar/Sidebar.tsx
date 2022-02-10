import React from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import academyStore from '../../../store/administration/academy.store';
import { institutionStore } from '../../../store/administration/institution.store';
import { Privileges, RoleResWithPrevilages, RoleType } from '../../../types';
import { UserType } from '../../../types/services/user.types';
import cookie from '../../../utils/cookie';
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
      {
        title: 'Privileges',
        to: '/dashboard/privileges',
        icon: 'privilege',
        fill: false,
      },
    );

    //Academic years check
    academicAdminLinks.push(
      {
        title: 'Dashboard',
        to: '/dashboard/admin',
        icon: 'dashboard',
        privilege: Privileges.CAN_ACCESS_USERS,
        fill: false,
      },
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

  const user_role_cookie = cookie.getCookie('user_role');
  const user_role: RoleResWithPrevilages | undefined = user_role_cookie
    ? JSON.parse(user_role_cookie)
    : undefined;

  const institution = institutionStore.getAll().data?.data.data;
  const academy_info = academyStore.fetchAcademies().data?.data.data;

  const display_attach_id =
    user_role?.type === RoleType.ACADEMY
      ? academy_info?.find((ac) => ac.id === user_role?.academy_id)?.logo_attachment_id
      : institution?.find((ac) => ac.id === user_role?.institution_id)
          ?.logo_attachment_id || undefined;

  const display_id =
    user_role?.type === RoleType.ACADEMY
      ? academy_info?.find((ac) => ac.id === user_role?.academy_id)?.id
      : institution?.find((ac) => ac.id === user_role?.institution_id)?.id + '';

  const display_name =
    user_role?.type === RoleType.ACADEMY
      ? academy_info?.find((ac) => ac.id === user_role?.academy_id)?.name
      : institution?.find((ac) => ac.id === user_role?.institution_id)?.name;

  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src={usePicture(
            display_attach_id
              ? display_attach_id
              : user_role?.type === RoleType.ACADEMY
              ? user?.academy?.logo_attachment_id
              : user?.institution.logo_attachment_id || undefined,
            display_id ? display_id : user?.academy?.id,
            '/images/rdf-logo.png',
            'logos',
          )}
          round={false}
          alt="insitution logo">
          {display_name}
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
