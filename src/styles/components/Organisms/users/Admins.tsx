import React from 'react';

import Button from '../../../../components/Atoms/custom/Button';
import Table from '../../../../components/Molecules/table/Table';
import TableHeader from '../../../../components/Molecules/table/TableHeader';
import { ValueType } from '../../../../types';

export default function Admins({ admins }: { admins: Object[] }) {
  function handleSearch(_e: ValueType) {}
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
