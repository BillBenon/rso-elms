import React, { useState } from 'react';

import Dashboard from '../../../layout/Dashboard';
import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewRegistrationControl from '../forms/NewRegistrationControl';

export default function RegistrationControl() {
  const [open, setOpen] = useState(false); // state to controll the popup

  function handleSearch(_e: ValueType) {}

  function submited() {
    setOpen(false);
    console.log('from submit');
  }

  const data = [
    {
      'start date': '02 Sep 2021',
      'end date': '02 Nov 2021',
      description: 'A short desctiption of an institution',
      status: 'active',
    },
    {
      'start date': '02 Sep 2021',
      'end date': '02 Nov 2021',
      description: 'A short desctiption of an institution',
      status: 'inactive',
    },
    {
      'start date': '02 Sep 2021',
      'end date': '02 Nov 2021',
      description: 'A short desctiption of an institution',
      status: 'pending',
    },
  ];

  return (
    <div>
      <Dashboard>
        <div className="flex flex-wrap justify-start items-center">
          <ILabel size="sm" color="gray" weight="medium">
            Institution Admin
          </ILabel>
          <Icon name="chevron-right" />

          <ILabel size="sm" color="gray" weight="medium">
            Academies
          </ILabel>
          <Icon name="chevron-right" fill="gray" />
          <Heading fontSize="sm" color="primary" fontWeight="medium">
            Registration control
          </Heading>
        </div>
        <TableHeader
          title="registration control"
          totalItems={3}
          handleSearch={handleSearch}>
          <Button onClick={() => setOpen(true)}>Add new reg control</Button>
        </TableHeader>

        <div className="mt-14">
          <Table statusColumn="status" data={data} hasAction={true} />
        </div>

        {/* add module popup */}
        <PopupMolecule
          title="New Registration Control"
          open={open}
          onClose={() => setOpen(false)}>
          <NewRegistrationControl onSubmit={submited} />
        </PopupMolecule>
      </Dashboard>
    </div>
  );
}
