import React from 'react';

type IAvatar = {
  src: string;
  alt: string;
  size?: string;
};

export default function Avatar({ src, alt, size = '14' }: IAvatar) {
  return (
    <div>
      <img src={src} alt={alt} className={`h-${size} w-${size} rounded-full`} />
    </div>
  );
}
