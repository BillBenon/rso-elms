import React, { useState } from 'react';

type StepperProps = {
  stepperContent: {
    label: string;
    content: React.ReactNode;
    clicked: () => void;
    isError?: boolean;
    isComplete?: boolean;
  }[];
  submitStepper: () => void;
  isInline: boolean;
  isVertical: boolean;
};

// export function Step() {}
// export function StepperFooter() {}

export default function StepperImproved({
  isVertical,
  isInline,
  stepperContent,
}: StepperProps) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigateToStepHandler = (index: number) => {
    if (index !== currentTabIndex) {
      setCurrentTabIndex(index);
    }
  };

  return (
    <div className="py-2">
      <div className={`${isVertical ? 'flex flex-wrap ' : 'block'}`}>
        <Steps />
        {stepperContent[currentTabIndex]}
      </div>
    </div>
  );
}

export function Steps() {
  return <div></div>;
}
