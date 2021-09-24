import { adminstrationAxios } from '../plugins/axios';
import { LoginInfo } from '../types/dataTypes';

class AuthenticatorService {
  public async login(loginInfo: LoginInfo) {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }

  public async authUser() {
    return await adminstrationAxios.post('/authentication/current');
  }
}

export const authenticatorService = new AuthenticatorService();
