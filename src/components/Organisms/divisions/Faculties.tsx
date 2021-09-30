import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../Atoms/custom/Button';
import Cacumber from '../../Molecules/Cacumber';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Faculties() {
  const { url, path } = useRouteMatch();

  return (
    <main>
      <section>
        <Cacumber list={[{ title: 'Divisions', to: 'divisions' }]} />
      </section>
      <section>
        <TableHeader title="Roles" totalItems={4} handleSearch={() => {}}>
          <Link to={`${url}/add`}>
            <Button>Add Role</Button>
          </Link>
        </TableHeader>
      </section>
      <section>{/* divisions table here */}</section>

      <Switch>
        {/* create role */}
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Role" open={true} onClose={() => {}}>
                {/* add division form here */}
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
              <PopupMolecule title="Update Role" open={true} onClose={() => {}}>
                {/* update division here */}
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
