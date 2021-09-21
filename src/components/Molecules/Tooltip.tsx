import React, { ReactNode } from 'react';
import { Popup } from 'reactjs-popup';

interface PropType {
  children: ReactNode;
  open: boolean;
  // eslint-disable-next-line no-undef
  trigger: JSX.Element;
}

export default function Tooltip({ children, trigger }: PropType) {
  return (
    <Popup on="hover" trigger={trigger} position="center center" closeOnDocumentClick>
      {children}
    </Popup>
  );
}
