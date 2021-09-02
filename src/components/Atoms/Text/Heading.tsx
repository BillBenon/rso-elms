import React, { ReactNode } from 'react';

import { fontSize, fontWeight } from '../../../types';

type HeadingProps = {
  fontSize: fontSize;
  fontWeight: fontWeight;
  children: ReactNode;
};

const Heading = ({ fontSize, fontWeight, children }: HeadingProps) => {
  return <p className={`mt-5 text-${fontSize} font-${fontWeight}`}>{children}</p>;
};

export default Heading;
