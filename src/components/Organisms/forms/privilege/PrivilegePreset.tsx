/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { getUnAssignedPrivileges, roleStore } from '../../../../store/administration';
import { AddPrivilegeRoleType, RolePropType, RoleRes } from '../../../../types';
import Badge from '../../../Atoms/custom/Badge';
import Button from '../../../Atoms/custom/Button';

function PrivilegePreset({ roleId, academyId, onSubmit }: RolePropType) {
  const { data } = roleStore.getRoles();
  const { user } = useAuthenticator();
  const history = useHistory();
  const [priv, setPriv] = useState<AddPrivilegeRoleType>({
    roleId: roleId,
    privileges: '',
  });
  const [roles, setRoles] = useState<RoleRes[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>();
  const { mutateAsync } = roleStore.addPrivilegesOnRole();

  const { data: rolePrivileges } = getUnAssignedPrivileges(
    selectedRole + '',
    !!selectedRole,
  );

  useEffect(() => {
    setRoles(
      data?.data.data.filter(
        (role) => role.id != roleId && role.academy_id === academyId,
      ) || [],
    );
  }, [academyId, data?.data.data, roleId, user]);
  useEffect(() => {
    let privileges = rolePrivileges?.data.data
      ? rolePrivileges.data.data.map((priv) => priv.id)
      : undefined;

    let privs = privileges?.map((priv) => priv).join(',');

    privs &&
      setPriv({
        roleId: roleId,
        privileges: privs,
      });
  }, [roleId, rolePrivileges?.data.data]);

  const savePrivileges = () => {
    const toastId = toast.loading('adding privileges to role');
    mutateAsync(priv, {
      onSuccess: () => {
        onSubmit();
        toast.success('Privilege(s) Added', { id: toastId });
        history.push(`/dashboard/role/${roleId}/view`);
      },
      onError: () => {
        toast.error('something wrong happened adding privileges on role', {
          id: toastId,
        });
      },
    });
  };

  return (
    <>
      {roles.length === 0 ? (
        <Badge
          fontWeight="medium"
          fontSize="sm"
          badgecolor="main"
          badgetxtcolor="txt-secondary"
          className="mx-2">
          No other roles are available now
        </Badge>
      ) : (
        <>
          <div className="grid grid-cols-3 max-h-80 overflow-y-scroll">
            {roles.map((role) => (
              <div onClick={() => setSelectedRole(role.id.toString())} key={role.id}>
                <Badge
                  badgecolor={'secondary'}
                  badgetxtcolor={'txt-primary'}
                  className={`${
                    selectedRole == role.id ? 'border border-primary-600' : ''
                  } py-4 cursor-pointer`}>
                  {role.name}
                </Badge>
              </div>
            ))}
          </div>

          {/* save button */}
          <div className="mt-5">
            <Button type="button" onClick={savePrivileges}>
              save
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default PrivilegePreset;
