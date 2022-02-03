import React from 'react';

import { institutionStore } from '../../store/administration/institution.store';
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
  const institution = institutionStore.getAll();
  return (
    <div className="flex justify-between mb-14">
      <div>
        <Heading fontSize="lg" className="md:2xl" fontWeight="semibold">
          {title}
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">{details}</p>
      </div>
      <div>
        <AcademyProfileCard
          src="/images/rdf-logo.png"
          alt="institution logo"
          size="80"
          bgColor="none"
          txtSize="lg"
          fontWeight="semibold"
          color="primary"
          subtitle={institution.data?.data.data[0].moto}>
          {institution.data?.data.data[0].name}
        </AcademyProfileCard>
      </div>
    </div>
  );
};

export default CompleteProfileHeader;
