import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import {
  AddPrivilegeRoleType,
  CreateRoleReq,
  Response,
  RolePrivilege,
  RoleRes,
} from '../../types';

class RoleService {
  public async addRole(role: CreateRoleReq): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.post('/roles/addRole', role);
  }

  public async getRoles(): Promise<AxiosResponse<Response<RoleRes[]>>> {
    return await adminstrationAxios.get('/roles/getRoles');
  }

  public async getRole(id: string): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.get(`/roles/getRoleById/${id}`);
  }

  public async getPrivilegesByRole(
    roleId: string,
  ): Promise<AxiosResponse<Response<RolePrivilege[]>>> {
    return await adminstrationAxios.get(`/roles/getAssignedPrivileges/${roleId}`);
  }

  public async modifyRole(
    role: CreateRoleReq,
  ): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.put('/roles/modifyRole', { ...role });
  }

  public async addPrivilegesOnRole(
    role: AddPrivilegeRoleType,
  ): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.put('/roles/addPrivileges', { ...role });
  }
}

export const roleService = new RoleService();
