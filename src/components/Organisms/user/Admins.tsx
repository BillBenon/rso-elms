import React from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';

export default function Admins({ admins }: { admins: Object[] }) {
  function handleSearch(_e: ValueType) {}
  const adminActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader title="Admins" totalItems={admins.length} handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button styleType="outline">Import users</Button>
        </div>
      </TableHeader>
      <div className="pt-8">
        <Table statusColumn="status" data={admins} />
      </div>
    </>
  );
}
