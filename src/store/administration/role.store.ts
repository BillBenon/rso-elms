import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { roleService } from '../../services';
import { PrivilegeRes, Response, RolePrivilege, RoleRes } from '../../types';

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

  getRolesByInstitution(institutionId: string) {
    return useQuery(['role/institutionId', institutionId], () =>
      roleService.getRolesByInstitution(institutionId),
    );
  }

  getRolesByAcademy(academyId: string) {
    return useQuery(['role/academyId', academyId], () =>
      roleService.getRolesByAcademy(academyId),
    );
  }

  getPrivilegesByRole(roleId: string, enabled = true) {
    return useQuery<AxiosResponse<Response<RolePrivilege[]>>, Response>(
      ['privilegesByRole/id', roleId],
      () => roleService.getPrivilegesByRole(roleId),
      { enabled },
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

export const getUnAssignedPrivileges = (roleId: string, enabled = true) => {
  return useQuery<AxiosResponse<Response<PrivilegeRes[]>>, Response>(
    ['unAssignedPrivileges/id', roleId],
    () => roleService.getUnAssignedPrivilege(roleId),
    { enabled },
  );
};

export const roleStore = new RoleStore();
