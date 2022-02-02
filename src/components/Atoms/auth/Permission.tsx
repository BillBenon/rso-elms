import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { Privileges } from '../../../types';

interface IPermission {
  children: ReactNode;
  privilege: Privileges;
}

export default function Permission({ children, privilege }: IPermission) {
  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();

  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      ?.role_privileges?.map((privilege) => privilege.name);

    if (_privileges) setPrivileges(_privileges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // return <> {privileges?.includes(privilege) && children}</>;
  return <> {children} </>;
}
