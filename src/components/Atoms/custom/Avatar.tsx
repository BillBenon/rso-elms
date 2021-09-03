import React from 'react';

type IAvatar = {
  image: string;
  alt: string;
  size: number;
};

export default function Avatar({ image, alt, size }: IAvatar) {
  return (
    <div>
      <img src={image} alt={alt} className={`h-${size} w-${size} rounded-full`} />
    </div>
  );
}
