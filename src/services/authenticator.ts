import { LoginInfo } from '../types/dataTypes';
import { adminstrationAxios } from '../utils/axios';

class Authenticator {
  public async login(loginInfo: LoginInfo) {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }

  public async authUser() {
    return await adminstrationAxios.post('/authentication/current');
  }
}

export const authenticator = new Authenticator();
