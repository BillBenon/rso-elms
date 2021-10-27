import React from 'react';

import Heading from '../Atoms/Text/Heading';
import AcademyProfileCard from './cards/AcademyProfileCard';

const CompleteProfileHeader = () => {
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
        <AcademyProfileCard src="/images/nisslogo.png" alt="academy logo">
          National Intelligence and Security Service
        </AcademyProfileCard>
      </div>
    </div>
  );
};

export default CompleteProfileHeader;
