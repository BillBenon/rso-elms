import React, { useState } from 'react';

import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../Atoms/Text/ILabel';
import SearchMolecule from '../../Molecules/input/SearchMolecule';
import Table from '../../Molecules/Table';

export default function FacutiesOrg() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateNewUserClick = () => {
    setModalOpen(!modalOpen);
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
      <div className="py-6">
        <div className="flex flex-wrap justify-between items-center">
          <ILabel size="2xl" weight="bold">
            Faculties
          </ILabel>
          <div className="flex flex-wrap justify-start items-center">
            <SearchMolecule />
            <button className="border p-0 rounded-md mx-2">
              <Icon name="filter" />
            </button>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => handleCreateNewUserClick()}>New Faculty</Button>
          </div>
        </div>
      </div>
      <Table statusColumn="status" data={data} hasAction={true} />
    </>
  );
}
