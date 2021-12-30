import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { FilterOptions, Response, SortedContent } from '../../types';
import {
  CreateUserInfo,
  IImportUserRes,
  UserInfo,
  UserType,
} from '../../types/services/user.types';
import { formatQueryParameters } from '../../utils/query';
import { UpdateUserInfo } from './../../types/services/user.types';

class UserService {
  public async createUser(
    userInfo: CreateUserInfo,
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.post('/users/registerNewUser', userInfo);
  }

  public async importUsers(
    userInfo: FormData,
  ): Promise<AxiosResponse<Response<IImportUserRes>>> {
    return await adminstrationAxios.post('/users/importUsers', userInfo);
  }

  public async modifyUser(
    userInfo: UpdateUserInfo,
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.put('/users/modifyUser', userInfo);
  }
  public async updateProfile(
    userInfo: UpdateUserInfo,
  ): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.put('/users/updateProfile', userInfo);
  }
  public async fetchUsers(
    queryParams?: FilterOptions,
  ): Promise<AxiosResponse<Response<SortedContent<UserInfo[]>>>> {
    return await adminstrationAxios.get(
      `/users/getUsers?${formatQueryParameters(queryParams)}`,
    );
  }
  public async getUserByid(id: string): Promise<AxiosResponse<Response<UserInfo>>> {
    return await adminstrationAxios.get(`/users/getUserById/${id}`);
  }
  public async getUsersByInstitution(
    institutionId: string,
  ): Promise<AxiosResponse<Response<UserInfo[]>>> {
    return await adminstrationAxios.get(`users/getUsersByInstitution/${institutionId}`);
  }
  public async getUsersByAcademy(
    academyId: string,
  ): Promise<AxiosResponse<Response<UserInfo[]>>> {
    return await adminstrationAxios.get(`users/getUsersByAcademy/${academyId}`);
  }
  public async getUsersByAcademyAndUserType(
    academyId: string,
    userType: UserType,
    queryParams?: FilterOptions,
  ): Promise<AxiosResponse<Response<SortedContent<UserInfo[]>>>> {
    return await adminstrationAxios.get(
      `/users/getUsersByAcademyAndType/${academyId}/${userType}?${formatQueryParameters(
        queryParams,
      )}`,
    );
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
