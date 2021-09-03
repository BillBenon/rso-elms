import React from 'react';

type IAvatar = {
  image: string;
  alt: string;
  size: string;
};

export default function Avatar({ image, alt, size = '14' }: IAvatar) {
  return (
    <div>
      <img src={image} alt={alt} className={`h-${size} w-${size} rounded-full`} />
    </div>
  );
}
