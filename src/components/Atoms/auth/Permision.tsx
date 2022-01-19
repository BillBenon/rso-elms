import React from 'react';
import { ReactNode } from 'react';

import { Privileges } from '../../../types';

interface Permission {
  children: ReactNode;
  privilege: Privileges;
}

export default function Permision({ children }: Permission) {
  return <>{children}</>;
}
