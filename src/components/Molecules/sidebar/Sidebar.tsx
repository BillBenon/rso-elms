import React from 'react';
import { useTranslation } from 'react-i18next';

import useAuthenticator from '../../../hooks/useAuthenticator';
import academyStore from '../../../store/administration/academy.store';
import { institutionStore } from '../../../store/administration/institution.store';
import { Privileges, RoleType } from '../../../types';
import { UserType } from '../../../types/services/user.types';
import cookie from '../../../utils/cookie';
// import { usePicture } from '../../../utils/file-util';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
// import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const { user } = useAuthenticator();
  const { t } = useTranslation();
  const defaultLinks = (): linkProps[] => {
    const routes: linkProps[] = [];
    const institutionAdminLinks: linkProps[] = [];
    const privilegedLinks: linkProps[] = [];

    institutionAdminLinks.push(
      {
        title: 'Users',
        to: '/dashboard/users',
        icon: 'user',
      },
      {
        title: 'Academies',
        to: '/dashboard/academies',
        icon: 'academy',
        fill: false,
      },
      {
        title: 'Ranks',
        to: '/dashboard/ranks',
        icon: 'rank',
      },
      {
        title: 'Roles',
        to: '/dashboard/roles',
        icon: 'role',
      },
      {
        title: 'Privileges',
        to: '/dashboard/privileges',
        icon: 'privilege',
        fill: false,
      },
    );
    privilegedLinks.push(
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
        title: 'Academies',
        to: '/dashboard/academies',
        icon: 'academy',
        fill: false,
        privilege: Privileges.CAN_ACCESS_ACADEMY,
      },
      {
        title: t('Division'),
        to: '/dashboard/divisions',
        icon: 'faculty',
        privilege: Privileges.CAN_ACCESS_DIVISIONS,
      },
      {
        title: 'Levels',
        to: '/dashboard/levels',
        icon: 'level',
        privilege: Privileges.CAN_ACCESS_LEVELS,
      },
      {
        title: 'Academic years',
        to: '/dashboard/academic-years',
        icon: 'program',
        privilege: Privileges.CAN_ACCESS_ACADEMIC_YEARS,
      },
      {
        title: 'Registration Periods',
        to: '/dashboard/registration-periods',
        icon: 'reg-control',
        privilege: Privileges.CAN_ACCESS_REG_CONTROLS,
      },
      {
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        privilege: Privileges.CAN_ACCESS_INTAKES,
        fill: false,
      },
      {
        title: 'Teaching Modules',
        to: '/dashboard/inst-module',
        icon: 'module',
        privilege: Privileges.CAN_TEACH_MODULE,
      },
      {
        title: 'Learning Modules',
        to: '/dashboard/student',
        icon: 'module',
        privilege: Privileges.CAN_ACCESS_MODULES,
      },
      // for the students access subject
      {
        title: 'Evaluations',
        to: '/dashboard/evaluations',
        icon: 'evaluation',
        privilege: Privileges.CAN_MANAGE_EVALUATIONS,
      },
      {
        title: 'Schedule',
        to: '/dashboard/schedule',
        icon: 'calendar',
        privilege: Privileges.CAN_ACCESS_SCHEDULES,
      },
      {
        title: 'Calendar',
        to: '/dashboard/schedule/student/calendar',
        icon: 'calendar',
        privilege: Privileges.CAN_ACCESS_CALENDER,
      },
      // {
      //   title: 'Timetable',
      //   to: '/dashboard/schedule/timetable',
      //   icon: 'calendar',
      //   privilege: Privileges.CAN_ACCESS_TIMETABLE,
      // },
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
        privilege: Privileges.CAN_ACCESS_PRIVILEGES,
      },
    );

    if (user?.user_type === UserType.SUPER_ADMIN) {
      routes.push(...institutionAdminLinks);
    } else {
      routes.push(...privilegedLinks);
    }

    return routes;
  };

  const user_role_cookie = cookie.getCookie('user_role') || '';
  const user_role = user?.user_roles?.find((role) => role.id + '' === user_role_cookie);

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
    <div className="bg-white md:h-screen overflow-y-scroll p-0">
      {/* <div className="px-4 py-4">
        <AcademyProfileCard
          src={usePicture(
            display_attach_id
              ? display_attach_id
              : user_role?.type === RoleType.ACADEMY
              ? user?.academy?.logo_attachment_id
              : user?.institution?.logo_attachment_id || undefined,
            display_id ? display_id : user?.academy?.id,
            '/images/rdf-logo.png',
            'logos',
          )}
          round={false}
          alt="insitution logo">
          {display_name || user?.institution_name}
        </AcademyProfileCard>
      </div> */}
      <SidebarLinks links={defaultLinks()} />
    </div>
  );
}
