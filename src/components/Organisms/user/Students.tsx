import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Students({ students }: { students: Object[] }) {
  const { url } = useRouteMatch();

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
      {students && students.length > 0 && (
        <div className="pt-8">
          <Table statusColumn="status" data={students} actions={studentActions} />
        </div>
      )}
    </>
  );
}
