import { useEffect, useState } from 'react';

import { authenticatorStore } from '../store/administration';
import { AuthUser } from '../types/services/user.types';

export default function useAuthenticator() {
  const [user, setUser] = useState<AuthUser>();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const { refetch } = authenticatorStore.authUser(false);

  function getPrivilegesByRole(roleId: number) {
    return user?.user_roles
      .filter((role) => role.id === roleId)[0]
      .privileges.map((privilege) => privilege.name);
  }

  useEffect(() => {
    async function fetchData() {
      setIsUserLoading(true);
      const { data, isSuccess } = await refetch();
      if (isSuccess) setUser(data?.data.data);
      setIsUserLoading(false);
    }
    if (!user) fetchData();
  });

  return { user, userLoading: isUserLoading, getPrivilegesByRole };
}
