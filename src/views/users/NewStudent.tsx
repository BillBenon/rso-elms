import React from 'react';

import NewStudent from '../../components/Organisms/user/NewStudent';
import Dashboard from '../../layout/Dashboard';

export default function NewStudentsView() {
  return (
    <Dashboard>
      <NewStudent />
    </Dashboard>
  );
}
