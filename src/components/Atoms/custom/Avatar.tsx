import React from 'react';

type IAvatar = {
  src: string;
  alt: string;
  size?: string;
};

export default function Avatar({ src, alt, size = '56' }: IAvatar) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="rounded-full object-cover"
        style={{ height: size + 'px', width: size + 'px' }}
      />
    </div>
  );
}
