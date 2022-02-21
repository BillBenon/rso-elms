import React from 'react';
import { useLocation } from 'react-router-dom';

import Permission from '../../../components/Atoms/auth/Permission';
import { Privileges } from '../../../types';
import { AcademyInfo } from '../../../types/services/academy.types';
import { UserInfo } from '../../../types/services/user.types';
import AcademiesCard from './AcademiesCard';
import EducationBackgroundCard from './EducationBackgroundCard';
import NextOfKinCard from './NextOfKinCard';
import PersonalInfoCard from './PersonalInfoCard';
import RankEnrollmentCard from './RankEnrollmentCard';
import UserRoleCard from './UserRoleCard';

function ProfileOverview({ user }: { user: UserInfo }) {
  const { search } = useLocation();
  const viewMyProfile = new URLSearchParams(search).get('me') || '';
  const userAcademies: AcademyInfo[] = user.academy ? [user.academy] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Permission
        privilege={Privileges.CAN_ACCESS_USERS_PERSONAL_INFO}
        ignorePrivilege={Boolean(viewMyProfile)}>
        <PersonalInfoCard user={user} />
      </Permission>
      <div className="flex flex-col gap-7">
        <AcademiesCard academies={userAcademies} />
        <Permission
          privilege={Privileges.CAN_ACCESS_USERS_NEXTOFKIN}
          ignorePrivilege={Boolean(viewMyProfile)}>
          <NextOfKinCard user={user} />
        </Permission>
        {user.person && <EducationBackgroundCard person={user.person} />}
      </div>
      <div className="flex flex-col gap-7">
        <Permission
          privilege={Privileges.CAN_ACCESS_USERS_RANKS}
          ignorePrivilege={Boolean(viewMyProfile)}>
          <RankEnrollmentCard user={user} />
        </Permission>
        <Permission
          privilege={Privileges.CAN_ACCESS_USERS_ROLES}
          ignorePrivilege={Boolean(viewMyProfile)}>
          <UserRoleCard user={user} />
        </Permission>
      </div>
    </div>
  );
}

export default ProfileOverview;
