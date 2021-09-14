import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { colorStyle, fontSizeStyle } from '../../../global/global-vars';
import Icon from './Icon';

let linkProps = {
  title: '',
  to: '',
  icon: '',
  active: false,
};

export const SidebarLink = ({ title, to, icon, active }: typeof linkProps) => {
  return (
    <div
      className={`px-8 cursor-pointer py-0 border-l-4 ${
        active ? 'border-primary-500' : 'border-transparent'
      }`}>
      <Link to={to} className="flex items-center">
        <Icon name={icon} size={21} stroke={active ? 'primary' : 'none'} />
        <span
          className={`text-${colorStyle[active ? 'primary' : 'gray']} ${
            fontSizeStyle['sm']
          } px-1 font-medium`}>
          {title}
        </span>
      </Link>
    </div>
  );
};

type linksArray = typeof linkProps[];
export type sidebarLinksProps = {
  links: linksArray;
};

export default function SidebarLinks({ links }: sidebarLinksProps) {
  const location = useLocation();
  let activeIndexAuto = links.findIndex((link) => location.pathname.startsWith(link.to));
  return (
    <div className="py-16">
      {links.map((link, i) => (
        <SidebarLink
          key={i}
          title={link.title}
          to={link.to}
          icon={link.icon}
          active={activeIndexAuto === i}
        />
      ))}
    </div>
  );
}
