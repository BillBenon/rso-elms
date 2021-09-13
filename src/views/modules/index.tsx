import React from 'react';

import Cacumber from '../../components/Molecules/Cacumber';
import Dashboard from '../../components/Molecules/Dashboard';
import { Link } from '../../types';

export default function Modules() {
  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  return (
    <Dashboard>
      <div>
        <Cacumber list={list}></Cacumber>
      </div>
    </Dashboard>
  );
}
