import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import AssignRole from '../../components/Organisms/forms/user/AssignRole';
import useAuthenticator from '../../hooks/useAuthenticator';
import usersStore from '../../store/administration/users.store';
import { Privileges, ValueType } from '../../types';
import { ActionsType } from '../../types/services/table.types';
import { AcademyUserType, UserType, UserTypes } from '../../types/services/user.types';
import { formatUserTable } from '../../utils/array';

export default function AdminsView() {
  const { user } = useAuthenticator();
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data, isLoading, refetch } =
    user?.user_type === UserType.SUPER_ADMIN
      ? usersStore.fetchUsers({
          userType: UserType.ADMIN,
          page: currentPage,
          pageSize,
          sortyBy: 'username',
        })
      : usersStore.getUsersByAcademyAndUserType(
          user?.academy.id.toString() || '',
          UserType.ADMIN,
          { page: currentPage, pageSize, sortyBy: 'username' },
        );

  const users = formatUserTable(data?.data.data.content || []);

  let actions: ActionsType<UserTypes | AcademyUserType>[] = [];

  actions?.push({
    name: 'Assign Role',
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/role`); // go to assign role
    },
    privilege: Privileges.CAN_ASSIGN_ROLE,
  });

  actions?.push({
    name: 'Edit admin',
    handleAction: (id: string | number | undefined) => {
      history.push(`/dashboard/users/${id}/edit`); // go to edit user
    },
    privilege: Privileges.CAN_MODIFY_USER,
  });

  actions?.push({
    name: 'View admin',
    handleAction: (id: string | number | undefined) => {
      history.push(`/dashboard/users/${id}/profile`); // go to view user profile
    },
    privilege: Privileges.CAN_ACCESS_PROFILE,
  });

  function handleSearch(_e: ValueType) {}

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, refetch]);

  return (
    <div>
      <TableHeader
        title="Admins"
        totalItems={data?.data.data.totalElements || 0}
        handleSearch={handleSearch}>
        {user?.user_type === UserType.SUPER_ADMIN && (
          <Link to={`/dashboard/users/add/${UserType.ADMIN}`}>
            <Button>New admin</Button>
          </Link>
        )}
      </TableHeader>
      {isLoading ? (
        <Loader />
      ) : users.length <= 0 ? (
        <NoDataAvailable
          icon="user"
          buttonLabel="Add new admin"
          title={'No admins available'}
          handleClick={() => history.push(`/dashboard/users/add/${UserType.ADMIN}`)}
          description="And the web just isnt the same without you. Lets get you back online!"
        />
      ) : (
        <>
          <Table<UserTypes | AcademyUserType>
            statusColumn="status"
            data={users}
            actions={actions}
            statusActions={[]}
            hide={['id', 'user_type']}
            selectorActions={[]}
            uniqueCol="id"
            rowsPerPage={pageSize}
            totalPages={data?.data.data.totalPages || 1}
            currentPage={currentPage}
            onPaginate={(page) => setcurrentPage(page)}
            onChangePageSize={(size) => {
              setcurrentPage(0);
              setPageSize(size);
            }}
          />
        </>
      )}
      <Switch>
        <Route
          exact
          path={`${path}/:id/role`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Assign role"
              open={true}
              onClose={history.goBack}>
              <AssignRole />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
