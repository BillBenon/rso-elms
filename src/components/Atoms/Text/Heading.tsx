import React from 'react';

import { fontSize, fontWeight } from '../../../types';

type HeadingProps = {
  fontSize: fontSize;
  fontWeight: fontWeight;
  title: string;
};

const Heading = ({ fontSize, fontWeight, title }: HeadingProps) => {
  return <h2 className={`mt-5 text-${fontSize} font-${fontWeight}`}>{title}</h2>;
};

export default Heading;
