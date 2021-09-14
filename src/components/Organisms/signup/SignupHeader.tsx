import React from 'react';

import Heading from '../../Atoms/Text/Heading';
import AcademyProfileCard from '../../Molecules/AcademyProfileCard';

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
        <AcademyProfileCard src="public\icons\police-logo.svg" alt="academy logo">
          Rwanda National Police
        </AcademyProfileCard>
      </div>
    </div>
  );
};

export default SignupHeader;
