import React, { useState } from 'react';

import Button from '../../../../components/Atoms/custom/Button';
import PopupMolecule from '../../../../components/Molecules/Popup';
import Table from '../../../../components/Molecules/table/Table';
import TableHeader from '../../../../components/Molecules/table/TableHeader';
import { ValueType } from '../../../../types';
import NewInstructor from '../../../../views/users/NewInstructor';

export default function Instructors({ instructors }: { instructors: Object[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleSearch(_e: ValueType) {}
  return (
    <>
      <TableHeader
        title="Instructors"
        totalItems={instructors.length}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button styleType="outline">Import users</Button>
          <Button onClick={() => setModalOpen(true)}>New Instructor</Button>
        </div>
      </TableHeader>
      <div className="pt-8">
        <Table statusColumn="status" data={instructors} />
      </div>
      <PopupMolecule
        title="New instructor"
        open={modalOpen}
        onClose={() => setModalOpen(false)}>
        <NewInstructor />
      </PopupMolecule>
    </>
  );
}
