import React from 'react';
import toast from 'react-hot-toast';

import Badge from '../../../components/Atoms/custom/Badge';
import Icon from '../../../components/Atoms/custom/Icon';
import Heading from '../../../components/Atoms/Text/Heading';
import { queryClient } from '../../../plugins/react-query';
import usersStore from '../../../store/administration/users.store';
import { UserInfo } from '../../../types/services/user.types';
import { advancedTypeChecker } from '../../../utils/getOption';

function UserRoleCard({ user }: { user: UserInfo }) {
  const { data } = usersStore.getUserRoles(user.id + '');
  const { mutate } = usersStore.revokeRole();

  const revokeUserRole = async (roleId: number) => {
    await mutate(roleId, {
      onSuccess(data) {
        toast.success(data.data.message);
        queryClient.invalidateQueries('user/roles');
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        {user.person?.current_rank?.name || ''} {user.first_name + ' ' + user.last_name}
        &apos;s roles
      </Heading>
      <div className="bg-secondary py-5">
        {data?.data.data.length === 0 ? (
          <Badge
            fontWeight="medium"
            fontSize="sm"
            badgecolor="main"
            badgetxtcolor="txt-secondary"
            className="mx-2">
            No roles are currently specificied
          </Badge>
        ) : (
          data?.data.data.map((role) => (
            <Badge
              key={role.id}
              fontWeight="medium"
              fontSize="sm"
              badgecolor="main"
              badgetxtcolor={advancedTypeChecker(role.role.status)}
              className="m-2">
              <div className="flex items-center justify-between w-24">
                <p>{role.role.name}</p>
                <button type="button" onClick={() => revokeUserRole(+role.id)}>
                  <Icon size={12} name={'close'} />
                </button>
              </div>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}

export default UserRoleCard;
