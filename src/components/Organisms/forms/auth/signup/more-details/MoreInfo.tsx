import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Page, ValueType } from '../../../../../../types';
import SignupHeader from '../../../../../Molecules/SignupHeader';
import Stepper, { StepperProp } from '../../../../../Molecules/Stepper/Stepper';
import AccountDetails from './AccountDetails';
import EducationDetails from './EducationDetails';
import ExperienceDetails from './ExperienceDetails';
import NextOfKinDetails from './NextOfKinDetails';

function MoreInfo() {
  const [details, setDetails] = useState({
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
    history.push('/login');
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
        label: 'Education details',
        content: (
          <EducationDetails
            details={details.educationDetails}
            handleChange={handleChange}
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

export default MoreInfo;
