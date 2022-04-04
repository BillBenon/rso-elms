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
import { addPrivilegeSchema } from '../../../../validations/privilege.validation';
import Button from '../../../Atoms/custom/Button';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';

interface PrivErrors {
  privileges: string;
}

export default function AddPrivileges({ onSubmit, roleName, roleId }: RolePropType) {
  const [form, setForm] = useState<AddPrivilegeRoleType>({
    roleId: roleId,
    privileges: '',
  });
  const { mutateAsync } = roleStore.addPrivilegesOnRole();
  const history = useHistory();
  const { data } = getUnAssignedPrivileges(roleId);
  const [privileges, setPrivileges] = useState<SelectData[]>([{ label: '', value: '' }]);

  const initialErrorState: PrivErrors = {
    privileges: '',
  };

  const [errors, setErrors] = useState(initialErrorState);

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: (value as string[]).join(',') }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    const toastId = toast.loading('adding privileges to role');

    e.preventDefault();

    const validatedForm = addPrivilegeSchema.validate(privileges, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        if (privileges.length === 0) {
          toast.error('Please select privileges');
        } else {
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
      })
      .catch((err) => {
        const validatedErr: PrivErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof PrivErrors] = el.message;
        });
        setErrors(validatedErr);
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
        error={errors.privileges}
        hasError={errors.privileges !== ''}
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
