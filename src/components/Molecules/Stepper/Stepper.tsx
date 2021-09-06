import '../../../styles/components/atoms/custom/stepper.scss';

import React from 'react';
import { Fragment, useState } from 'react';

import StepperFoot from './StepperFoot';
import StepperHead from './StepperHead';

type StepperProps = {
  stepperContent: {
    label: string;
    // eslint-disable-next-line no-undef
    content: JSX.Element;
    clicked: () => void;
    isError: boolean;
    isComplete: boolean;
  }[];
  submitStepper: () => void;
  isInline: boolean;
  isVertical: boolean;
};
const Stepper = ({
  isVertical,
  isInline,
  stepperContent,
  submitStepper,
}: StepperProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0),
    isLastStep = currentTabIndex === stepperContent.length - 1,
    isPrevBtn = currentTabIndex !== 0;

  const navigateToStepHandler = (index: number) => {
    if (index !== currentTabIndex) {
      setCurrentTabIndex(index);
    }
  };

  const nextStepHandler = () => {
    setCurrentTabIndex((prev: any) => {
      if (prev !== stepperContent.length - 1) {
        return prev + 1;
      }
    });
  };

  const previousStepHandler = () => {
    setCurrentTabIndex((prev) => prev - 1);
  };

  const submitHandler = () => {
    submitStepper();
  };

  return (
    <div className="stepper-wrapper">
      <div style={{ display: isVertical ? 'flex' : 'block' }}>
        <StepperHead
          stepperContent={stepperContent}
          navigateToStepHandler={navigateToStepHandler}
          isVertical={isVertical}
          isInline={isInline}
          currentTabIndex={currentTabIndex}
        />
        <div className="stepper-body">
          {stepperContent.map((el, i) => (
            <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
          ))}
        </div>
      </div>
      <StepperFoot
        isPrevBtn={isPrevBtn}
        previousStepHandler={previousStepHandler}
        isLastStep={isLastStep}
        nextStepHandler={nextStepHandler}
        submitHandler={submitHandler}
        stepperContent={stepperContent}
        currentTabIndex={currentTabIndex}
      />
    </div>
  );
};

export default Stepper;
