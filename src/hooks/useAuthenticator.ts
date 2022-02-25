import { AxiosError } from 'axios';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../plugins/react-query';
import { authenticatorStore } from '../store/administration';
import { LoginInfo, Response } from '../types';
import { AuthUser } from '../types/services/user.types';
import cookie from '../utils/cookie';

export default function useAuthenticator() {
  const [user, setUser] = useState<AuthUser>();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [_isError, setIsError] = useState(false);
  const [_error, setError] = useState<AxiosError<Response>>();
  const [userAvailabe, setUserAvailable] = useState(false);
  const { refetch } = authenticatorStore.authUser(false);
  const { mutateAsync } = authenticatorStore.login();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  const fetchData = useCallback(async () => {
    setIsUserLoading(true);
    const { data, isSuccess, isError, error } = await refetch();
    if (isSuccess) {
      setUser(data?.data.data);
      setUserAvailable(true);
    }

    if (error) setError(error as AxiosError);

    setIsError(isError);
    setIsUserLoading(false);
  }, [refetch]);

  useEffect(() => {
    if (!user) fetchData();
  }, [fetchData, user]);

  async function login<T>(e: FormEvent<T>, details: LoginInfo) {
    e.preventDefault();

    setIsLoggingIn(true);
    const toastId = toast.loading('Authenticating...');
    logout();

    await mutateAsync(details, {
      async onSuccess(data) {
        cookie.setCookie('jwt_info', JSON.stringify(data?.data.data));
        setIsLoggingIn(false);
        await fetchData();
        toast.success(data.data.message, { duration: 1200, id: toastId });
        redirectTo('/redirecting');
      },
      onError(error) {
        setIsLoggingIn(false);
        console.log(error);
        toast.error('Authentication failed', { duration: 3000, id: toastId });
      },
    });
  }

  function logout() {
    setUser(undefined);
    setUserAvailable(false);
    queryClient.clear();
    cookie.eraseCookie('jwt_info');
    cookie.eraseCookie('user_role');
  }

  const redirectTo = (path: string) => {
    history.push(path);
  };

  return {
    user,
    userLoading: isUserLoading,
    userAvailabe,
    isLoggingIn,
    login,
    logout,
    isError: _isError,
    error: _error,
    isLoggedIn,
  };
}
