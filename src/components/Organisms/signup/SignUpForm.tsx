import React from 'react';

import Heading from '../../Atoms/Text/Heading';
import AcademyProfileCard from '../../Molecules/cards/AcademyProfileCard';
import Stepper from '../../Molecules/Stepper/Stepper';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails';
import NationalDocuments from './NationalDocument';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails';

const SignUpForm = () => {
  const stepperContent = [
    {
      label: 'Personal Details',
      content: <PersonalDetails />,
      clicked: () => {},
      // isError: personalValidate.touched,
      // isComplete: personalValidate.completed,
    },
    {
      label: 'National Documents',
      content: <NationalDocuments />,
      clicked: () => {},
      // isError: documentValidate.touched,
      // isComplete: documentValidate.completed,
    },
    {
      label: 'Education Details',
      content: <EducationDetails />,
      clicked: () => {},
      // isError: educationValidate.touched,
      // isComplete: educationValidate.completed,
    },
    {
      label: 'Employment Details',
      content: <EmploymentDetails />,
      clicked: () => {},
      // isError: employmentValidate.touched,
      // isComplete: employmentValidate.completed,
    },
    {
      label: 'Other Details',
      content: <OtherDetails />,
      clicked: () => {},
      // isError: othersValidate.touched,
      // isComplete: othersValidate.completed,
    },
  ];

  const submitStepper = () => {
    console.log('submitted');
  };

  return (
    <div className="bg-main p-8 md:px-20 md:py-14">
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
      <Stepper stepperContent={stepperContent} submitStepper={submitStepper} isVertical />
    </div>
  );
};

export default SignUpForm;
