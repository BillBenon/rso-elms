import React, { useState } from 'react';

import { Link, ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Cacumber from '../../Molecules/Cacumber';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ChooseLevelProgram from '../forms/level/ChooseLevelProgram';
import NewLevel from '../forms/level/NewLevel';

function Levels() {
  const [levelOpen, setLevelOpen] = useState(false);
  const [progrOpen, setProgrOpen] = useState(false);

  const submitted = () => {
    setLevelOpen(!levelOpen);
    setProgrOpen(!progrOpen);
    console.log('from submit');
  };

  const list: Link[] = [
    { to: '', title: 'Academy Admin' },
    { to: 'users', title: 'Users' },
    { to: 'faculties', title: 'Faculty' },
    { to: 'levels', title: 'Programs' },
    { to: 'levels', title: 'Level' },
  ];

  const data = [
    {
      program: 'Cadette Program',
      'level name': ['year 1', 'year 2', 'year 3', 'year 4'],
      'level code': ['yr1', 'yr2', 'yr3', 'yr4'],
    },
    {
      program: 'Masters',
      'level name': ['year 1', 'year 2', 'year 3', 'year 4'],
      'level code': ['yr1', 'yr2', 'yr3', 'yr4'],
    },
  ];

  const levelActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  const handleSearch = (e: ValueType) => {
    console.log(e);
  };
  return (
    <main className="px-4">
      <section>
        <Cacumber list={list}></Cacumber>
      </section>
      <section className="">
        <TableHeader title="Levels" totalItems={3} handleSearch={handleSearch}>
          <Button onClick={() => setLevelOpen(!levelOpen)}>Add Level</Button>
        </TableHeader>
      </section>

      <Table statusColumn="status" data={data} actions={levelActions} />

      {/* add new level popup */}
      <PopupMolecule
        title="New Level"
        open={levelOpen}
        onClose={() => setLevelOpen(false)}>
        <NewLevel onSubmit={submitted} />
      </PopupMolecule>

      {/* choose level programs popup */}
      <PopupMolecule
        title="Would you like to add a program
          to this level?"
        open={progrOpen}
        onClose={() => setProgrOpen(false)}>
        <ChooseLevelProgram />
      </PopupMolecule>
    </main>
  );
}

export default Levels;
