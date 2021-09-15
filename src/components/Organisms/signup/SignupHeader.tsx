import React from 'react';

import Heading from '../../Atoms/Text/Heading';
import AcademyProfileCard from '../../Molecules/cards/AcademyProfileCard';

const SignupHeader = () => {
  return (
    <div className="flex justify-between mb-5">
      <div>
        <Heading fontSize="2xl" fontWeight="semibold">
          Complete Profile
        </Heading>
        <p className="text-txt-secondary text-base">
          Fill in the form credentials to complete your profile
        </p>
      </div>
      <div>
        <AcademyProfileCard src="/icons/police-logo.svg" alt="academy logo" size="39">
          Rwanda National Police
        </AcademyProfileCard>
      </div>
    </div>
  );
};

export default SignupHeader;
