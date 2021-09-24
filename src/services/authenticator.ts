import { LoginInfo } from '../types/dataTypes';
import { adminstrationAxios } from '../utils/axios';

class Authenticator {
  public async login(loginInfo: LoginInfo) {
    const res = await adminstrationAxios.post('/authentication/signin', loginInfo);
    console.log(res);
  }
}

export const authenticator = new Authenticator();
