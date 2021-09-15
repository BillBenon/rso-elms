import '../../../styles/components/Atoms/custom/stepper.scss';

import React from 'react';

import Step from './Step';

type StepperHeadProp = {
  stepperContent: {
    label: string;
    // eslint-disable-next-line no-undef
    content: JSX.Element;
    isError?: boolean;
    isComplete?: boolean;
    clicked: () => void;
  }[];
  navigateToStepHandler: (_index: number) => void;
  currentTabIndex: number;
  isInline?: boolean;
  isVertical?: boolean;
};

const StepperHead = ({
  stepperContent,
  navigateToStepHandler,
  isInline,
  isVertical,
  currentTabIndex,
}: StepperHeadProp) => (
  <div className={`hidden ${isVertical ? 'md:block' : 'md:flex'}`}>
    {stepperContent.map((el, i) => (
      <div key={el.label}>
        <div
          className={`separator_ ${
            isVertical ? 'h-16 border-l-2' : 'w-16 border-b-2'
          } border-silver`}></div>

        <Step
          key={el.label}
          index={i}
          navigateToStepHandler={navigateToStepHandler}
          isInline={isInline}
          isActive={i === currentTabIndex}
          isComplete={el.isComplete}
          isError={el.isError}
          indicator={i + 1}
          label={el.label}
        />
      </div>
    ))}
  </div>
);
export default StepperHead;
