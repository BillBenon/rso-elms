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
}

export const roleService = new RoleService();
