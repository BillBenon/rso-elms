import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { authenticatorStore } from './store';

export default function Redirecting() {
  const history = useHistory();
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    if (data?.data.data.user_type == 'SUPER_ADMIN') redirectTo('/dashboard/users');
    if (data?.data.data.user_type == 'ADMIN') redirectTo('/dashboard/programs');
  }, [data?.data.data]);

  const redirectTo = (path: string) => {
    history.push(path);
  };
  return (
    <>
      <p>Redirecting...</p>
    </>
  );
}
