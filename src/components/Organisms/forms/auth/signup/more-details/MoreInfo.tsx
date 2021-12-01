import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../../../utils/getLocalStorageItem';
import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import Stepper from '../../../../../Molecules/Stepper/Stepper';
import KinAddressDetails from './KinAddressDetails';
import NextOfKinDetails from './NextOfKinDetails';

function MoreInfo(props: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const nextStep = (isComplete?: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const skip = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };
  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    history.push('/dashboard/modules');
  }

  return (
    <div className="bg-main p-8 md:px-20 md:py-14">
      <CompleteProfileHeader
        title={'Add your Next of Kin'}
        details={'Fill in the form with all your next of kin information'}
      />
      <Stepper
        isDisabled={false}
        isInline
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <NextOfKinDetails
          fetched_id={props.location.state.detail.person_id}
          display_label="Next of kin details"
          isVertical
          nextStep={nextStep}
          skip={skip}
        />
        <KinAddressDetails
          fetched_id={props.location.state.detail.person_id}
          display_label="Next of kin address details"
          isVertical
          nextStep={finishSteps}
          prevStep={prevStep}
        />
      </Stepper>
    </div>
  );
}

export default MoreInfo;
