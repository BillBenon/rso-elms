import React from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { Link } from '../../types';
import ProfileOverview from './profile/ProfileOverview';

const list: Link[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'users', title: 'Users' },
];

export default function UserDetails() {
  return (
    <div>
      <BreadCrumb list={list} />
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
