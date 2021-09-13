import React from 'react';

import Input from '../../Atoms/Input/Input';
import ILabel from '../../Atoms/Text/ILabel';
import InputMolecule from '../../Molecules/input/InputMolecule';

export default function NewStudent() {
  return (
    <div className="px-5">
      <div className="pb-7">
        <ILabel size="lg" color="primary" weight="medium">
          New Student
        </ILabel>
        <div className="block">
          <Input
            name="name"
            placeholder="First name"
            value=""
            handleChange={() => console.log('login')}
          />
        </div>
      </div>
    </div>
  );
}
