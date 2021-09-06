import React, { ReactNode } from 'react';

import { fontSize, fontWeight } from '../../../types';

type HeadingProps = {
  fontSize?: fontSize;
  fontWeight?: fontWeight;
  children: ReactNode;
};

const Heading = ({ fontSize = 'lg', fontWeight = 'medium', children }: HeadingProps) => {
  return <h2 className={`mt-5 text-${fontSize} font-${fontWeight}`}>{children}</h2>;
};

export default Heading;
