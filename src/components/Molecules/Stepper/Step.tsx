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
          isComplete={isComplete}
          isActive={false}
          clicked={() => navigateToStepHandler(index)}>
          {indicator}
        </Indicator>
        {/* <button
          className={`stepper-indicator-info
		  ${isActive ? 'bg-primary-600 border-primary-600 text-main' : ''}
		  ${isError ? 'bg-error-500 border-error-500' : ''} 
		  ${isComplete ? 'bg-success-500 border-success-500' : ''}`}
          onClick={isComplete || isError ? () => navigateToStepHandler(index) : null}> */}
        {/* {isComplete ? (
            <svg
              className="stepper-tick"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 490 490">
              <path d="M452.253 28.326L197.831 394.674 29.044 256.875 0 292.469l207.253 169.205L490 54.528z" />
            </svg>
          ) : ( */}
        {/* {indicator} */}
        {/* )} */}
        {/* </button> */}
      </div>
      <button
        className={`stepper-label text-gray cursor-pointer
		    ${isActive ? 'text-primary-600' : ''} 
		    ${isError ? 'text-error-500' : ''} 
		    ${isComplete ? 'text-success-500' : ''}
        `}
        onClick={() => navigateToStepHandler(index)}>
        {label}
      </button>
    </div>
  );
};

export default Step;
