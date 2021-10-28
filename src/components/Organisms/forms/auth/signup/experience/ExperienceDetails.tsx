import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { ExperienceTypeStatus } from '../../../../../../types/services/experience.types';
import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import Stepper from '../../../../../Molecules/Stepper/Stepper';
import ExperienceStep from './ExperienceStep';

function ExperienceDetails() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const nextStep = (isComplete: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const skip = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const back = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    history.push('/dashboard/divisions');
  }
  return (
    <div className="bg-main p-8 md:px-20">
      <CompleteProfileHeader />
      <Stepper
        isVertical
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <ExperienceStep
          type={ExperienceTypeStatus.GENERAL_EDUCATION}
          isVertical
          display_label={'General Education'}
          nextStep={nextStep}
          skip={skip}
          fetched_id={''}
        />
        <ExperienceStep
          type={ExperienceTypeStatus.CURRIER_COURSE_EDUCATION}
          isVertical
          display_label={'Carrier Course Education'}
          nextStep={nextStep}
          prevStep={back}
          skip={skip}
          fetched_id={''}
        />
        <ExperienceStep
          type={ExperienceTypeStatus.INTERNATIONAL_CERTIFICATION}
          isVertical
          display_label={'International Certification'}
          nextStep={nextStep}
          prevStep={back}
          skip={skip}
          fetched_id={''}
        />
        <ExperienceStep
          type={ExperienceTypeStatus.INTERNATIONAL_MISSION}
          isVertical
          display_label={'International Mission'}
          nextStep={finishSteps}
          prevStep={back}
          skip={skip}
          fetched_id={''}
        />
        <ExperienceStep
          type={ExperienceTypeStatus.TRAINING}
          isVertical
          display_label={'Training'}
          nextStep={finishSteps}
          prevStep={back}
          fetched_id={''}
        />
      </Stepper>
    </div>
  );
}

export default ExperienceDetails;
