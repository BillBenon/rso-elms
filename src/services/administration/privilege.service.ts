import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { PrivilegeRes, PrivilegeUpdate } from '../../types/services/privilege.types';

class AuthenticatorService {
  public async getAllPrivileges(): Promise<AxiosResponse<Response<PrivilegeRes[]>>> {
    return await adminstrationAxios.get('/privileges/getPrivileges');
  }

  public async getPrivilege(id: string): Promise<AxiosResponse<Response<PrivilegeRes>>> {
    return await adminstrationAxios.get(`/privileges/getPrivilegeById/${id}`);
  }

  public async modifyPrivilege(
    privilege: PrivilegeUpdate,
  ): Promise<AxiosResponse<Response<PrivilegeRes>>> {
    return await adminstrationAxios.put('/privileges/modifyPrivilege', { ...privilege });
  }
}

export const authenticatorService = new AuthenticatorService();
