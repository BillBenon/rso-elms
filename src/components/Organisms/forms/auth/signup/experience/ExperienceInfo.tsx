import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Page, ValueType } from '../../../../../../types';
import SignupHeader from '../../../../../Molecules/SignupHeader';
import Stepper, { StepperProp } from '../../../../../Molecules/Stepper/Stepper';
import EducationDetails from './EducationDetails';
import ExperienceDetails from './ExperienceDetails';

function ExperienceInfo() {
  const [details, setDetails] = useState({
    educationDetails: {
      school: '',
      level: '',
      section: '',
      certificate: '',
      startDate: '',
      endDate: '',
    },
    appointmentHeld: {
      experienceType: {
        type: 'appointmentHeld',
        label: 'Appointment Held',
      },
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    internationalMission: {
      experienceType: {
        type: 'internationalMission',
        label: 'International mission',
      },
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    courseCarrier: {
      experienceType: {
        type: 'courseCarrier',
        label: 'Course carrier',
      },
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    decorations: {
      experienceType: {
        type: 'decorations',
        label: 'Decorations',
      },
      name: '',
      description: '',
      startDate: '',
      endDate: '',
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
        label: 'Education Background',
        content: (
          <EducationDetails
            isVertical
            details={details.educationDetails}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: details.appointmentHeld.experienceType.label,
        content: (
          <ExperienceDetails
            isVertical
            details={details.appointmentHeld}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: details.internationalMission.experienceType.label,
        content: (
          <ExperienceDetails
            isVertical
            details={details.internationalMission}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: details.courseCarrier.experienceType.label,
        content: (
          <ExperienceDetails
            isVertical
            details={details.courseCarrier}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: details.decorations.experienceType.label,
        content: (
          <ExperienceDetails
            isVertical
            details={details.decorations}
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

export default ExperienceInfo;
