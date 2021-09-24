// import { Label } from "@headlessui/react/dist/components/label/label";
import '../../../styles/components/Organisms/academy/academy.scss';

import React from 'react';
import { useHistory } from 'react-router';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import ILabel from '../../Atoms/Text/ILabel';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Academy() {
  const history = useHistory();

  function handleSearch(_e: ValueType) {}

  const data = [
    {
      'Academy name': 'Nyakinama Senior Staff College',
      'Academy Admin': 'Nsengimana Jean',
      'phone number': 7869046715,
      status: 'ACTIVE',
    },
    {
      'Academy name': 'Gako Military Academy',
      'Academy Admin': 'Ntwari Dan',
      'phone number': 7869670015,
      status: 'ACTIVE',
    },
    {
      'Academy name': 'Nyakinama Senior Staff College',
      'Academy Admin': 'Nsengimana Jean',
      'phone number': 7869046715,
      status: 'INACTIVE',
    },
    {
      'Academy name': 'Gabiro',
      'Academy Admin': 'Munyuza John',
      'phone number': 7869046715,
      status: 'ACTIVE',
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academies
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Academy
        </ILabel>
      </div>
      <div className="py-4">
        <TableHeader title="Academy" totalItems={300} handleSearch={handleSearch}>
          <Button onClick={() => history.push('/academies/new')}>New academy</Button>
        </TableHeader>
      </div>

      <div className="mt-14">
        <Table statusColumn="status" data={data} hasAction={true} />
      </div>
    </>
  );
}
