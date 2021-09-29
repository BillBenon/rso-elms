import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import Dashboard from '../../layout/Dashboard';
import { roleStore } from '../../store';

export default function Roles() {
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const { data: roles } = roleStore.getRoles();

  console.log(roles);

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
        {/* <Table statusColumn="status" data={roles} hasAction={true} /> */}
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
  );
}
