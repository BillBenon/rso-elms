import React from 'react';
import { Link } from 'react-router-dom';

import { colorStyle, fontSizeStyle } from '../../../global/global-vars';
import Icon from './Icon';

interface LinkProps {
  label: string;
  to: string;
  icon: string;
  active: boolean;
}

export const SidebarLink = ({ label, to, icon, active }: LinkProps) => {
  return (
    <p className="cursor-pointer py-4">
      <Link to={to}>
        <Icon name={icon} size={21} color={active ? 'primary' : 'gray'} />
        <span
          className={`text-${colorStyle[active ? 'primary' : 'gray']} ${
            fontSizeStyle['sm']
          } px-2`}>
          {label}
        </span>
      </Link>
    </p>
  );
};

export type linksArray = LinkProps[];

export default function SidebarLinks(links: linksArray, activeIndex?: number = 0) {
  return (
    <div>
      {links.map((link, i) => {
        <SidebarLink
          label={link.label}
          to={link.to}
          icon={link.icon}
          active={activeIndex === i}
        />;
      })}
    </div>
  );
}
