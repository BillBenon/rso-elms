import React, { ReactNode } from 'react';

type PropType = {
  children: ReactNode;
};

export default function Radio({ children }: PropType) {
  return (
    <div>
      <span className=""></span>
      <span>{children}</span>
    </div>
  );
}
