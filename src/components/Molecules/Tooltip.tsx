import React, { ReactNode } from 'react';
import { Popup } from 'reactjs-popup';

import Button from '../Atoms/custom/Button';

interface PropType {
  children: ReactNode;
  open: boolean;
  // eslint-disable-next-line no-undef
  trigger: JSX.Element;
}

export default function Tooltip({ children, trigger }: PropType) {
  return (
    <div id="tooltip-card" className="tooltip-card relative">
      {/* <Popup
        on="click"
        // keepTooltipInside=".tooltip-card"
        trigger={trigger}
        // position="center center"
        closeOnDocumentClick>
        {children}
      </Popup> */}
      <div className="tooltipBoundary">
        <Popup
          trigger={<div>{trigger}</div>}
          position={['top center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
          keepTooltipInside=".tooltip-card">
          {children}
        </Popup>
      </div>
    </div>
  );
}
