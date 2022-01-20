import { useEffect, useState } from 'react';

import { authenticatorStore } from '../store/administration';
import { AuthUser } from '../types/services/user.types';

export default function useAuthenticator() {
  const [user, setUser] = useState<AuthUser>();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userAvailabe, setUserAvailable] = useState(false);
  const { refetch } = authenticatorStore.authUser(false);

  useEffect(() => {
    async function fetchData() {
      setIsUserLoading(true);
      const { data, isSuccess } = await refetch();
      if (isSuccess) {
        setUser(data?.data.data);
        setUserAvailable(true);
      }
      setIsUserLoading(false);
    }
    if (!user) fetchData();
  });

  return { user, userLoading: isUserLoading, userAvailabe };
}
