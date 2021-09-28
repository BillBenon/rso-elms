import { useMutation, useQuery } from 'react-query';

import { roleService } from '../services';

class RoleStore {
  addRole() {
    return useMutation(roleService.addRole);
  }
  getRoles() {
    return useQuery('roles', roleService.getRoles);
  }
}

export const roleStore = new RoleStore();
