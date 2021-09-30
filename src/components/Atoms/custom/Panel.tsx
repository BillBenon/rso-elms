import React, { ReactNode } from 'react';

import Icon from './Icon';

export type PanelProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  active?: boolean;
  index?: number;
  handleOpen?: (_index: number) => void;
};

function Panel({
  index,
  title,
  subtitle,
  children,
  active = false,
  handleOpen,
}: PanelProps) {
  function toggleAccordion() {
    if (handleOpen) handleOpen(index || 0);
  }
  return (
    <div className="bg-secondary text-sm py-3 mb-4 px-4">
      <button className="block w-full mb-2" onClick={toggleAccordion}>
        <div className={`flex font-semibold justify-between items-center cursor-pointer`}>
          <p className="text-primary-500">{title}</p>
          <Icon
            name="chevron-right"
            fill="txt-secondary"
            transform={active ? 'rotate(90deg)' : ''}
          />
        </div>
        {subtitle && (
          <p className="-mt-2 mb-2 text-left font-semibold text-txt-primary">
            {subtitle}
          </p>
        )}
      </button>
      <div
        className={`${
          active ? 'h-auto' : 'h-0 overflow-hidden'
        } font-medium transition-all `}>
        {children}
      </div>
    </div>
  );
}

export default Panel;
