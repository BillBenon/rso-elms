import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Page, ValueType } from '../../../../../../types';
import SignupHeader from '../../../../../Molecules/SignupHeader';
import Stepper, { StepperProp } from '../../../../../Molecules/Stepper/Stepper';
import EmploymentDetails from './EmploymentDetails';
import FamilyDetails from './FamilyDetails';
import NationalDocuments from './NationalDocument';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails';

function PersonalInfo() {
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  useEffect(() => {
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
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const saveInfo = (isComplete?: boolean) => {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    // save contact info
    history.push('/register/more');
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };
  const handleChange = (e: ValueType, page: Page) => {
    setDetails((details: any) => ({
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
            nextStep={saveInfo}
          />
        ),
      },
    ],
  };
  const [stepperContent, setStepperContent] = useState<StepperProp>(initialData);

  return (
    <div className="bg-main p-8 md:px-20 md:py-14">
      <SignupHeader />
      <Stepper
        stepperContent={stepperContent}
        isVertical
        navigateToStepHandler={navigateToStepHandler}
      />
    </div>
  );
}

export default PersonalInfo;
