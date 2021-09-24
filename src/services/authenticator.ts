import { LoginInfo } from '../types/dataTypes';
import { adminstrationAxios } from '../utils/axios';

class Authenticator {
  public async login(loginInfo: LoginInfo) {
    return await adminstrationAxios.post('/authentication/signin', loginInfo);
  }
}

export const authenticator = new Authenticator();
