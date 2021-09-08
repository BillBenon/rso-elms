import React from 'react';

type StepperFootProp = {
  isPrevBtn: boolean;
  previousStepHandler: () => void;
  isLastStep: boolean;
  nextStepHandler: () => void;
  submitHandler: () => void;
  currentTabIndex: number;
  stepperContent: {
    label: string;
    // eslint-disable-next-line no-undef
    content: JSX.Element;
    isError: boolean;
    isComplete: boolean;
    clicked: () => void;
  }[];
};
const StepperFoot = ({
  isPrevBtn,
  previousStepHandler,
  isLastStep,
  nextStepHandler,
  submitHandler,
  stepperContent,
  currentTabIndex,
}: StepperFootProp) => {
  const submitCurrentStep = async () => {
    await stepperContent[currentTabIndex];
    nextStepHandler();
  };

  return (
    <div
      className="stepper-footer"
      style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}>
      {isPrevBtn && (
        <button className="stepper-footer-btn" onClick={previousStepHandler}>
          Back to {stepperContent[currentTabIndex - 1].label}
        </button>
      )}
      <button
        className={`stepper-footer-btn primary`}
        onClick={
          isLastStep
            ? submitHandler
            : stepperContent[currentTabIndex]
            ? submitCurrentStep
            : nextStepHandler
        }
        disabled={
          isLastStep
            ? stepperContent.some((el) => !el.isComplete)
            : !stepperContent[currentTabIndex].isComplete
        }>
        {isLastStep
          ? 'Submit'
          : `Continue to ${stepperContent[currentTabIndex + 1].label}`}
      </button>
    </div>
  );
};

export default StepperFoot;
