import { adminstrationAxios } from '../plugins/axios';
import { LoginInfo } from '../types/dataTypes';

class Authenticator {
  public async login(loginInfo: LoginInfo) {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }

  public async authUser() {
    return await adminstrationAxios.post('/authentication/current');
  }
}

export const authenticator = new Authenticator();
