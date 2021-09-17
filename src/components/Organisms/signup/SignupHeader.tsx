import React from 'react';

import Heading from '../../Atoms/Text/Heading';
import AcademyProfileCard from '../../Molecules/cards/AcademyProfileCard';

const SignupHeader = () => {
  return (
    <div className="flex justify-between mb-14">
      <div>
        <Heading fontSize="lg" className="md:2xl" fontWeight="semibold">
          Complete Profile
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">
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
