import React from 'react';

import AcademiesCard from './AcademiesCard';
import EducationBackgroundCard from './EducationBackgroundCard';
import IntakesCard from './IntakesCard';
import NextOfKinCard from './NextOfKinCard';
import PersonalInfoCard from './PersonalInfoCard';
import RankEnrollmentCard from './RankEnrollmentCard';

function ProfileOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PersonalInfoCard />
      <div className="flex flex-col gap-7">
        <AcademiesCard />
        <NextOfKinCard />
        <EducationBackgroundCard />
      </div>
      <div className="flex flex-col gap-7">
        <RankEnrollmentCard />
        <IntakesCard />
      </div>
    </div>
  );
}

export default ProfileOverview;
