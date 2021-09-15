import React from 'react';
import { useHistory } from 'react-router-dom';

import Dashboard from '../../../layout/Dashboard';
import Badge from '../../Atoms/custom/Badge';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import SearchMolecule from '../../Molecules/input/SearchMolecule';
import Table from '../../Molecules/Table';

export default function RegistrationControl() {
  const history = useHistory();

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
            Academy
          </Heading>
        </div>
        <div className="mt-11">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-2 items-center">
              <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
                Registration Control{' '}
              </Heading>
              <Badge
                badgetxtcolor="main"
                badgecolor="primary"
                fontWeight="normal"
                className="h-6 w-9 flex justify-center items-center">
                3
              </Badge>
            </div>
            <div className="flex flex-wrap justify-start items-center">
              <SearchMolecule />
              <button className="border p-0 rounded-md mx-2">
                <Icon name="filter" />
              </button>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => history.push('/registration-control/new')}>
                Add new reg control
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Table statusColumn="status" data={data} hasAction={true} />
        </div>
      </Dashboard>
    </div>
  );
}
