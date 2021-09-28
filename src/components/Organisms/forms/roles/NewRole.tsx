import React, { FormEvent, useState } from 'react';

import { roleStore } from '../../../../store';
import { CreateRoleReq, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

interface PropType {
  onSubmit: <E>(_e: FormEvent<E>) => void;
}

export default function NewRole({ onSubmit }: PropType) {
  const [form, setForm] = useState<CreateRoleReq>({ name: '', description: '' });
  const { mutateAsync } = roleStore.addRole();

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(form);
    onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule value={form.name} error="" handleChange={handleChange} name="name">
        Role name
      </InputMolecule>
      {/* model code
    {/* module description */}
      <TextAreaMolecule
        value={form.description}
        name="description"
        handleChange={handleChange}>
        Descripiton
      </TextAreaMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
