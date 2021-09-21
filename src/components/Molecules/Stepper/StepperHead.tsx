import '../../../styles/components/Atoms/custom/stepper.scss';

import React from 'react';

import Step from './Step';

type StepperContent = {
  label: string;
  // eslint-disable-next-line no-undef
  content: JSX.Element;
  isError?: boolean;
  isComplete?: boolean;
  clicked: () => void;
};

type StepperHeadProp = {
  stepperContent: StepperContent[];
  navigateToStepHandler: (_index: number) => void;
  currentTabIndex: number;
  isInline?: boolean;
  isVertical?: boolean;
  isFirstStep: StepperContent;
};

const StepperHead = ({
  stepperContent,
  navigateToStepHandler,
  isInline,
  isVertical,
  currentTabIndex,
  isFirstStep,
}: StepperHeadProp) => (
  <div className={`hidden ${isVertical ? 'md:block' : 'md:flex'}`}>
    {stepperContent.map((el, i) => (
      <div key={el.label}>
        {i !== 0 && (
          <div
            className={`separator_ ${
              isVertical ? 'h-16 border-l-2' : 'w-16 border-b-2'
            } ${el == isFirstStep ? 'h-0 border-none' : ''} border-silver`}></div>
        )}

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
