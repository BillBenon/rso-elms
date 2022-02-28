/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { getPrivilegesByRole, roleStore } from '../../../../store/administration';
import { AddPrivilegeRoleType, RolePropType } from '../../../../types';
import Badge from '../../../Atoms/custom/Badge';
import Button from '../../../Atoms/custom/Button';

function PrivilegePreset({ roleId, onSubmit }: RolePropType) {
  const { data } = roleStore.getRoles();
  const history = useHistory();
  const [priv, setPriv] = useState<AddPrivilegeRoleType>({
    roleId: roleId,
    privileges: '',
  });
  const [selectedRole, setSelectedRole] = useState<string>();
  const { mutateAsync } = roleStore.addPrivilegesOnRole();
  let roles = data?.data.data.filter((role) => role.id != roleId) || [];

  const { data: rolePrivileges } = getPrivilegesByRole(selectedRole + '', !!selectedRole);

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
    if (selectedRole) {
      const toastId = toast.loading('adding privileges to role');

      mutateAsync(priv, {
        onSuccess: () => {
          onSubmit();
          toast.success('Privilege(s) Added', { id: toastId });
          queryClient.invalidateQueries(['privilegesByRole/id', selectedRole]);
          history.push(`/dashboard/role/${roleId}/view`);
        },
        onError: () => {
          toast.error('something wrong happened adding privileges on role', {
            id: toastId,
          });
        },
      });
    } else {
      toast.error('You must select a role for presets');
    }
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
