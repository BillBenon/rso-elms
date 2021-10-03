import React from 'react';
import { Link } from 'react-router-dom';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Instructors({ instructors }: { instructors: Object[] }) {
  function handleSearch(_e: ValueType) {}
  const instructorActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit instructor', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader
        title="Instructors"
        totalItems={instructors && instructors.length > 0 ? instructors.length : 0}
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
      {instructors && instructors.length > 0 && (
        <div className="pt-8">
          <Table statusColumn="status" data={instructors} actions={instructorActions} />
        </div>
      )}
    </>
  );
}
