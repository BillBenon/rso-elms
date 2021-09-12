import React from 'react';

import Cacumber from '../../components/Molecules/Cacumber';
import Dashboard from '../../components/Molecules/Dashboard';

export default function Modules() {
  const list = ['home', 'modules', 'subjects'];

  return (
    <Dashboard>
      <div>
        <Cacumber list={list}></Cacumber>
      </div>
    </Dashboard>
  );
}
