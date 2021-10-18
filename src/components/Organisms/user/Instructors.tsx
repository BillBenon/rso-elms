import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ValueType } from '../../../types';
import { UserTypes } from '../../../views/users/Users';
import Button from '../../Atoms/custom/Button';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Instructors({ instructors }: { instructors: UserTypes[] }) {
  const history = useHistory();
  function handleSearch(_e: ValueType) {}
  const instructorActions = [
    { name: 'Add Role', handleAction: () => {} },
    {
      name: 'Edit instructor',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/users/${id}/edit`); // go to edit user
      },
    },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader
        title="Instructors"
        totalItems={`${
          instructors && instructors.length > 0 ? instructors.length : 0
        } instructors`}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Link to={`/dashboard/users/import`}>
            <Button styleType="outline">Import users</Button>
          </Link>
          <Link to={`/dashboard/users/add`}>
            <Button>New User</Button>
          </Link>
        </div>
      </TableHeader>
      {instructors && (
        <div className="pt-8">
          {instructors.length <= 0 ? (
            <NoDataAvailable
              buttonLabel="Add new instructor"
              title={'No instructor available'}
              handleClick={() => history.push(`/dashboard/users/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <Table<UserTypes>
              statusColumn="status"
              data={instructors}
              actions={instructorActions}
              hide={['id', 'user_type']}
              uniqueCol="id"
            />
          )}
        </div>
      )}
    </>
  );
}
