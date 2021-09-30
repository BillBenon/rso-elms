import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { roleService } from '../services';
import { Response, RoleRes } from '../types';

class RoleStore {
  addRole() {
    return useMutation(roleService.addRole);
  }
  getRoles() {
    return useQuery('roles', roleService.getRoles);
  }

  getRole(id: string) {
    return useQuery<AxiosResponse<Response<RoleRes>>, Response>(['roles/id', id], () =>
      roleService.getRole(id),
    );
  }

  getPrivilegesByRole(roleId: string) {
    return useQuery<AxiosResponse<Response<RoleRes>>, Response>(
      ['roles/id', roleId],
      () => roleService.getRole(roleId),
    );
  }

  modifyRole() {
    return useMutation(roleService.modifyRole);
  }
}

export const roleStore = new RoleStore();
