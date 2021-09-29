import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { CreateUserInfo, UserInfo } from '../../types/services/user.types';

class UserService {
  public async createUser(
    userInfo: CreateUserInfo,
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.post('/users/registerNewUser', userInfo);
  }
  public async fetchUsers(): Promise<AxiosResponse<Response<UserInfo[]>>> {
    console.log('het');

    return await adminstrationAxios.get('/users/getUsers');
  }
}

export const userService = new UserService();
