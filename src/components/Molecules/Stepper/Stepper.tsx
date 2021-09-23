import React from 'react';
import { Fragment } from 'react';

import StepperHead from './StepperHead';

export type StepperContentProp = {
  label: string;
  // eslint-disable-next-line no-undef
  content: JSX.Element;
};

type StepperProps = {
  stepperContent: StepperContentProp[];
  isInline?: boolean;
  isVertical?: boolean;
  activeStep: number;
  navigateToStepHandler: (_index: number) => void;
};

const Stepper = ({
  isVertical,
  isInline,
  navigateToStepHandler,
  activeStep,
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
          currentStepIndex={activeStep}
        />
        <div className="pl-0 md:pl-11 w-full">
          {stepperContent.map((el, i) => (
            <Fragment key={el.label}>{i === activeStep && el.content}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
