import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { privilegeStore, roleStore } from '../../../../store';
import { AddPrivilegeRoleType, SelectData, ValueType } from '../../../../types';
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
  const { data } = privilegeStore.getPrivileges();
  const [privileges, setPrivileges] = useState<SelectData[]>([{ label: '', value: '' }]);
  function handleChange({ name, value }: ValueType) {
    console.log(name, value);
    // setForm((old) => ({ ...old, [name]: value }));
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

  useEffect(() => {
    if (data) {
      const privileges = data.data.data.map((priv) => ({
        label: priv.name,
        value: priv.id,
      }));
      setPrivileges(privileges);
    }
  }, [data?.data.data]);

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
        options={privileges}
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
