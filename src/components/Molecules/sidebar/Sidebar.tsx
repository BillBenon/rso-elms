import React from 'react';

import SidebarLinks, { linksArray } from '../../Atoms/custom/SidebarLinks';

export default function Sidebar(links: linksArray) {
  return (
    <div>
      <SidebarLinks links={links} />
    </div>
  );
}
