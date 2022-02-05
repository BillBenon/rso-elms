import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewPrivilege from '../../components/Organisms/forms/privilege/NewPrivilege';
import { privilegeStore } from '../../store/administration';
import { PrivilegeRes } from '../../types';

export default function PrivilegesView() {
  const { path, url } = useRouteMatch();
  const location = useLocation();

  const [privileges, setPrivileges] = useState<PrivilegeRes[]>([]);
  const history = useHistory();

  const { data, isSuccess, isLoading, refetch } = privilegeStore.getPrivileges(); // get privileges

  useEffect(() => {
    data?.data?.data && setPrivileges(data?.data?.data);
  }, [data]);

  // refetch data whenever user comes back on the page
  useEffect(() => {
    if (location.pathname === path) {
      refetch();
    }
  }, [location, path, refetch]);

  function submited() {}
  function handleSearch() {}

  const actions = [
    {
      name: 'Edit Privillege',
      handleAction: (id: string | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit page
      },
    },
    {
      name: 'Disable/Enable',
      handleAction: (_id: string | undefined) => {
        // history.push(`/${id}/edit`);
      },
    },
  ];

  return (
    <main>
      <section>
        <BreadCrumb list={[{ title: 'Privileges', to: 'privilege' }]} />
      </section>
      <section>
        <TableHeader
          title="Privileges"
          totalItems={privileges && privileges.length > 0 ? privileges.length : 0}
          handleSearch={handleSearch}></TableHeader>
      </section>
      <section>
        {isLoading && <Loader />}
        {isSuccess && privileges.length > 0 ? (
          <Table<PrivilegeRes>
            uniqueCol="id"
            statusColumn="status"
            data={privileges}
            actions={actions}
          />
        ) : isSuccess && privileges.length === 0 ? (
          <NoDataAvailable
            buttonLabel="Add new privilege"
            title={'No privilege available'}
            handleClick={() => history.push(`${url}/add`)}
            description="There are no priviledges added yet. Click below to add some"
          />
        ) : null}
      </section>

      <Switch>
        {/* edit page */}
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
