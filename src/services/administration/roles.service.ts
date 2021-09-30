import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { CreateRoleReq, Response, RoleRes } from '../../types';

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

  public async modifyRole(
    role: CreateRoleReq,
  ): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.put('/roles/modifyRole', { ...role });
  }
}

export const roleService = new RoleService();
