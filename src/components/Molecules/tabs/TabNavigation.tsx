import React from 'react';
import { useHistory } from 'react-router';
import { ReactNode } from 'react-router/node_modules/@types/react';

import { colorStyle, fontSizeStyle, fontWeightStyle } from '../../../global/global-vars';

export interface TabType {
  label: string;
  href: string;
  active?: boolean;
}

type tabEventTypes = {
  activeTabIndex: number;
  activeTabLabel: string;
};

interface TabsImportantProps {
  onTabChange?: (_event: tabEventTypes) => any;
  tabs: TabType[];
}

interface Iprops extends TabsImportantProps {
  className?: string;
  children: ReactNode;
}

export default function TabNavigation({
  className = '',
  tabs,
  children,
  onTabChange,
}: Iprops) {
  return (
    <div className={`tabs ${className}`}>
      <div className="pb-3">
        <TabHeadings onTabChange={onTabChange} tabs={tabs} />
      </div>
      {children}
    </div>
  );
}

function TabHeadings({ tabs, onTabChange }: TabsImportantProps) {
  let activeTabIndex = tabs.findIndex((tab) => tab.active);
  const history = useHistory();

  const slideTo = (index: number, href: string, label: string) => {
    if (onTabChange)
      onTabChange({
        activeTabIndex: index,
        activeTabLabel: label,
      });
    history.push(href);
  };

  return (
    <div className="flex flex-wrap justify-start">
      {tabs.map((tab, i) => {
        return (
          <button
            key={i}
            className={`pr-5 pl-3 py-4 ${
              activeTabIndex === i ? 'border-b-3' : 'border-b-2'
            } m-0 rounded-none
                ${fontSizeStyle['sm']} ${fontWeightStyle['bold']} text-${
              colorStyle[activeTabIndex == i ? 'primary' : 'gray']
            } border-${colorStyle[activeTabIndex == i ? 'primary' : 'lightgray']}`}
            onClick={() => slideTo(i, tab.href, tab.label)}
            disabled={activeTabIndex === i}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
