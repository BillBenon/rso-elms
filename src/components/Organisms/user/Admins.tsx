import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ValueType } from '../../../types';
import { UserTypes } from '../../../types/services/user.types';
import Button from '../../Atoms/custom/Button';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Admins({ admins }: { admins: UserTypes[] }) {
  const history = useHistory();
  function handleSearch(_e: ValueType) {}

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
  return (
    <>
      <TableHeader
        title="Admins"
        totalItems={admins && admins.length > 0 ? admins.length : 0}
        handleSearch={handleSearch}
        showSearch={admins && admins.length > 0}>
        <div className="flex gap-3">
          <div className="flex gap-3">
            <Link to={`/dashboard/users/add`}>
              <Button>New admin</Button>
            </Link>
          </div>
        </div>
      </TableHeader>
      {admins && (
        <div className="pt-8">
          {admins.length <= 0 ? (
            <NoDataAvailable
              icon="user"
              buttonLabel="Add new instructor"
              title={'No instructor available'}
              handleClick={() => history.push(`/dashboard/users/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <Table<UserTypes>
              statusColumn="status"
              data={admins}
              actions={adminActions}
              hide={['id', 'user_type']}
              uniqueCol="id"
            />
          )}
        </div>
      )}
    </>
  );
}
