import React from 'react';

import { AuthUser } from '../types/services/user.types';
import { RoleResWithPrevilages } from './../types/services/role.types';

interface IUserContext {
  user: AuthUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | undefined>>;
  picked_role: RoleResWithPrevilages | undefined;
  setPickedRole: React.Dispatch<React.SetStateAction<RoleResWithPrevilages | undefined>>;
}

export default React.createContext({
  user: undefined,
  setUser: () => {},
  setPickedRole: () => {},
  picked_role: undefined,
} as IUserContext);
