import React from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import ProfileOverview from './profile/ProfileOverview';

export default function UserDetails() {
  return (
    <div>
      <Heading className="py-3" fontWeight="bold" fontSize="2xl">
        User Profile
      </Heading>
      <Tabs>
        <Tab label="Overview" className="pt-8">
          <ProfileOverview />
        </Tab>
        <Tab label="Performance" className="pt-8">
          <h2>Performance</h2>
        </Tab>
        <Tab label="Log" className="pt-8">
          <h2>Log</h2>
        </Tab>
      </Tabs>
    </div>
  );
}
