import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { NextKinInfo } from '../../types/services/usernextkin.types';

class UserNextKinService {
  public async createUserNextKin(
    NextKeenInfo: NextKinInfo,
  ): Promise<AxiosResponse<Response<NextKinInfo>>> {
    return await adminstrationAxios.post('/users/addHisNextOfKins', NextKeenInfo);
  }

  public async getHisNextById(
    userId: string,
  ): Promise<AxiosResponse<Response<NextKinInfo[]>>> {
    return await adminstrationAxios.get(`/users/getHisNextOfKeens/${userId}`);
  }
}

export const userNextKinService = new UserNextKinService();
