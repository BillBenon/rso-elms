import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { getUnAssignedPrivileges, roleStore } from '../../../../store/administration';
import {
  AddPrivilegeRoleType,
  RolePropType,
  SelectData,
  ValueType,
} from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';

export default function AddPrivileges({ onSubmit, roleName, roleId }: RolePropType) {
  const [form, setForm] = useState<AddPrivilegeRoleType>({
    roleId: roleId,
    privileges: '',
  });
  const { mutateAsync } = roleStore.addPrivilegesOnRole();
  const history = useHistory();
  const { data } = getUnAssignedPrivileges(roleId);
  const [privileges, setPrivileges] = useState<SelectData[]>([{ label: '', value: '' }]);
  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: (value as string[]).join(',') }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    const toastId = toast.loading('adding privileges to role');

    e.preventDefault();

    mutateAsync(form, {
      onSuccess: () => {
        onSubmit(e);
        toast.success('Privilege(s) Added', { id: toastId });
        history.goBack();
      },
      onError: () => {
        toast.error('something wrong happened adding privileges on role', {
          id: toastId,
        });
      },
    });
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
        readOnly
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
      <div className="flex flex-col gap-2">
        <ILabel textTransform="normal-case">Or Select from presets</ILabel>
        <Button
          type="button"
          styleType="outline"
          className="w-1/4"
          onClick={() => history.push(`/dashboard/role/${roleId}/view/addPresets`)}>
          Select presets
        </Button>
      </div>
      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Add
        </Button>
      </div>
    </form>
  );
}
