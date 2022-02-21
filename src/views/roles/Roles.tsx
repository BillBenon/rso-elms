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

import Permission from '../../components/Atoms/auth/Permission';
// import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import UpdateRole from '../../components/Organisms/forms/roles/UpdateRole';
import { roleStore } from '../../store/administration';
import { Privileges, RoleRes } from '../../types';
import { ActionsType } from '../../types/services/table.types';

interface FilteredRoles extends Pick<RoleRes, 'id' | 'name' | 'description' | 'status'> {}

export default function Roles() {
  const { url, path } = useRouteMatch();
  const [roles, setRoles] = useState<FilteredRoles[]>();
  const history = useHistory();
  const location = useLocation();

  // const { user } = useAuthenticator();
  // const { data, isSuccess, isLoading, refetch } =
  //   user?.user_type === UserType.SUPER_ADMIN
  //     ? roleStore.getRolesByInstitution(user.institution.id + '')
  //     : roleStore.getRolesByAcademy(user?.academy.id + ''); // fetch roles

  const { data, isSuccess, isLoading, refetch } = roleStore.getRoles();

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
  }, [location, path, refetch]);

  //actions to be displayed in table
  let actions: ActionsType<FilteredRoles>[] | undefined = [];

  actions?.push({
    name: 'Edit role',
    handleAction: (id: string | number | undefined) => {
      history.push(`${path}/${id}/edit`); // go to edit role
    },
    privilege: Privileges.CAN_MODIFY_ROLE,
  });

  actions?.push({
    name: 'View',
    handleAction: (id: string | number | undefined) => {
      history.push(`${path.replace(/roles/i, 'role')}/${id}/view`); // go to view role
    },
    privilege: Privileges.CAN_ACCESS_ROLE,
  });

  // const manyActions = [
  //   {
  //     name: 'Disable/Enable',
  //     handleAction: (data?: string[]) => {
  //       alert(`handling many at once ${data}`);
  //     },
  //   },
  // ];

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
          totalItems={roles && roles.length > 0 ? roles.length : 0}
          handleSearch={handleSearch}>
          <Permission privilege={Privileges.CAN_CREATE_ROLE}>
            <Link to={`${url}/add`}>
              <Button>Add Role</Button>
            </Link>
          </Permission>
        </TableHeader>
      </section>
      <section>
        {isLoading && <Loader />}
        {roles && roles.length > 0 && isSuccess ? (
          <Table<FilteredRoles>
            selectorActions={[]}
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
            description="There are no roles added yet. Click below to add some"
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
