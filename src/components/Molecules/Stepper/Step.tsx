/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import Indicator from '../../atoms/custom/Indicator';

type StepProps = {
  // eslint-disable-next-line no-undef
  indicator: JSX.Element | number;
  label: string;
  // eslint-disable-next-line no-unused-vars
  navigateToStepHandler: (index: number) => void;
  index: number;
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
};

const Step = ({
  indicator,
  label,
  navigateToStepHandler,
  // eslint-disable-next-line no-unused-vars
  index,
  isActive,
  isComplete,
  isError,
}: StepProps) => {
  const classes = [''];

  if (isActive) {
    classes.push('is-active');
  }
  if (isComplete) {
    classes.push('is-complete');
  }
  if (isError) {
    classes.push('is-error');
  }

  return (
    <div className={`stepper-step ${classes.join(' ')}`}>
      <div className="stepper-indicator">
        <Indicator
          isCircular={true}
          hasError={isError}
          hasBoldBg={false}
          isComplete={isComplete}
          isActive={isActive}
          clicked={() => navigateToStepHandler(index)}>
          {indicator}
        </Indicator>
      </div>
      <div
        onKeyDown={() => navigateToStepHandler(index)}
        className={`stepper-label text-txt-secondary cursor-pointer
		    ${isActive ? 'text-primary-600' : ''} 
		    ${isError ? 'text-error-500' : ''} 
		    ${isComplete ? 'text-success-500' : ''}
        `}
        onClick={() => navigateToStepHandler(index)}>
        {label}
      </div>
    </div>
  );
};

export default Step;