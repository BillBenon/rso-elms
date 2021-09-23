import '../../../styles/components/Atoms/custom/stepper.scss';

import React from 'react';

import Step from './Step';
import { StepperContentProp } from './Stepper';

type StepperHeadProp = {
  stepperContent: StepperContentProp[];
  navigateToStepHandler: (_index: number) => void;
  currentStepIndex: number;
  isInline?: boolean;
  isVertical?: boolean;
};

const StepperHead = ({
  stepperContent,
  navigateToStepHandler,
  isInline,
  isVertical,
  currentStepIndex: currentTabIndex,
}: StepperHeadProp) => (
  <div className={`hidden w-52 ${isVertical ? 'md:block' : 'md:flex'}`}>
    {stepperContent.map((el, i) => (
      <div key={el.label}>
        <Step
          isLastStep={i == stepperContent.length - 1}
          isVertical={isVertical}
          key={el.label}
          index={i}
          navigateToStepHandler={navigateToStepHandler}
          isInline={isInline}
          isActive={i === currentTabIndex}
          indicator={i + 1}
          label={el.label}
        />
      </div>
    ))}
  </div>
);
export default StepperHead;
