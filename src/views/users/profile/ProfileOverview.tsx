import React from 'react';

import { AcademyInfo } from '../../../types/services/academy.types';
import { UserInfo } from '../../../types/services/user.types';
import AcademiesCard from './AcademiesCard';
import EducationBackgroundCard from './EducationBackgroundCard';
import NextOfKinCard from './NextOfKinCard';
import PersonalInfoCard from './PersonalInfoCard';
import RankEnrollmentCard from './RankEnrollmentCard';

function ProfileOverview({ user, showMine }: { user: UserInfo; showMine: string }) {
  const userAcademies: AcademyInfo[] = user.academy ? [user.academy] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PersonalInfoCard user={user} showMine={showMine === 'true'} />
      <div className="flex flex-col gap-7">
        <AcademiesCard academies={userAcademies} />
        <NextOfKinCard user={user} />
        {user.person && <EducationBackgroundCard person={user.person} />}
      </div>
      <div className="flex flex-col gap-7">
        <RankEnrollmentCard user={user} />
        {/* <IntakesCard /> */}
      </div>
    </div>
  );
}

export default ProfileOverview;
