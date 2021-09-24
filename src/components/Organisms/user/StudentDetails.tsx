import React from 'react';

import { Link } from '../../../types';
import Heading from '../../Atoms/Text/Heading';
import Cacumber from '../../Molecules/Cacumber';
import { Tab, Tabs } from '../../Molecules/tabs/tabs';

const list: Link[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'faculty', title: 'Faculty' },
  { to: 'programs', title: 'Programs' },
  { to: 'intakes', title: 'Intakes' },
];

export default function StudentDetails() {
  return (
    <div>
      <Cacumber list={list} />
      <Heading className="py-3" fontWeight="bold" fontSize="2xl">
        Student Profile
      </Heading>
      <Tabs>
        <Tab label="Overview" className="pt-8">
          <h2>Details here </h2>
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
