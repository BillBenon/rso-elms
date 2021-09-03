import React, { useState } from 'react';

import Avatar from './components/Atoms/custom/Avatar';
import Icon from './components/Atoms/custom/Icon';
import Input from './components/Atoms/Inputs/Input';
import Textarea from './components/Atoms/Inputs/Textarea';
import ILabel from './components/Atoms/Texts/ILabel';
import AcademyCardMolecule from './components/Molecules/AcademyCardMolecule';

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState('');

  return (
    <div className="p-8 flex flex-col gap-3">
      <ILabel color="error" title="First name" weight="bold" size="xs" />
      <Textarea
        placeholder="This is a text area"
        fcolor="warning"
        type="text"
        value={names}
        handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNames(e.target.value)
        }
      />

      <Input
        placeholder="First"
        fcolor="error"
        type="text"
        value={name}
        handleChange={(e: any) => setName(e.target.value)}
      />

      <Icon name="notification" color="error" bgColor="error" size={16} />
      <Avatar
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        size="16"
        alt="profile image"
      />
      <AcademyCardMolecule>Academy name</AcademyCardMolecule>
    </div>
  );
};

export default App;
