import { useMutation } from 'react-query';

import { roleService } from '../services';

class RoleStore {
  addRole() {
    return useMutation(roleService.addRole);
  }
  getRoles() {
    return useMutation(roleService.getRoles);
  }
}

export const roleStore = new RoleStore();
