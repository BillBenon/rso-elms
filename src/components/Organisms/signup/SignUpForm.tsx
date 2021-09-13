import React from 'react';

import Stepper from '../../Molecules/Stepper/Stepper';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails';
import NationalDocuments from './NationalDocument';
import NavSign from './NavSign';
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
    <>
      <NavSign />
      <Stepper
        stepperContent={stepperContent}
        submitStepper={submitStepper}
        isVertical
        isInline={false}
      />
    </>
  );
};

export default SignUpForm;
