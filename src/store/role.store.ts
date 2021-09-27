import { useMutation } from 'react-query';

import { roleService } from '../services';

class AuthenticatorStore {
  addRole() {
    return useMutation(roleService.addRole);
  }
  getRoles() {
    return useMutation(roleService.getRoles);
  }
}

export default new AuthenticatorStore();
