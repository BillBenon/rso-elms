import React, { useState } from 'react';

import Input from './components/Atoms/Inputs/Input';
import ILabel from './components/Atoms/Texts/ILabel';

const App = () => {
  const [name, setName] = useState('');

  return (
    <div className="p-8">
      {/* <ILabel color="warning" title="First names" weight="bold" size="xs" /> */}
      <Input
        placeholder="First"
        fcolor="error"
        type="text"
        value={name}
        handleChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default App;
