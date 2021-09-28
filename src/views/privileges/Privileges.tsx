import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewPrivilege from '../../components/Organisms/forms/privilege/NewPrivilege';
import { privilegeStore } from '../../store';
import { PrivilegeRes } from '../../types';

export default function PrivilegesView() {
  const { path } = useRouteMatch();
  const location = useLocation();

  const [privileges, setPrivileges] = useState<PrivilegeRes[]>([]);
  const history = useHistory();

  const { data, isSuccess, isLoading, refetch } = privilegeStore.getPrivileges();

  useEffect(() => {
    data?.data?.data && setPrivileges(data?.data?.data);
  }, [data]);

  useEffect(() => {
    if (location.pathname === path) {
      refetch();
    }
    console.log(location, 'changed', path);
  }, [location]);

  function submited() {}
  function handleSearch() {}

  const actions = [
    {
      name: 'Edit Privillege',
      handleAction: (id: string | undefined) => {
        history.push(`${path}/${id}/edit`);
      },
    },
    {
      name: 'Disable/Enable',
      handleAction: (id: string | undefined) => {
        // history.push(`/${id}/edit`);
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
        {isSuccess &&
          privileges &&
          (privileges.length == 0 ? (
            'No data.'
          ) : (
            <Table<PrivilegeRes>
              uniqueCol="id"
              statusColumn="status"
              data={privileges}
              actions={actions}
            />
          ))}
      </section>

      <Switch>
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Edit Privilege" open={true} onClose={history.goBack}>
                <NewPrivilege onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
