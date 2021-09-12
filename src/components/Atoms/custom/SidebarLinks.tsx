import React from 'react';

import { colorStyle, fontSizeStyle } from '../../../global/global-vars';
import { Link } from '../../../types';
import Icon from './Icon';

interface SideBarLink extends Omit<Link, 'icon'> {
  icon: string;
}

export const SidebarLink = ({ title, to, icon, active }: SideBarLink) => {
  return (
    <p
      className={`px-8 cursor-pointer py-0 border-l-4 ${
        active ? 'border-primary-500' : 'border-transparent'
      }`}>
      <a href={to} className="flex items-center">
        <Icon name={icon} size={21} fill={active ? 'primary' : 'txt-secondary'} />
        <span
          className={`text-${colorStyle[active ? 'primary' : 'gray']} ${
            fontSizeStyle['sm']
          } px-1 font-bold`}>
          {title}
        </span>
      </a>
    </p>
  );
};

type linksArray = SideBarLink[];
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
          title={link.title}
          to={link.to}
          icon={link.icon}
          active={activeIndex === i}
        />
      ))}
    </div>
  );
}
