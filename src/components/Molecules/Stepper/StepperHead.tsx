import React from 'react';

import Step from './Step';

type StepperHeadProp = {
  stepperContent: {
    label: string;
    // eslint-disable-next-line no-undef
    content: JSX.Element;
    isError: boolean;
    isComplete: boolean;
    clicked: () => void;
  }[];
  // eslint-disable-next-line no-unused-vars
  navigateToStepHandler: (index: number) => void;
  currentTabIndex: number;
  isInline: boolean;
  isVertical: boolean;
};

const StepperHead = ({
  stepperContent,
  navigateToStepHandler,
  isInline,
  isVertical,
  currentTabIndex,
}: StepperHeadProp) => (
  <div
    className={`stepper-head ${isVertical ? 'vertical-stepper-head' : ''} ${
      isInline ? 'inline-stepper-head' : ''
    }`}>
    {stepperContent.map((el, i) => (
      <Step
        key={i}
        index={i}
        navigateToStepHandler={navigateToStepHandler}
        isActive={i === currentTabIndex}
        isComplete={el.isComplete}
        isError={el.isError}
        indicator={i + 1}
        label={el.label}
      />
    ))}
  </div>
);
export default StepperHead;
