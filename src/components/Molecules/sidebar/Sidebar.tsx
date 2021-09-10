import React from 'react';

import SidebarLinks, { sidebarLinksProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../AcademyProfileCard';

export default function Sidebar({ links, activeIndex }: sidebarLinksProps) {
  console.log(links);
  return (
    <div>
      <AcademyProfileCard>University of Rwanda</AcademyProfileCard>
      <SidebarLinks links={links} activeIndex={activeIndex || 0} />
    </div>
  );
}
