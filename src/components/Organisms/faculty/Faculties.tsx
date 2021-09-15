import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../Atoms/Text/ILabel';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewFaculty from './NewFaculty';

export default function FacutiesOrg() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNewUserClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const data = [
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
    {
      no: 1,
      'Faculty Name': 'Faculty Name',
      'phone number': 7869046715,
      Description: 'A short desctiption of an institution',
      Programs: 3,
    },
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

      <Table statusColumn="status" data={data} hasAction={true} />
      <PopupMolecule
        title="New Faculty"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <NewFaculty />
      </PopupMolecule>
    </>
  );
}
