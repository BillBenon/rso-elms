import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewStudent from './NewStudent';

export default function Students({ students }: { students: Object[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleSearch(_e: ValueType) {}
  return (
    <>
      <TableHeader
        title="Students"
        totalItems={students.length}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button styleType="outline">Import users</Button>
          <Button onClick={() => setModalOpen(true)}>New Student</Button>
        </div>
      </TableHeader>
      <div className="pt-8">
        <Table statusColumn="status" data={students} />
      </div>
      <PopupMolecule
        title="New student"
        open={modalOpen}
        onClose={() => setModalOpen(false)}>
        <NewStudent />
      </PopupMolecule>
    </>
  );
}
