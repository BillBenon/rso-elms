import React, { useEffect, useState } from 'react';

import { Page, ValueType } from '../../../../../types';
import Heading from '../../../../Atoms/Text/Heading';
import AcademyProfileCard from '../../../../Molecules/cards/AcademyProfileCard';
import Stepper, { StepperProp } from '../../../../Molecules/Stepper/Stepper';
import AccountDetails from './AccountDetails';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails';
import ExperienceDetails from './ExperienceDetails';
import FamilyDetails from './FamilyDetails';
import NationalDocuments from './NationalDocument';
import NextOfKinDetails from './NextOfKinDetails';
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
      nationality: 'rw',
      nationalId: '',
      nidPlaceOfIssue: '',
      dateOfIssue: '',
      passPlaceOfIssue: '',
      passport: '',
      passportExpiryDate: '',
      language: '',
    },
    employmentDetails: {
      currentRank: '',
      otherRank: '',
      RankDepart: 'Rwanda',
      EmpNo: '',
      dateOfCommission: '',
      dateOfLastPromotion: '',
    },
    otherDetails: {
      hobbies: '',
      chronicDiseases: '',
      diseaseDescription: '',
    },
    educationDetails: {
      school: '',
      level: '',
      section: '',
      certificate: '',
      startDate: '',
      endDate: '',
    },
    experienceDetails: {
      type: 'Appointment',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    nextOfKinDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'male',
      relationShip: '',
      country: '',
      location: '',
      otherLocation: '',
    },
    accountDetails: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  // const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    // let newSteps = [...stepperContent];
    // let completedStep: StepperContentProp = newSteps[currentStep];
    // completedStep.isComplete = true;
    // newSteps[currentStep] = completedStep;
    let newStepper = {
      ...stepperContent,
      currentStep: currentStep,
    };

    setStepperContent(newStepper);
  }, [currentStep]);

  useEffect(() => {
    let newStepper = {
      ...stepperContent,
      currentStep: completeStep,
      completeStep: completeStep,
    };

    setStepperContent(newStepper);
  }, [completeStep]);

  const nextStep = (isComplete?: boolean) => {
    console.log('nexting', isComplete);
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };
  const handleChange = (e: ValueType, page: Page) => {
    setDetails((details) => ({
      ...details,
      [page]: { ...details[page], [e.name]: e.value },
    }));
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  const initialData: StepperProp = {
    currentStep: 0,
    completeStep: 0,
    content: [
      {
        label: 'Personal details',
        content: (
          <PersonalDetails
            details={details.personalDetails}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Family details',
        content: (
          <FamilyDetails
            details={details.familyDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'National documents',
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
        label: 'Employment details',
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
        label: 'Other details',
        content: (
          <OtherDetails
            details={details.otherDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Education details',
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
        label: 'Experience details',
        content: (
          <ExperienceDetails
            details={details.experienceDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Next of kin details',
        content: (
          <NextOfKinDetails
            details={details.nextOfKinDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Account details',
        content: (
          <AccountDetails
            details={details.experienceDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
    ],
  };
  const [stepperContent, setStepperContent] = useState<StepperProp>(initialData);

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
        stepperContent={stepperContent}
        isVertical
        navigateToStepHandler={navigateToStepHandler}
      />
    </div>
  );
}

export default SignUpForm;
