import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';

export default function Admins({ admins }: { admins: Object[] }) {
  const [importAdminModalOpen, setImportAdminModalOpen] = useState(false);
  function handleSearch(_e: ValueType) {}
  const adminActions = [
    { name: 'Add Role', handleAction: () => {} },
    { name: 'Edit admin', handleAction: () => {} },
    { name: 'View', handleAction: () => {} },
  ];
  return (
    <>
      <TableHeader
        title="Admins"
        totalItems={admins && admins.length > 0 ? admins.length : 0}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button onClick={() => setImportAdminModalOpen(true)} styleType="outline">
            Import users
          </Button>
        </div>
      </TableHeader>
      {admins && admins.length > 0 && (
        <div className="pt-8">
          <Table statusColumn="status" data={admins} actions={adminActions} />
        </div>
      )}

      <PopupMolecule
        title="Import admins"
        open={importAdminModalOpen}
        onClose={() => setImportAdminModalOpen(false)}>
        <ImportUsers userType="admins" />
      </PopupMolecule>
    </>
  );
}
