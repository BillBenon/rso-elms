import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { ValueType } from '../../../types';
import { UserTypes } from '../../../views/users/Users';
import Button from '../../Atoms/custom/Button';
import NoDataAvailable from '../../Molecules/cards/NoDataAvailable';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Students({ students }: { students: UserTypes[] }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function handleSearch(_e: ValueType) {}
  const studentActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit student', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader
        title="Students"
        totalItems={students && students.length > 0 ? students.length : 0}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Link to={`${url}/import`}>
            <Button styleType="outline">Import users</Button>
          </Link>
          <Link to={`${url}/add`}>
            <Button>New User</Button>
          </Link>
        </div>
      </TableHeader>
      {students && (
        <div className="pt-8">
          {students.length <= 0 ? (
            <NoDataAvailable
              buttonLabel="Add new student"
              title={'No students available'}
              handleClick={() => history.push(`/dashboard/users/add`)}
              description="And the web just isnt the same without you. Lets get you back online!"
            />
          ) : (
            <Table<UserTypes>
              statusColumn="status"
              data={students}
              actions={studentActions}
              hide={['id', 'user_type']}
            />
          )}
        </div>
      )}
    </>
  );
}
