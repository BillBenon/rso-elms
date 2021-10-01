import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewFaculty from '../../components/Organisms/faculty/NewFaculty';
import { Link, ValueType } from '../../types';

export default function FacutiesOrg() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNewUserClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const data = [
    {
      no: 1,
      'Faculty Name': 'Bussiness & Finance',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 2,
      'Faculty Name': 'Medicine',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 3,
      'Faculty Name': 'Software Engineering',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 4,
      'Faculty Name': 'Mechanical Engineering',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 5,
      'Faculty Name': 'Electronic Engineering',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 6,
      'Faculty Name': 'Aviation',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
    {
      no: 7,
      'Faculty Name': 'Computer Science',
      Description: 'A short desctiption of a faculty',
      Programs: 3,
    },
  ];

  const facultyActions = [
    { name: 'Add faculty', handleAction: () => {} },
    { name: 'Edit faculty', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  const list: Link[] = [
    { to: 'home', title: 'Institution Admin' },
    { to: 'faculty', title: 'Academy' },
    { to: 'programs', title: 'Faculty' },
  ];

  const handleSearch = (_e: ValueType) => {};
  return (
    <>
      <Cacumber list={list} />

      <TableHeader title="Faculties" totalItems={54} handleSearch={handleSearch}>
        <Button onClick={() => handleCreateNewUserClick()}>New Faculty</Button>
      </TableHeader>

      <Table statusColumn="status" data={data} actions={facultyActions} />
      <PopupMolecule
        title="New Faculty"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <NewFaculty />
      </PopupMolecule>
    </>
  );
}
