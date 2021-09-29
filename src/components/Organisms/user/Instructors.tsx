import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewInstructor from './NewInstructor';

export default function Instructors({ instructors }: { instructors: Object[] }) {
  const [modalOpen, setModalOpen] = useState(false);

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
