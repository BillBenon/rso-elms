import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { HobbiesTypes, HobbyRes } from '../../types/services/hobbies.types';

class HobbyService {
  public async addHobby(hobby: HobbiesTypes): Promise<AxiosResponse<Response<HobbyRes>>> {
    return await adminstrationAxios.post('/hobby/addHobby', hobby);
  }

  public async getHobbies(): Promise<AxiosResponse<Response<HobbyRes[]>>> {
    return await adminstrationAxios.get('/hobby/getHobbies');
  }

  public async getHobby(id: string): Promise<AxiosResponse<Response<HobbyRes>>> {
    return await adminstrationAxios.get(`/hobby/getHobby/${id}`);
  }

  public async UpdateHobby(
    hobby: HobbiesTypes,
  ): Promise<AxiosResponse<Response<HobbyRes>>> {
    return await adminstrationAxios.put('/hobby/updateRole', { ...hobby });
  }

  public async getUserHobbies(
    personId: string,
  ): Promise<AxiosResponse<Response<HobbyRes[]>>> {
    return await adminstrationAxios.get(`/hobby/getUserHobbies/${personId}`);
  }
}

export const hobbyService = new HobbyService();
