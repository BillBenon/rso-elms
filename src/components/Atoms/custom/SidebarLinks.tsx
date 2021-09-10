import React from 'react';

import { colorStyle, fontSizeStyle } from '../../../global/global-vars';
import Icon from './Icon';

let linkProps = {
  label: '',
  to: '',
  icon: '',
  active: false,
};

export const SidebarLink = ({ label, to, icon, active }: typeof linkProps) => {
  return (
    <p
      className={`px-8 cursor-pointer py-0 border-l-4 ${
        active ? 'border-primary-500' : 'border-transparent'
      }`}>
      <a href={to} className="flex items-center">
        <Icon name={icon} size={21} color={active ? 'primary' : 'txt-secondary'} />
        <span
          className={`text-${colorStyle[active ? 'primary' : 'gray']} ${
            fontSizeStyle['sm']
          } px-1 font-bold`}>
          {label}
        </span>
      </a>
    </p>
  );
};

type linksArray = typeof linkProps[];
export type sidebarLinksProps = {
  links: linksArray;
  activeIndex?: number;
};

export default function SidebarLinks({ links, activeIndex = 0 }: sidebarLinksProps) {
  console.log('sidebar links', links);
  return (
    <div className="py-16">
      {links.map((link, i) => (
        <SidebarLink
          key={i}
          label={link.label}
          to={link.to}
          icon={link.icon}
          active={activeIndex === i}
        />
      ))}
    </div>
  );
}
