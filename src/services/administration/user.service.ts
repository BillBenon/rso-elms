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
    return await adminstrationAxios.get('/users/getUsers');
  }
  public async getUserByid(id: string): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.get(`/public/getUserById/${id}`);
  }
  public async getUserAccountByNid(
    nid: string,
  ): Promise<AxiosResponse<Response<UserInfo[]>>> {
    return await adminstrationAxios.get(`/public/getUserAccountsByNid/${nid}`);
  }
  public async getLanguages() {
    return await adminstrationAxios.get('languages/getLanguages');
  }
}

export const userService = new UserService();
