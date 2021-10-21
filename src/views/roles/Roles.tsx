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
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
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
    {
      name: 'View',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path.replace(/roles/i, 'role')}/${id}/view`); // go to view role
      },
    },
  ];

  const manyActions = [
    {
      name: 'Disable/Enable',
      handleAction: (data?: string[]) => {
        alert(`handling many at once ${data}`);
      },
    },
  ];

  function submited() {
    // setOpen(false);
  }
  function handleSearch() {}

  function handleSelect(_selected: string[] | null) {}

  return (
    <main>
      <section>
        <BreadCrumb list={[{ title: 'Roles', to: 'roles' }]} />
      </section>
      <section>
        <TableHeader
          title="Roles"
          totalItems={`${roles && roles.length > 0 ? roles.length : 0} roles`}
          handleSearch={handleSearch}>
          <Link to={`${url}/add`}>
            <Button>Add Role</Button>
          </Link>
        </TableHeader>
      </section>
      <section>
        {isLoading && <Loader />}
        {roles && roles.length > 0 && isSuccess ? (
          <Table<FilteredRoles>
            selectorActions={manyActions}
            hide={['id']}
            handleSelect={handleSelect}
            statusColumn="status"
            data={roles}
            uniqueCol={'id'}
            actions={actions}
          />
        ) : isSuccess && roles?.length === 0 ? (
          <NoDataAvailable
            icon="role"
            buttonLabel="Add new role"
            title={'No roles available'}
            handleClick={() => history.push(`${url}/add`)}
            description="There are no roles added yet. Click above to add some"
          />
        ) : null}
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
              <PopupMolecule title="Update Role" open onClose={history.goBack}>
                <UpdateRole onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
