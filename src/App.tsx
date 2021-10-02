import React from 'react';

import { MainLayout } from './layout/MainLayout';
import RouterProtection from './RouterProtection';

const App = () => {
  return (
    <>
      <MainLayout>
        <RouterProtection></RouterProtection>
      </MainLayout>
    </>
  );
};

export default App;
