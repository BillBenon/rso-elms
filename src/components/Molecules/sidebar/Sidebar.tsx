import React from 'react';

import SidebarLinks, { sidebarLinksProps } from '../../Atoms/custom/SidebarLinks';
import AcademyProfileCard from '../AcademyProfileCard';

export default function Sidebar({ links }: sidebarLinksProps) {
  return (
    <div className="bg-white md:h-screen">
      <div className="px-4 py-4">
        <AcademyProfileCard
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="academy logo">
          University of Rwanda
        </AcademyProfileCard>
      </div>
      <SidebarLinks links={links} />
    </div>
  );
}
