import React from 'react';

import Heading from '../Atoms/Text/Heading';
import AcademyProfileCard from './cards/AcademyProfileCard';

type IHeader = {
  title?: string;
  details?: string;
};
const CompleteProfileHeader = ({
  title = 'Complete Profile',
  details = 'Fill in the form credentials to complete your profile',
}: IHeader) => {
  return (
    <div className="flex justify-between mb-14">
      <div>
        <Heading fontSize="lg" className="md:2xl" fontWeight="semibold">
          {title}
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">{details}</p>
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
