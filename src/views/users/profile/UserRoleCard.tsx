import React from 'react';

import Badge from '../../../components/Atoms/custom/Badge';
import Heading from '../../../components/Atoms/Text/Heading';
import usersStore from '../../../store/administration/users.store';
import { UserInfo } from '../../../types/services/user.types';
import { advancedTypeChecker } from '../../../utils/getOption';

function UserRoleCard({ user }: { user: UserInfo }) {
  const { data } = usersStore.getUserRoles(user.id + '');
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        {user.first_name + ' ' + user.last_name}&apos;s roles
      </Heading>
      <div className="bg-secondary py-5">
        {data?.data.data.length === 0 ? (
          <Badge
            fontWeight="medium"
            fontSize="sm"
            badgecolor="main"
            badgetxtcolor="txt-secondary"
            className="mx-2">
            No roles are currently not specificied
          </Badge>
        ) : (
          data?.data.data.map((role) => (
            <Badge
              key={role.id}
              fontWeight="medium"
              fontSize="sm"
              badgecolor="main"
              badgetxtcolor={advancedTypeChecker(role.role.status)}
              className="mx-2">
              {role.role.name}
            </Badge>
          ))
        )}
      </div>
    </div>
  );
}

export default UserRoleCard;
