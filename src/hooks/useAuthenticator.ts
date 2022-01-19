import { useEffect, useState } from 'react';

import { authenticatorStore } from '../store/administration';
import { UserInfo } from '../types/services/user.types';

export default function useAuthenticator() {
  const [user, setUser] = useState<UserInfo>();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const { refetch } = authenticatorStore.authUser(false);

  useEffect(() => {
    async function fetchData() {
      setIsUserLoading(true);
      const { data, isSuccess } = await refetch();
      if (isSuccess) setUser(data?.data.data);
      setIsUserLoading(false);
    }
    if (!user) fetchData();
  });

  return { user, userLoading: isUserLoading };
}
