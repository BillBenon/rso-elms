import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { IcreateLevel, ILevel } from '../../types/services/levels.types';

class LevelService {
  public async addLevel(level: IcreateLevel): Promise<AxiosResponse<Response<ILevel>>> {
    return await adminstrationAxios.post('/levels/addLevel', level);
  }

  public async getLevels(): Promise<AxiosResponse<Response<ILevel[]>>> {
    return await adminstrationAxios.get('/levels/getLevels');
  }

  public async getLevel(id: string): Promise<AxiosResponse<Response<ILevel>>> {
    return await adminstrationAxios.get(`/levels/getLevelById/${id}`);
  }

  public async modifylevel(
    level: IcreateLevel,
  ): Promise<AxiosResponse<Response<ILevel>>> {
    return await adminstrationAxios.put('/levels/modifyLevel', { ...level });
  }
}

export const levelService = new LevelService();