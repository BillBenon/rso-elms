import React, { ReactNode } from 'react';

type IndicatorProps = {
  isCircular: boolean;
  isActive: boolean;
  hasError: boolean;
  isComplete: boolean;
  clicked: () => void;
  children: ReactNode;
};

const Indicator = ({
  isCircular,
  isActive,
  hasError,
  isComplete,
  clicked,
  children,
}: IndicatorProps) => {
  return (
    <>
      <button
        className={`relative inline-flex justify-center items-center w-8 h-8 
        border text-sm text-center z-2
         ${
           isActive || isComplete
             ? 'text-main bg-primary-600 border-primary-600'
             : 'text-gray bg-txt-secondary border-txt-secondary'
         }
         ${hasError ? 'bg-error-500 border-error-500' : ''}
         ${isCircular ? 'rounded-full' : 'rounded-lg'}`}
        onClick={() => clicked()}>
        {children}
      </button>
    </>
  );
};

export default Indicator;
