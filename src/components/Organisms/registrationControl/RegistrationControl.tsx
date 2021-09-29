import React, { useEffect, useState } from 'react';

import registrationControlStore from '../../../store/registrationControl.store';
import { GenericStatus, ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewRegistrationControl from '../forms/NewRegistrationControl';

export default function RegistrationControl() {
  const { data, isLoading, isSuccess, refetch } =
    registrationControlStore.fetchRegControl();

  // refetch();
  const [open, setOpen] = useState(false); // state to controll the popup

  function handleSearch(_e: ValueType) {}

  interface IRegistrationInfo {
    'start date': string;
    'end date': string;
    description: string;
    status: GenericStatus;
  }

  let RegistrationControls: IRegistrationInfo[] = [];
  let RegInfo = data?.data.data;

  RegInfo?.map((obj: any) => {
    let { expected_start_date, expected_end_date, description, generic_status } = obj;
    let academy: IRegistrationInfo = {
      'start date': expected_start_date,
      'end date': expected_end_date,
      description,
      status: generic_status,
    };
    RegistrationControls.push(academy);
  });

  function submited() {
    setOpen(false);
  }
  const controlActions = [
    { name: 'Add control', handleAction: () => {} },
    { name: 'Edit control', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];

  return (
    <div>
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
        {isLoading && 'Loading..'}
        {isSuccess && RegistrationControls ? (
          <Table<IRegistrationInfo>
            statusColumn="status"
            data={RegistrationControls}
            actions={controlActions}
          />
        ) : (
          ''
        )}

        {RegistrationControls.length < 1 && <span>No data found</span>}
      </div>

      {/* add module popup */}
      <PopupMolecule
        title="New Registration Control"
        open={open}
        onClose={() => setOpen(false)}>
        <NewRegistrationControl onSubmit={submited} />
      </PopupMolecule>
    </div>
  );
}
