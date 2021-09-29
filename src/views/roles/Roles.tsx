import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import UpdateRole from '../../components/Organisms/forms/roles/UpdateRole';
import { roleStore } from '../../store';
import { RoleRes } from '../../types';

interface FilteredRoles extends Pick<RoleRes, 'id' | 'name' | 'description' | 'status'> {}

export default function Roles() {
  const { url, path } = useRouteMatch();
  const [roles, setRoles] = useState<FilteredRoles[]>();
  const history = useHistory();
  const location = useLocation();

  const { data, isSuccess, isLoading, refetch } = roleStore.getRoles(); // fetch roles

  useEffect(() => {
    // filter data to display
    const filterdData = data?.data.data.map((role) =>
      _.pick(role, ['id', 'name', 'description', 'status']),
    );

    data?.data.data && setRoles(filterdData);
  }, [data]);

  // re fetch data whenever user come back on this page
  useEffect(() => {
    if (location.pathname === path || location.pathname === `${path}/`) {
      refetch();
    }
  }, [location]);

  //actions to be displayed in table
  const actions = [
    {
      name: 'Edit role',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit role
      },
    },
    { name: 'View', handleAction: () => {} },
  ];

  function submited() {
    // setOpen(false);
  }
  function handleSearch() {}

  return (
    <main>
      <section>
        <Cacumber list={[{ title: 'Roles', to: 'roles' }]} />
      </section>
      <section>
        <TableHeader title="Roles" totalItems={4} handleSearch={handleSearch}>
          <Link to={`${url}/add`}>
            <Button>Add Role</Button>
          </Link>
        </TableHeader>
      </section>
      <section>
        {isLoading && 'Roles loading...'}
        {isSuccess ? roles?.length === 0 : 'No Roles found, try to add one'}
        {roles && (
          <Table<FilteredRoles>
            statusColumn="status"
            data={roles}
            uniqueCol={'id'}
            actions={actions}
          />
        )}
      </section>

      <Switch>
        {/* create role */}
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Role" open={true} onClose={history.goBack}>
                <NewRole onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />

        {/* modify role */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Role" open={true} onClose={history.goBack}>
                <UpdateRole onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
