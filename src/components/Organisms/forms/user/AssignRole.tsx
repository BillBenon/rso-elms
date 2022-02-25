import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../plugins/react-query';
import { roleStore } from '../../../../store/administration';
import academyStore from '../../../../store/administration/academy.store';
import usersStore from '../../../../store/administration/users.store';
import { ParamType, RoleType, ValueType } from '../../../../types';
import { AcademyInfo } from '../../../../types/services/academy.types';
import { AssignUserRole } from '../../../../types/services/user.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
} from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function AssignRole() {
  const { id: userId } = useParams<ParamType>();
  const history = useHistory();

  const { data: userRoles } = usersStore.getUserRoles(userId);

  const [roles, setRoles] = useState<string[]>([]);
  const { user } = useAuthenticator();
  const [roleInfo, setRoleInfo] = useState({
    name: '',
    description: '',
    academy_id: '',
    institution_id: '',
    type: RoleType.ACADEMY,
  });

  useEffect(() => {
    setRoleInfo((role) => ({ ...role, institution_id: user?.institution.id + '' }));
  }, [user?.institution.id]);

  const { data, isLoading } =
    roleInfo.type === RoleType.ACADEMY
      ? roleStore.getRolesByAcademy(roleInfo.academy_id)
      : roleStore.getRolesByInstitution(roleInfo.institution_id);

  const { mutate } = usersStore.assignRole();

  function handleChange(e: ValueType) {
    const value = e.value as string[];
    setRoles(value);
  }

  function otherHandleChange({ name, value }: ValueType) {
    setRoleInfo((old) => ({ ...old, [name]: value }));
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

  const userRolesId = userRoles?.data.data.map((role) => role.role.id) || [];

  const roleOptions =
    data?.data.data.filter((role) => !userRolesId.includes(role.id)) || [];

  const academies: AcademyInfo[] | undefined =
    academyStore.fetchAcademies().data?.data.data || [];

  return (
    <form onSubmit={saveRoles}>
      <>
        <RadioMolecule
          className="pb-2"
          defaultValue={roleInfo.type}
          options={getDropDownStatusOptions(RoleType)}
          value={roleInfo.type}
          handleChange={otherHandleChange}
          name="type">
          Apply Role On
        </RadioMolecule>
        {roleInfo.type === RoleType.ACADEMY ? (
          <SelectMolecule
            options={getDropDownOptions({ inputs: academies || [] })}
            name="academy_id"
            placeholder="select academy"
            value={roleInfo.academy_id}
            handleChange={otherHandleChange}>
            Academy
          </SelectMolecule>
        ) : (
          <InputMolecule
            name=""
            readOnly
            value={user?.institution.name}
            handleChange={otherHandleChange}>
            Institution
          </InputMolecule>
        )}
      </>
      <DropdownMolecule
        isMulti
        name="role"
        handleChange={handleChange}
        options={getDropDownOptions({ inputs: roleOptions })}
        placeholder={isLoading ? 'Loading roles...' : 'Select role'}>
        Select roles
      </DropdownMolecule>
      <div className="pt-3">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
