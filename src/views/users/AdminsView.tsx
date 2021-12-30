import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { authenticatorStore } from '../../store/administration';
import usersStore from '../../store/administration/users.store';
import { ValueType } from '../../types';
import { AcademyUserType, UserType, UserTypes } from '../../types/services/user.types';
import { formatUserTable } from '../../utils/array';

export default function AdminsView() {
  const authUser = authenticatorStore.authUser().data?.data.data;
  const history = useHistory();

  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const { data, isLoading, refetch } =
    authUser?.user_type === UserType.SUPER_ADMIN
      ? usersStore.fetchUsers({
          userType: UserType.ADMIN,
          page: currentPage,
          pageSize,
          sortyBy: 'username',
        })
      : usersStore.getUsersByAcademyAndUserType(
          authUser?.academy.id.toString() || '',
          UserType.ADMIN,
          { page: currentPage, pageSize, sortyBy: 'username' },
        );

  const users = formatUserTable(data?.data.data.content || []);

  const adminActions = [
    { name: 'Add Role', handleAction: () => {} },
    {
      name: 'Edit admin',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/edit`); // go to edit user
      },
    },
    {
      name: 'View admin',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/profile`); // go to view user profile
      },
    },
  ];

  function handleSearch(_e: ValueType) {}

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize]);

  return (
    <div>
      <TableHeader
        title="Admins"
        totalItems={data?.data.data.totalElements || 0}
        handleSearch={handleSearch}>
        {authUser?.user_type === UserType.SUPER_ADMIN && (
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
            actions={adminActions}
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
    </div>
  );
}
