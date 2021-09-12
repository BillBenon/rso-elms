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
    isError?: boolean;
    isComplete?: boolean;
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
      className="flex items-center pt-3"
      // style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}
    >
      {isPrevBtn && (
        <button
          className="px-4 py-1 cursor-pointer font-medium rounded-lg border-none outline-none transition-all text-txt-secondary"
          onClick={previousStepHandler}>
          Back
        </button>
        // <Button type="text">Back</Button>
      )}
      <button
        className={`px-4 py-1 cursor-pointer font-medium rounded-lg border-none outline-none transition-all bg-primary-600 text-main items-end ml-40`}
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
        {isLastStep ? 'Complete' : `Next`}
      </button>
    </div>
  );
};

export default StepperFoot;
