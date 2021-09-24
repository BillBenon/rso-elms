import React from 'react';

import StudentDetails from '../../components/Organisms/user/StudentDetails';
import Dashboard from '../../layout/Dashboard';

export default function StudentDetailsView() {
  return (
    <Dashboard>
      <StudentDetails />
    </Dashboard>
  );
}
