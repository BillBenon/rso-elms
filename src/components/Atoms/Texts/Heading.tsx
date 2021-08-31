import React from 'react';

import { fontSize, fontWeight } from '../../../types';

type HeadingProps = {
  fontSize: fontSize;
  fontWeight: fontWeight;
  title: string;
};

const Heading = ({ fontSize, fontWeight, title }: HeadingProps) => {
  return <p className={`mt-5 text-${fontSize} font-${fontWeight}`}>{title}</p>;
};

export default Heading;
