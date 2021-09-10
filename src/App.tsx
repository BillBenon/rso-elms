import React from 'react';

import Dashboard from './components/Molecules/Dashboard';
import SignUpForm from './components/Organisms/signup/SignUpForm';

const App = () => {
  return (
    <>
      <Dashboard>This is the dashboard</Dashboard>
      <SignUpForm />
    </>
  );
};

export default App;
