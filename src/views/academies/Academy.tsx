// import { Label } from "@headlessui/react/dist/components/label/label";

import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import ILabel from '../../components/Atoms/Text/ILabel';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import academyStore from '../../store/academy.store';
import usersStore from '../../store/users.store';
import { GenericStatus, ValueType } from '../../types';
import AddAcademy from './Addcademy';
import UpdateAcademy from './UpdateAcademy';

type AcademyTypes = {
  id: number | string | undefined;
  'academy name': string;
  'academy admin': string;
  'phone number': string;
  status: GenericStatus;
};

export default function Academy() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const { data } = academyStore.fetchAcademies();
  const academyInfo = data?.data.data;
  let academies: AcademyTypes[] = [];
  const users = usersStore.fetchUsers();
  academyInfo?.map((obj) => {
    let { id, name, current_admin_id, phone_number, generic_status } = obj;

    let academy: AcademyTypes = {
      id: id,
      'academy admin':
        users.data?.data.data.find((admin) => admin.id === current_admin_id)?.first_name +
          ' ' +
          users.data?.data.data.find((admin) => admin.id === current_admin_id)
            ?.last_name || '',
      'academy name': name,
      'phone number': phone_number,
      status: generic_status,
    };

    academies.push(academy);
  });

  function handleSearch(_e: ValueType) {}

  const academyActions = [
    {
      name: 'Edit academy',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit academy
      },
    },
    { name: 'View', handleAction: () => {} },
  ];

  return (
    <>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
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
                <TableHeader
                  title="Academy"
                  totalItems={academies.length}
                  handleSearch={handleSearch}>
                  <Link to={`${url}/add`}>
                    <Button>New academy</Button>
                  </Link>
                </TableHeader>
              </div>

              <div className="mt-14">
                {academyInfo && (
                  <Table<AcademyTypes>
                    statusColumn="status"
                    data={academies}
                    actions={academyActions}
                    hide={['id']}
                    uniqueCol="id"
                  />
                )}
              </div>
            </>
          )}
        />
        {/* create academy */}
        <Route exact path={`${path}/add`} render={() => <AddAcademy />} />

        {/* modify academy */}
        <Route exact path={`${path}/:id/edit`} render={() => <UpdateAcademy />} />
      </Switch>
    </>
  );
}
