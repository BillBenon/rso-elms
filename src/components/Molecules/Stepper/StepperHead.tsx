import '../../../styles/components/Atoms/custom/stepper.scss';

import React from 'react';

import Step from './Step';
import { StepperProp } from './Stepper';

type StepperHeadProp = {
  stepperContent: StepperProp;
  navigateToStepHandler: (_index: number) => void;
  isInline?: boolean;
  isVertical?: boolean;
};

const StepperHead = ({
  stepperContent,
  navigateToStepHandler,
  isInline,
  isVertical,
}: StepperHeadProp) => {
  return (
    <div className={`hidden w-max  ${isVertical ? 'md:block' : 'md:flex'}`}>
      {stepperContent.content.map((el, i) => (
        <div key={el.label}>
          <Step
            isFirstStep={i == 0}
            isVertical={isVertical}
            key={el.label}
            index={i}
            navigateToStepHandler={navigateToStepHandler}
            isInline={isInline}
            isActive={i === stepperContent.currentStep}
            isComplete={stepperContent.completeStep >= i}
            indicator={i + 1}
            label={el.label}
          />
        </div>
      ))}
    </div>
  );
};
export default StepperHead;
