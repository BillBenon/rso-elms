import React, { useState } from 'react';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportStudents from './ImportStudents';
import NewStudent from './NewStudent';

export default function Students({ students }: { students: Object[] }) {
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [importStudentModalOpen, setImportStudentModalOpen] = useState(false);

  function handleSearch(_e: ValueType) {}
  return (
    <>
      <TableHeader
        title="Students"
        totalItems={students.length}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button onClick={() => setImportStudentModalOpen(true)} styleType="outline">
            Import users
          </Button>
          <Button onClick={() => setNewStudentModalOpen(true)}>New Student</Button>
        </div>
      </TableHeader>
      <div className="pt-8">
        <Table statusColumn="status" data={students} />
      </div>
      <PopupMolecule
        title="New student"
        open={newStudentModalOpen}
        onClose={() => setNewStudentModalOpen(false)}>
        <NewStudent />
      </PopupMolecule>
      <PopupMolecule
        title="Import students"
        open={importStudentModalOpen}
        onClose={() => setImportStudentModalOpen(false)}>
        <ImportStudents />
      </PopupMolecule>
    </>
  );
}
