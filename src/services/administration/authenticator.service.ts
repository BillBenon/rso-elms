import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { LoginInfo, LoginRes, Response } from '../../types';
import { UserInfo } from '../../types/services/user.types';

class AuthenticatorService {
  public async login(loginInfo: LoginInfo): Promise<AxiosResponse<Response<LoginRes>>> {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }

  public async authUser(): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.get('/authentication/current');
  }
  public async logout() {
    return await adminstrationAxios.get('/authentication/logout');
  }
}

export const authenticatorService = new AuthenticatorService();
