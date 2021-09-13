import React, { JSXElementConstructor, ReactChild, ReactElement, useState } from 'react';

import { colorStyle, fontSizeStyle, fontWeightStyle } from '../../../global/global-vars';
interface TabProps {
  label: string;
  disabled?: boolean;
  className?: string;
  children: ReactChild;
}

export const Tab = ({ label, disabled = false, className = '', children }: TabProps) => {
  console.log(label + disabled);
  return <div className={`tab ${className}`}>{children}</div>;
};

type TabChildrenType = ReactElement<JSXElementConstructor<typeof Tab>>[];
// | ReactElement<JSXElementConstructor<typeof Tab>>;

interface TabsProps {
  activeIndex?: number;
  className?: string;
  children: TabChildrenType;
  onTabChange?: (event: object) => any;
}

export function Tabs({
  activeIndex = 0,
  className = '',
  children,
  onTabChange,
}: TabsProps) {
  const [activeTabIndex, setActivetabIndex] = useState(activeIndex);

  const slideTo = (index: number) => {
    if (onTabChange)
      onTabChange({
        activeTabIndex: index,
        activeTabLabel: children[index].props.label,
        previousTabIndex: activeTabIndex,
      });
    setActivetabIndex(index);
  };

  const TabHeadings = () => {
    return (
      <div className="flex flex-wrap justify-start">
        {children.map((tab, i) => (
          <button
            key={i}
            className={`pr-5 pl-3 py-4 ${
              activeTabIndex === i ? 'border-b-3' : 'border-b-2'
            } m-0 rounded-none
            ${fontSizeStyle['sm']} ${fontWeightStyle['bold']} text-${
              colorStyle[activeTabIndex == i ? 'primary' : 'gray']
            } border-${colorStyle[activeTabIndex == i ? 'primary' : 'lightgray']}`}
            onClick={() => slideTo(i)}
            disabled={activeTabIndex === i || tab.props.disabled}>
            {tab.props.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`tabs ${className}`}>
      <div className="pb-3">
        <TabHeadings />
      </div>
      {children[activeTabIndex]}
    </div>
  );
}
