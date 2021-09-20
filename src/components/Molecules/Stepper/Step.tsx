/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import Indicator from '../../Atoms/custom/Indicator';

type StepProps = {
  // eslint-disable-next-line no-undef
  indicator: JSX.Element | number;
  label: string;
  navigateToStepHandler: (_index: number) => void;
  index: number;
  isInline?: boolean;
  isActive: boolean;
  isComplete?: boolean;
  isError?: boolean;
  isVertical?: boolean;
};

const Step = ({
  indicator,
  label,
  navigateToStepHandler,
  index,
  isActive,
  isComplete,
  isError,
}: StepProps) => {
  return (
    <div className="flex gap-14">
      <Indicator
        isCircular={true}
        hasError={isError}
        isComplete={isComplete}
        isActive={isActive}
        clicked={() => navigateToStepHandler(index)}>
        {indicator}
      </Indicator>
      <div
        onKeyDown={() => navigateToStepHandler(index)}
        className={`cursor-pointer
        ${
          isActive
            ? 'text-primary-600'
            : isError
            ? 'text-error-500'
            : isComplete
            ? 'text-success-500'
            : 'text-txt-secondary'
        }`}
        onClick={() => navigateToStepHandler(index)}>
        {label}
      </div>
    </div>
  );
};

export default Step;
