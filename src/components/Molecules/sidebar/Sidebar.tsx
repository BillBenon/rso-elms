import React, { useEffect, useState } from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { Privileges } from '../../../types';
import { UserType } from '../../../types/services/user.types';
import { usePicture } from '../../../utils/file-util';
import SidebarLinks, { linkProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../cards/AcademyProfileCard';

export default function Sidebar() {
  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();
  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);

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
    ];
    if (privileges?.includes(Privileges.CAN_ACCESS_INTAKES)) {
      academicAdminLinks.push({
        title: 'Intakes',
        to: '/dashboard/intakes',
        icon: 'academy',
        fill: false,
      });
    }
    academicAdminLinks.push({
      title: 'Schedule',
      to: '/dashboard/schedule',
      icon: 'calendar',
    });
    if (privileges?.includes(Privileges.CAN_ACCESS_DIVISIONS)) {
      academicAdminLinks.push({
        title: 'Divisions',
        to: '/dashboard/divisions',
        icon: 'faculty',
      });
    }

    academicAdminLinks.push({
      title: 'Academic years',
      to: '/dashboard/academic-years',
      icon: 'program',
    });

    if (privileges?.includes(Privileges.CAN_ACCESS_REG_CONTROLS)) {
      academicAdminLinks.push({
        title: 'Registration Control',
        to: '/dashboard/registration-control',
        icon: 'reg-control',
      });
    }

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
      { title: 'Timetable', to: '/dashboard/schedule/timetable', icon: 'calendar' },
      { title: 'Calendar', to: '/dashboard/schedule', icon: 'calendar' },
    ];

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
