import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewRole from '../../components/Organisms/forms/roles/NewRole';
import Dashboard from '../../layout/Dashboard';

export default function Roles() {
  const [open, setOpen] = useState(false); // state to controll the popup

  const roles = [
    {
      'Role name': 'ROLE_STUDENT',
      Description: 'student role',
      'Number of previlleges': 2,
      status: 'ACTIVE',
    },
    {
      'Role name': 'ROLE_INSTRUCTOR',
      Description: 'Instructor role, that can enable to create courses',
      'Number of previlleges': 20,
      status: 'INACTIVE',
    },
    {
      'Role name': 'ROLE_IOC',
      Description: 'IOC role',
      'Number of previlleges': 12,
      status: 'ACTIVE',
    },
    {
      'Role name': 'ROLE_ADMIN',
      Description: 'Admin roles, that can help user to controll academy or institution',
      'Number of previlleges': 76,
      status: 'ACTIVE',
    },
  ];

  function submited() {
    setOpen(false);
  }
  function handleSearch() {}

  return (
    <Dashboard>
      <main>
        <section>
          <Cacumber list={[{ title: 'Roles', to: 'roles' }]} />
        </section>
        <section>
          <TableHeader title="Academy" totalItems={4} handleSearch={handleSearch}>
            <Button onClick={() => setOpen(true)}>Add Role</Button>
          </TableHeader>
        </section>
        <section>
          <Table statusColumn="status" data={roles} hasAction={true} />
        </section>
        {/* add module popup */}
        <PopupMolecule title="New Role" open={open} onClose={() => setOpen(false)}>
          <NewRole onSubmit={submited} />
        </PopupMolecule>
      </main>
    </Dashboard>
  );
}
