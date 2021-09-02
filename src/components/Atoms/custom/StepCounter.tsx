import React, { ReactNode } from 'react';

import { Color, width } from '../../../types';

type StepCounterProps = {
  color: Color;
  bgColor: Color;
  width: width;
  children: ReactNode;
};

const StepCounter = ({ color, bgColor, width, children }: StepCounterProps) => {
  return (
    <>
      <span className={`bg-${bgColor} text-${color} rounded-${width} px-4 py-2`}>
        {children}
      </span>
    </>
  );
};

export default StepCounter;
