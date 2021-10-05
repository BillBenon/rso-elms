// import { Label } from "@headlessui/react/dist/components/label/label";

import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import ILabel from '../../components/Atoms/Text/ILabel';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewAcademy from '../../components/Organisms/forms/academy/NewAcademy';
import academyStore from '../../store/academy.store';
import { GenericStatus, ValueType } from '../../types';
import UpdateAcademy from './UpdateAcademy';

type AcademyTypes = {
  id: number | string | undefined;
  'academy name': string;
  'academy Admin': string;
  'phone number': string;
  status: GenericStatus;
};

export default function Academy() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const { data } = academyStore.fetchAcademies();
  const academyInfo = data?.data.data;
  let academies: AcademyTypes[] = [];
  academyInfo?.map((obj) => {
    let { id, name, created_by_username, phone_number, generic_status } = obj;

    let academy: AcademyTypes = {
      id: id,
      'academy Admin': created_by_username,
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
                <TableHeader title="Academy" totalItems={300} handleSearch={handleSearch}>
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
                    uniqueCol="id"
                  />
                )}
              </div>
            </>
          )}
        />
        {/* create academy */}
        <Route exact path={`${path}/add`} render={() => <NewAcademy />} />

        {/* modify academy */}
        <Route exact path={`${path}/:id/edit`} render={() => <UpdateAcademy />} />
      </Switch>
    </>
  );
}
