import React from 'react';

import { Color } from '../../../types';

export interface IAvatar {
  src: string;
  alt: string;
  size?: string;
  bgColor?: Color;
  className?: string;
}

export default function Avatar({ src, alt, size = '56', className }: IAvatar) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`rounded-full box-content object-contain ${className}`}
        style={{ height: size + 'px', width: size + 'px' }}
      />
    </div>
  );
}
