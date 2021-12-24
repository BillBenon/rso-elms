// import { Label } from "@headlessui/react/dist/components/label/label";

import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewAcademy from '../../components/Organisms/forms/academy/NewAcademy';
import UpdateAcademy from '../../components/Organisms/forms/academy/UpdateAcademy';
import { authenticatorStore } from '../../store/administration';
import academyStore from '../../store/administration/academy.store';
import usersStore from '../../store/administration/users.store';
import { Link as LinkList } from '../../types';
import { GenericStatus, ValueType } from '../../types';

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

  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data, isLoading, isSuccess } = academyStore.getAcademiesByInstitution(
    authUser?.institution_id || '',
  );
  const list: LinkList[] = [
    { to: '/', title: 'Institution Admin' },
    { to: 'academies', title: 'Academies' },
  ];
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
    { name: 'View Users', handleAction: () => {} },
  ];

  return (
    <>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <>
              <section>
                <BreadCrumb list={list}></BreadCrumb>
              </section>
              {isLoading && academies.length === 0 && <Loader />}
              {academies.length > 0 && isSuccess ? (
                <>
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
              ) : academies.length === 0 ? (
                <NoDataAvailable
                  icon="academy"
                  fill={false}
                  buttonLabel="Add new academy"
                  title={'No academies available'}
                  handleClick={() => history.push(`${url}/add`)}
                  description="the academies are not yet created, click below to create new ones"
                />
              ) : null}
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
