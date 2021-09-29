import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import ILabel from '../../components/Atoms/Text/ILabel';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewFaculty from '../../components/Organisms/faculty/NewFaculty';
import { ValueType } from '../../types';

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

  const handleSearch = (e: ValueType) => {
    console.log(e);
  };
  return (
    <>
      <div className="flex flex-wrap justify-start items-center pt-2">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academy
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Faculty
        </ILabel>
      </div>

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
