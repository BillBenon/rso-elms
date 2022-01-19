import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { Privileges } from '../../../types';

interface Permission {
  children: ReactNode;
  privilege: Privileges;
}

export default function Permision({ children, privilege }: Permission) {
  const { user, getPrivilegesByRole } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();

  useEffect(() => {
    setPrivileges(getPrivilegesByRole(parseInt(user?.user_roles[0].id + '')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <> {privileges?.includes(privilege) && children}</>;
}
