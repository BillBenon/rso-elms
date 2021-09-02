import React, { ReactNode } from 'react';

import { Color, width } from '../../../types';

type StepProps = {
  color: Color;
  bgColor: Color;
  width: width;
  children: ReactNode;
};

const Step = ({ color, bgColor, width, children }: StepProps) => {
  const goToStep = () => {
    console.log('go to ', children);
  };

  return (
    <button
      className={`bg-${bgColor} text-${color} rounded-${width} px-4 py-2 mx-2`}
      onClick={goToStep}>
      {children}
    </button>
  );
};

export default Step;
