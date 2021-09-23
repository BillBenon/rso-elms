import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Heading from '../../../../Atoms/Text/Heading';
import AcademyProfileCard from '../../../../Molecules/cards/AcademyProfileCard';
import Stepper, { StepperContentProp } from '../../../../Molecules/Stepper/Stepper';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails';
import FamilyDetails from './FamilyDetails';
import NationalDocuments from './NationalDocument';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails';

function SignUpForm() {
  const [details, setDetails] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'male',
      placeOfBirth: '',
      placeOfBirthDescription: '',
      dob: '',
      religion: '',
      bloodGroup: '',
    },
    familyDetails: {
      fatherName: '',
      motherName: '',
      maritalStatus: 'married',
      spouseName: '',
      country: '',
      location: '',
      otherLocation: '',
    },
    nationalDocuments: {
      nationality: '',
      nationalId: '',
      passport: '',
      passportExpiryDate: '',
      placeOfBirth: '',
      language: '',
    },
    educationDetails: {
      school: '',
      level: '',
      section: '',
      certificate: '',
      startDate: '',
      endDate: '',
    },
    employmentDetails: {
      currentRank: '',
      otherRank: '',
      RankDepart: 'Rwanda',
      EmpNo: '',
    },
    otherDetails: {
      hobbies: '',
      chronicDiseases: '',
      diseaseDescription: '',
    },
  });
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      personalDetails: { ...details.personalDetails, [e.name]: e.value },
      familyDetails: { ...details.familyDetails, [e.name]: e.value },
      nationalDocuments: { ...details.nationalDocuments, [e.name]: e.value },
      educationDetails: { ...details.educationDetails, [e.name]: e.value },
      employmentDetails: { ...details.employmentDetails, [e.name]: e.value },
      otherDetails: { ...details.otherDetails, [e.name]: e.value },
    }));
    console.log(details);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== activeStep) {
      setActiveStep(index);
    }
  };

  const stepperContent: StepperContentProp[] = [
    {
      label: 'Personal Details',
      content: (
        <PersonalDetails
          details={details.personalDetails}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      ),
    },
    {
      label: 'Family Details',
      content: (
        <FamilyDetails
          details={details.familyDetails}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      ),
    },
    {
      label: 'National Documents',
      content: (
        <NationalDocuments
          details={details.nationalDocuments}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      ),
    },
    {
      label: 'Employment Details',
      content: (
        <EmploymentDetails
          details={details.employmentDetails}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      ),
    },
    {
      label: 'Education Details',
      content: (
        <EducationDetails
          details={details.educationDetails}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      ),
    },

    {
      label: 'Other Details',
      content: (
        <OtherDetails
          details={details.otherDetails}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      ),
    },
  ];

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
      <Stepper
        activeStep={activeStep}
        stepperContent={stepperContent}
        isVertical
        navigateToStepHandler={navigateToStepHandler}
      />
    </div>
  );
}

export default SignUpForm;
