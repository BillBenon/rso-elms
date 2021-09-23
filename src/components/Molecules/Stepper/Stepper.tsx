import React from 'react';

import StepperHead from './StepperHead';

export type StepperContentProp = {
  label: string;
  // eslint-disable-next-line no-undef
  content: JSX.Element;
};

export type StepperProp = {
  currentStep: number;
  completeStep: number;
  content: StepperContentProp[];
};

type StepperProps = {
  stepperContent: StepperProp;
  isInline?: boolean;
  isVertical?: boolean;
  navigateToStepHandler: (_index: number) => void;
};

const Stepper = ({
  isVertical,
  isInline,
  navigateToStepHandler,
  stepperContent,
}: StepperProps) => {
  return (
    <div className="stepper-wrapper">
      <div className={`${isVertical ? 'flex' : 'block'}`}>
        <StepperHead
          stepperContent={stepperContent}
          navigateToStepHandler={navigateToStepHandler}
          isVertical={isVertical}
          isInline={isInline}
        />
        <div className="pl-0 md:pl-11 w-full">
          {stepperContent.content[stepperContent.currentStep].content}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
