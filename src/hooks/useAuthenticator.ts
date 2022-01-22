import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { authenticatorStore } from '../store/administration';
import { Response } from '../types';
import { AuthUser } from '../types/services/user.types';

export default function useAuthenticator() {
  const [user, setUser] = useState<AuthUser>();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [_isError, setIsError] = useState(false);
  const [_error, setError] = useState<AxiosError<Response>>();
  const [userAvailabe, setUserAvailable] = useState(false);
  const { refetch } = authenticatorStore.authUser(false);

  useEffect(() => {
    async function fetchData() {
      setIsUserLoading(true);
      const { data, isSuccess, isError, error } = await refetch();
      if (isSuccess) {
        setUser(data?.data.data);
        setUserAvailable(true);
      }

      if (error) setError(error as AxiosError);

      setIsError(isError);
      setIsUserLoading(false);
    }
    if (!user) fetchData();
  });

  return {
    user,
    userLoading: isUserLoading,
    userAvailabe,
    isError: _isError,
    error: _error,
  };
}
