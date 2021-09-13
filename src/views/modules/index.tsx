import React from 'react';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import Dashboard from '../../components/Molecules/Dashboard';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import { Link } from '../../types';

export default function Modules() {
  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  return (
    <Dashboard>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section className="flex justify-between items-center">
          <Heading fontSize="2xl" fontWeight="bold">
            Modules
          </Heading>
          <SearchMolecule></SearchMolecule>
          <Button>Add Module</Button>
        </section>
        <section></section>
      </main>
    </Dashboard>
  );
}
