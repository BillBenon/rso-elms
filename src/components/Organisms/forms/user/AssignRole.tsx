import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { roleStore } from '../../../../store/administration';
import usersStore from '../../../../store/administration/users.store';
import { ParamType, ValueType } from '../../../../types';
import { AssignUserRole } from '../../../../types/services/user.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';

export default function AssignRole() {
  const { id: userId } = useParams<ParamType>();
  const { data, isLoading } = roleStore.getRoles();
  const [roles, setRoles] = useState<string[]>([]);
  const history = useHistory();

  const { mutate } = usersStore.assignRole();

  function handleChange(e: ValueType) {
    const value = e.value as string[];
    setRoles(value);
  }

  async function saveRoles(e: FormEvent) {
    e.preventDefault();
    let user_roles: AssignUserRole[] = [];

    roles.map((role) => {
      user_roles.push({
        description: '',
        role_id: +role,
        user_id: userId,
      });
    });

    await mutate(user_roles, {
      onSuccess(data) {
        toast.success(data.data.message);
        queryClient.invalidateQueries('roles');
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <form onSubmit={saveRoles}>
      <DropdownMolecule
        isMulti
        name="role"
        handleChange={handleChange}
        options={getDropDownOptions({ inputs: data?.data.data || [] })}
        placeholder={isLoading ? 'Loading roles...' : 'Select role'}>
        Select roles
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
