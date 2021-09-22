import React, { ReactNode, useState } from 'react';

import Icon from './Icon';

type IProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function Accordion({ title, subtitle, children }: IProps) {
  const [active, setActive] = useState(false);
  // const [setHeight, setHeightState] = useState('0');

  function toggleAccordion() {
    setActive(!active);
    // setHeightState(setActive === 'active' ? '0' : 'h-full');
  }
  return (
    <div className="bg-secondary text-sm py-3 mb-4 px-4">
      <button className="block w-full mb-2" onClick={toggleAccordion}>
        <div className={`flex font-semibold justify-between items-center cursor-pointer`}>
          <p className="text-primary-500">{title}</p>
          <Icon name="chevron-right" fill="txt-secondary" />
        </div>
        {subtitle && (
          <p className="-mt-2 text-left font-semibold text-txt-primary">{subtitle}</p>
        )}
      </button>
      <div className={`${active ? 'block' : 'hidden'} font-medium`}>{children}</div>
    </div>
  );
}

export default Accordion;
