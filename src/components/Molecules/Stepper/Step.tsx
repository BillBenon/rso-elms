/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import Indicator from '../../Atoms/custom/Indicator';

type StepProps = {
  // eslint-disable-next-line no-undef
  indicator: JSX.Element | number | boolean;
  label: string;
  navigateToStepHandler: (_index: number) => void;
  index: number;
  isInline?: boolean;
  isActive: boolean;
  isComplete?: boolean;
  isError?: boolean;
  isVertical?: boolean;
  isFirstStep: boolean;
  width?: string;
};

const Step = ({
  indicator,
  label,
  navigateToStepHandler,
  index,
  isActive,
  isComplete,
  isVertical,
  isFirstStep,
  isError,
  width = 'w-60',
}: StepProps) => {
  return (
    <div className="flex justify-between">
      {/* label */}
      {isVertical && (
        <div
          onKeyDown={() => navigateToStepHandler(index)}
          className={`cursor-pointer flex items-end w-max
        ${
          isActive
            ? 'text-primary-600'
            : isError
            ? 'text-error-500'
            : isComplete
            ? 'text-primary-400'
            : 'text-txt-secondary'
        }`}
          onClick={() => navigateToStepHandler(index)}>
          <div>{label}</div>
        </div>
      )}
      <div
        className={`${
          isVertical ? `pl-7  ${isFirstStep && 'items-end'}` : 'flex items-center'
        }`}>
        {/* step line(separator) */}
        {!isFirstStep && (
          <div
            className={`${isComplete ? 'border-primary-400' : 'border-silver'}
          ${isVertical ? 'separator_ h-16 border-l-2' : `${width} border-b-2`} 
          ${isFirstStep ? 'h-0 border-none' : ''}`}></div>
        )}
        {/* step (in numbers) indicator */}
        <Indicator
          isCircular={true}
          hasError={isError}
          isActive={isActive}
          isComplete={isComplete}
          clicked={() => navigateToStepHandler(index)}>
          {indicator}
        </Indicator>
      </div>
    </div>
  );
};

export default Step;
