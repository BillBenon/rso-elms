import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import ImportUsers from '../../components/Organisms/user/ImportUsers';
import { authenticatorStore } from '../../store/administration';
import usersStore from '../../store/administration/users.store';
import { ValueType } from '../../types';
import { AcademyUserType, UserType, UserTypes } from '../../types/services/user.types';
import { formatUserTable } from '../../utils/array';

export default function StudentsView() {
  const { url } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const history = useHistory();

  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data, isLoading, refetch } =
    authUser?.user_type === UserType.SUPER_ADMIN
      ? usersStore.fetchUsers({
          userType: UserType.STUDENT,
          page: currentPage,
          pageSize,
          sortyBy: 'username',
        })
      : usersStore.getUsersByAcademyAndUserType(
          authUser?.academy.id.toString() || '',
          UserType.STUDENT,
          { page: currentPage, pageSize, sortyBy: 'username' },
        );

  const users = formatUserTable(data?.data.data.content || []);

  const studentActions = [
    { name: 'Add Role', handleAction: () => {} },
    {
      name: 'Edit student',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/edit`); // go to edit user
      },
    },
    {
      name: 'View Student',
      handleAction: (id: string | number | undefined) => {
        history.push(`${url}/${id}/profile`); // go to view user profile
      },
    },
  ];

  function handleSearch(_e: ValueType) {}

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : users.length <= 0 ? (
        <NoDataAvailable
          icon="user"
          buttonLabel="Add new student"
          title={'No students available'}
          handleClick={() => history.push(`/dashboard/users/add`)}
          description="And the web just isnt the same without you. Lets get you back online!"
        />
      ) : (
        <>
          <TableHeader
            title="Students"
            totalItems={data?.data.data.totalElements || 0}
            handleSearch={handleSearch}>
            {authUser?.user_type === UserType.SUPER_ADMIN && (
              <div className="flex gap-3">
                <Link to={`${url}/import`}>
                  <Button styleType="outline">Import students</Button>
                </Link>
                <Link to={`${url}/add/${UserType.STUDENT}`}>
                  <Button>New student</Button>
                </Link>
              </div>
            )}
          </TableHeader>
          <Table<UserTypes | AcademyUserType>
            statusColumn="status"
            data={users}
            actions={studentActions}
            statusActions={[]}
            hide={['id', 'user_type']}
            selectorActions={[]}
            uniqueCol="id"
            totalPages={data?.data.data.totalPages || 1}
            currentPage={currentPage}
            onPaginate={(page) => setcurrentPage(page)}
            onChangePageSize={(size) => setPageSize(size)}
          />
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
        </>
      )}
    </div>
  );
}
