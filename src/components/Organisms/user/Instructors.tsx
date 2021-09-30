import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import ImportUsers from './ImportUsers';
import NewInstructor from './NewInstructor';

export default function Instructors({ instructors }: { instructors: Object[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [importInstructorModalOpen, setImportInstructorModalOpen] = useState(false);
  const history = useHistory();

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
          <Button onClick={() => setImportInstructorModalOpen(true)} styleType="outline">
            Import users
          </Button>
          <Button onClick={() => history.push('/dashboard/user/instructor/new')}>
            New Instructor
          </Button>
        </div>
      </TableHeader>
      {instructors && instructors.length > 0 && (
        <div className="pt-8">
          <Table statusColumn="status" data={instructors} actions={instructorActions} />
        </div>
      )}
      <PopupMolecule
        title="New instructor"
        open={modalOpen}
        onClose={() => setModalOpen(false)}>
        <NewInstructor />
      </PopupMolecule>
      <PopupMolecule
        title="Import instructors"
        open={importInstructorModalOpen}
        onClose={() => setImportInstructorModalOpen(false)}>
        <ImportUsers userType="instructors" />
      </PopupMolecule>
    </>
  );
}
