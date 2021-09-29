import { useMutation, useQuery } from 'react-query';

import { roleService } from '../services';

class RoleStore {
  addRole() {
    return useMutation(roleService.addRole);
  }
  getRoles() {
    return useQuery('roles', roleService.getRoles);
  }

  getRole(id: string) {
    return useQuery(['roles/id', id], () => roleService.getRole(id));
  }

  modifyRole() {
    return useMutation(roleService.modifyRole);
  }
}

export const roleStore = new RoleStore();
