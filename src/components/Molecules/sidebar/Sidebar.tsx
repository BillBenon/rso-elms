import React from 'react';

import SidebarLinks, { sidebarLinksProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../AcademyProfileCard';

export default function Sidebar({ links }: sidebarLinksProps) {
  return (
    <div className="bg-white md:h-screen">
      <div className="px-8 py-4">
        <AcademyProfileCard>University of Rwanda</AcademyProfileCard>
      </div>
      <SidebarLinks links={links} />
    </div>
  );
}
