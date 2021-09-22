import '../../styles/components/Molecules/tooltip.scss';

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
    <div id="tooltip-card" className="tooltip-card relative">
      <Popup
        on="hover"
        className="tooltip-card"
        trigger={<div className="trigger-holder">{trigger}</div>}
        position={['right center', 'left center', 'bottom center']}
        closeOnDocumentClick>
        {children}
      </Popup>
    </div>
  );
}
