// import { Label } from "@headlessui/react/dist/components/label/label";
import '../../styles/components/Organisms/academy/academy.scss';

import React from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import ILabel from '../../components/Atoms/Text/ILabel';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import academyStore from '../../store/academy.store';
import { GenericStatus, ValueType } from '../../types';

type AcademyTypes = {
  'academy name': string;
  'academy Admin': string;
  'phone number': string;
  status: GenericStatus;
};

export default function Academy() {
  const history = useHistory();

  const { data } = academyStore.fetchAcademies();
  const academyInfo = data?.data.data;
  let academies: AcademyTypes[] = [];
  academyInfo?.map((obj) => {
    let { name, created_by_username, phone_number, generic_status } = obj;

    let academy: AcademyTypes = {
      'academy Admin': created_by_username,
      'academy name': name,
      'phone number': phone_number,
      status: generic_status,
    };

    academies.push(academy);
  });

  function handleSearch(_e: ValueType) {}

  const academyActions = [
    { name: 'Add academy', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
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
          <Button onClick={() => history.push('/dashboard/academies/new')}>
            New academy
          </Button>
        </TableHeader>
      </div>

      <div className="mt-14">
        {academyInfo && (
          <Table<AcademyTypes>
            statusColumn="status"
            data={academies}
            actions={academyActions}
          />
        )}
      </div>
    </>
  );
}
