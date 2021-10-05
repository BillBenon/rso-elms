import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { roleService } from '../services';
import { PrivilegeRes, Response, RolePrivilege, RoleRes } from '../types';

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
    return useQuery<AxiosResponse<Response<RolePrivilege[]>>, Response>(
      ['privilegesByRole/id', roleId],
      () => roleService.getPrivilegesByRole(roleId),
    );
  }

  getUnAssignedPrivileges(roleId: string) {
    return useQuery<AxiosResponse<Response<PrivilegeRes[]>>, Response>(
      ['unAssignedPrivileges/id', roleId],
      () => roleService.getUnAssignedPrivilege(roleId),
    );
  }

  modifyRole() {
    return useMutation(roleService.modifyRole);
  }

  addPrivilegesOnRole() {
    return useMutation(roleService.addPrivilegesOnRole);
  }

  removeProvilege() {
    return useMutation(roleService.removePrivilege);
  }
}

export const roleStore = new RoleStore();
