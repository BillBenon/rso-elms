import React from 'react';

import { colorStyle, fontSizeStyle } from '../../../global/global-vars';
import { Link } from '../../../types';
import Icon from './Icon';

interface SideBarLink extends Omit<Link, 'icon'> {
  icon: string;
}

export const SidebarLink = ({ title, to, icon, active }: SideBarLink) => {
  return (
    <div
      className={`px-8 cursor-pointer py-0 border-l-4 ${
        active ? 'border-primary-500' : 'border-transparent'
      }`}>
      <a href={to} className="flex items-center">
        <Icon name={icon} size={21} />
        <span
          className={`text-${colorStyle[active ? 'primary' : 'gray']} ${
            fontSizeStyle['sm']
<<<<<<< HEAD
          } px-1 font-bold`}>
          {title}
=======
          } px-1 font-medium`}>
          {label}
>>>>>>> 789205f4b23e896871244f08ff55a0c9c1bfbdb0
        </span>
      </a>
    </div>
  );
};

type linksArray = SideBarLink[];
export type sidebarLinksProps = {
  links: linksArray;
  activeIndex?: number;
};

export default function SidebarLinks({ links, activeIndex = 0 }: sidebarLinksProps) {
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
