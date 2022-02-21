import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { Privileges, RoleResWithPrevilages } from '../../../types';
import cookie from '../../../utils/cookie';

interface IPermission {
  children: ReactNode;
  privilege: Privileges;
}

export default function Permission({ children, privilege }: IPermission) {
  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();

  const picked_role_cookie = cookie.getCookie('user_role');
  const picked_role: RoleResWithPrevilages | undefined = picked_role_cookie
    ? JSON.parse(picked_role_cookie)
    : undefined;

  useEffect(() => {
    const _privileges = picked_role?.role_privileges?.map((privilege) => privilege.name);

    if (_privileges) setPrivileges(_privileges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // return <> {privileges?.includes(privilege) && children}</>;
  return children;
}
