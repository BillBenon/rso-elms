import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';
import NewStudent from './NewStudent';

export default function Students({ students }: { students: Object[] }) {
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [importStudentModalOpen, setImportStudentModalOpen] = useState(false);
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
          <Button onClick={() => setImportStudentModalOpen(true)} styleType="outline">
            Import users
          </Button>
          <Button onClick={() => history.push('/dashboard/users/student/new')}>
            New Student
          </Button>
        </div>
      </TableHeader>
      {students && students.length > 0 && (
        <div className="pt-8">
          <Table statusColumn="status" data={students} actions={studentActions} />
        </div>
      )}
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
        <ImportUsers userType="students" />
      </PopupMolecule>
    </>
  );
}
