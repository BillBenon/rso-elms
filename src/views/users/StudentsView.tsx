import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import ImportUsers from '../../components/Organisms/user/ImportUsers';
import useAuthenticator from '../../hooks/useAuthenticator';
import usersStore from '../../store/administration/users.store';
import { Privileges, ValueType } from '../../types';
import { ActionsType } from '../../types/services/table.types';
import { AcademyUserType, UserType, UserTypes } from '../../types/services/user.types';
import { formatUserTable } from '../../utils/array';

export default function StudentsView() {
  const { url } = useRouteMatch();
  const { user } = useAuthenticator();
  const history = useHistory();

  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  let actions: ActionsType<any>[] | undefined = [];

  const { data, isLoading, refetch } =
    user?.user_type === UserType.SUPER_ADMIN
      ? usersStore.fetchUsers({
          userType: UserType.STUDENT,
          page: currentPage,
          pageSize,
          sortyBy: 'username',
        })
      : usersStore.getUsersByAcademyAndUserType(
          user?.academy?.id.toString() || '',
          UserType.STUDENT,
          { page: currentPage, pageSize, sortyBy: 'username' },
        );

  const users = formatUserTable(data?.data.data.content || []);

  actions?.push({
    name: 'Add Role',
    handleAction: () => {},
    privilege: Privileges.CAN_ASSIGN_ROLE,
  });

  actions?.push({
    name: 'Edit student',
    handleAction: (id: string | number | undefined) => {
      history.push(`/dashboard/users/${id}/edit`); // go to edit user
    },
    privilege: Privileges.CAN_MODIFY_USER,
  });

  actions?.push({
    name: 'View Student',
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/profile`); // go to view user profile
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
        title="Students"
        totalItems={data?.data.data.totalElements || 0}
        handleSearch={handleSearch}>
        <Permission privilege={Privileges.CAN_CREATE_USER}>
          <div className="flex gap-3">
            <Link to={`${url}/import`}>
              <Button styleType="outline">Import students</Button>
            </Link>
            <Link to={`${url}/add/${UserType.STUDENT}`}>
              <Button>New student</Button>
            </Link>
          </div>
        </Permission>
      </TableHeader>

      {isLoading ? (
        <Loader />
      ) : users.length <= 0 ? (
        <NoDataAvailable
          icon="user"
          buttonLabel="Add new student"
          title={'No students available'}
          handleClick={() => history.push(`/dashboard/users/add/STUDENT`)}
          description="And the web just isnt the same without you. Lets get you back online!"
        />
      ) : (
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
      )}

      <Switch>
        <Route
          exact
          path={`${url}/import`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Import students"
              open={true}
              onClose={history.goBack}>
              <ImportUsers userType={UserType.STUDENT} />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
