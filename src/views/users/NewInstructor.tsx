import React from 'react';

import NewInstructor from '../../components/Organisms/user/NewInstructor';
import NewStudent from '../../components/Organisms/user/NewStudent';
import Dashboard from '../../layout/Dashboard';

export default function NewInstructorView() {
  return (
    <Dashboard>
      <NewInstructor />
    </Dashboard>
  );
}
