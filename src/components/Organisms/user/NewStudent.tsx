import React from 'react';

import Icon from '../../Atoms/custom/Icon';
import Input from '../../Atoms/Input/Input';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';

export default function NewStudent() {
  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" fill="gray" />

        <ILabel size="sm" color="gray" weight="medium">
          Users
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="gray" weight="medium">
          Students
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          New
        </ILabel>
      </div>
      <div className="pb-7">
        <Heading size="lg" color="primary" weight="medium">
          New Student
        </Heading>
      </div>

      <div className="block">
        <Input
          name="name"
          placeholder="First name"
          value=""
          handleChange={() => console.log('login')}
        />
      </div>
    </>
  );
}
