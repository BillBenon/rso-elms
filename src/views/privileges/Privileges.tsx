import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import { privilegeStore } from '../../store';
import { PrivilegeRes } from '../../types';

export default function PrivilegesView() {
  const { path } = useRouteMatch();
  let privileges: PrivilegeRes[] | undefined = [];
  const history = useHistory();

  const { data, isSuccess, isLoading } = privilegeStore.getPrivileges();

  if (isSuccess) {
    console.log('success');
    privileges = data?.data?.data;
  }

  function submited() {
    // setOpen(false);
  }
  function handleSearch() {}

  const actions = [
    {
      name: 'Edit Privillege',
      handleAction: (data: string | undefined) => {
        console.log(data, 'edited');
      },
    },
    {
      name: 'Disable/Enable',
      handleAction: (data: string | undefined) => {
        console.log(data, 'status');
      },
    },
  ];

  return (
    <main>
      <section>
        <Cacumber list={[{ title: 'Privileges', to: 'privilege' }]} />
      </section>
      <section>
        <TableHeader
          title="Privileges"
          totalItems={privileges?.length || 0}
          handleSearch={handleSearch}></TableHeader>
      </section>
      <section>
        {isLoading && 'loading...'}
        {isSuccess && privileges && (
          <Table<PrivilegeRes>
            uniqueCol="id"
            statusColumn="status"
            data={privileges}
            actions={actions}
          />
        )}
      </section>

      <Switch>
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Edit Privilege" open={true} onClose={history.goBack}>
                <NewRole onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
