import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import Dashboard from '../../layout/Dashboard';

export default function Roles() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const roles = [
    {
      'Role name': 'ROLE_STUDENT',
      Description: 'student role',
      'Number of previlleges': 2,
      status: 'ACTIVE',
    },
    {
      'Role name': 'ROLE_INSTRUCTOR',
      Description: 'Instructor role, that can enable to create courses',
      'Number of previlleges': 20,
      status: 'INACTIVE',
    },
    {
      'Role name': 'ROLE_IOC',
      Description: 'IOC role',
      'Number of previlleges': 12,
      status: 'ACTIVE',
    },
    {
      'Role name': 'ROLE_ADMIN',
      Description: 'Admin roles, that can help user to controll academy or institution',
      'Number of previlleges': 76,
      status: 'ACTIVE',
    },
  ];

  const roleActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit role', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  console.log(url, 'UR');

  function submited() {
    // setOpen(false);
  }
  function handleSearch() {}

  return (
    <Dashboard>
      <main>
        <section>
          <Cacumber list={[{ title: 'Roles', to: 'roles' }]} />
        </section>
        <section>
          <TableHeader title="Academy" totalItems={4} handleSearch={handleSearch}>
            <Link to={`${url}/add`}>
              <Button>Add Role</Button>
            </Link>
          </TableHeader>
        </section>
        <section>
          <Table statusColumn="status" data={roles} actions={roleActions} />
        </section>

        <Switch>
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
        </Switch>
      </main>
    </Dashboard>
  );
}
