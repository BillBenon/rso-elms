import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ExperienceType } from '../../../../../../types/services/experience.types';
import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import Stepper from '../../../../../Molecules/Stepper/Stepper';
import OtherDetails from '../personal/OtherDetails';
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
    history.goBack();
    // history.push('/complete-more');
  }
  return (
    <div className="bg-main">
      <CompleteProfileHeader
        title={'Add your experiences'}
        details={'Fill in the form with all your experiences'}
      />
      <div className="p-10 md:px-24 md:py-3">
        <Stepper
          isVertical
          currentStep={currentStep}
          completeStep={completeStep}
          navigateToStepHandler={navigateToStepHandler}>
          <ExperienceStep
            type={ExperienceType.GENERAL_EDUCATION}
            isVertical
            display_label={'Formal Education (School and Certificate)'}
            nextStep={nextStep}
            skip={skip}
            fetched_id={''}
          />
          <ExperienceStep
            type={ExperienceType.CURRIER_COURSE_EDUCATION}
            isVertical
            display_label={'Carrier Course Attended'}
            nextStep={nextStep}
            prevStep={back}
            skip={skip}
            fetched_id={''}
          />
          <ExperienceStep
            type={ExperienceType.INTERNATIONAL_CERTIFICATION}
            isVertical
            display_label={'Appointments Held (achievements)'}
            nextStep={nextStep}
            prevStep={back}
            skip={skip}
            fetched_id={''}
          />
          <ExperienceStep
            type={ExperienceType.INTERNATIONAL_MISSION}
            isVertical
            display_label={'International Missions'}
            nextStep={nextStep}
            prevStep={back}
            skip={skip}
            fetched_id={''}
          />
          <ExperienceStep
            type={ExperienceType.TRAINING}
            isVertical
            display_label={'Decorations'}
            nextStep={nextStep}
            prevStep={back}
            skip={skip}
            fetched_id={''}
          />
          <OtherDetails
            fetched_id={''}
            display_label="Other details"
            isVertical
            nextStep={finishSteps}
            prevStep={back}
          />
        </Stepper>
      </div>
    </div>
  );
}

export default ExperienceDetails;
