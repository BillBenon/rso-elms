import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../plugins/axios';
import { LoginInfo, LoginRes, Response } from '../types';

class AuthenticatorService {
  public async login(loginInfo: LoginInfo): Promise<AxiosResponse<Response<LoginRes>>> {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }

  public async authUser() {
    return await adminstrationAxios.get('/authentication/current');
  }
}

export const authenticatorService = new AuthenticatorService();
