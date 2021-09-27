import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { CreateRoleReq, Response, RoleRes } from '../../types';

class AuthenticatorService {
  public async addRole(role: CreateRoleReq): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.post('/roles/add', role);
  }

  public async getRoles(): Promise<AxiosResponse<Response<RoleRes>>> {
    return await adminstrationAxios.get('/roles/current');
  }
}

export const authenticatorService = new AuthenticatorService();
