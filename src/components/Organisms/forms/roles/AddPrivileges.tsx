import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { roleStore } from '../../../../store';
import { AddPrivilegeRoleType, ValueType } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';

interface PropType {
  onSubmit: <E>(_e: FormEvent<E>) => void;
  roleName: string;
  roleId: string;
}

export default function AddPrivileges({ onSubmit, roleName, roleId }: PropType) {
  const [form, setForm] = useState<AddPrivilegeRoleType>({
    roleId: roleId,
    privileges: '',
  });
  const { mutateAsync } = roleStore.addPrivilegesOnRole();
  const history = useHistory();

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(form, {
      onSuccess: () => {
        toast.success('Privileges Added', { duration: 3 });
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened adding privileges on role', {
          duration: 3,
        });
      },
    });
    onSubmit(e);
  }
  return (
    <form onSubmit={submitForm}>
      {/* model name */}
      <InputMolecule
        disabled
        value={roleName}
        error=""
        handleChange={() => 0}
        name="name">
        Role name
      </InputMolecule>
      {/* model code
    {/* module description */}
      <DropdownMolecule
        handleChange={handleChange}
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '2', value: '2' },
        ]}
        isMulti
        name="privileges">
        Select privilege
      </DropdownMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
