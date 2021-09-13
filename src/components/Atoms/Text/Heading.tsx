import React, { ReactNode } from 'react';

import { Color, fontSize, fontWeight } from '../../../types';

type HeadingProps = {
  fontSize?: fontSize;
  fontWeight?: fontWeight;
  color?: Color;
  children: ReactNode;
};

const Heading = ({
  fontSize = 'lg',
  fontWeight = 'medium',
  color = 'txt-primary',
  children,
}: HeadingProps) => {
  return (
    <h2 className={`mt-5 text-${fontSize} font-${fontWeight} text-${color}`}>
      {children}
    </h2>
  );
};

export default Heading;
