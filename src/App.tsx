import React, { useState } from 'react';

import Icon from './components/Atoms/custom/Icon';
import Input from './components/Atoms/Inputs/Input';
import ILabel from './components/Atoms/Texts/ILabel';

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState('');

  return (
    <div className="p-8 flex flex-col gap-3">
      <ILabel color="error" title="First name" weight="bold" size="xs" />
      <Input
        placeholder="This is a text area"
        fcolor="warning"
        type="text"
        category="text_area"
        value={names}
        handleChange={(e: any) => setNames(e.target.value)}
      />

      <Input
        placeholder="First"
        fcolor="error"
        type="text"
        value={name}
        handleChange={(e: any) => setName(e.target.value)}
      />

      <Icon name="notification" color="error" bgColor="error" size={16} />
    </div>
  );
};

export default App;
