import React from 'react';

import { AuthUser } from '../types/services/user.types';

interface IUserContext {
  user: AuthUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | undefined>>;
}

export default React.createContext({
  user: undefined,
  setUser: () => {},
} as IUserContext);
