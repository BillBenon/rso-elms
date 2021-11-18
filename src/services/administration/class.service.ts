import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { IClass, ICreateClass } from './../../types/services/class.types';

class ClassService {
  public async addClass(cl: ICreateClass): Promise<AxiosResponse<Response<IClass>>> {
    return await adminstrationAxios.post('/intakeLevelClasses/addIntakeLevelClasses', cl);
  }
  public async getClassById(id: string): Promise<AxiosResponse<Response<IClass>>> {
    return await adminstrationAxios.get(
      `/intakeLevelClasses/getIntakeLevelClassById/${id}`,
    );
  }
  public async getClassByLevel(
    intakeLevelId: string,
  ): Promise<AxiosResponse<Response<IClass[]>>> {
    return await adminstrationAxios.get(
      `/intakeLevelClasses/getIntakeLevelClassByIntakeLevel/${intakeLevelId}`,
    );
  }
  public async modifyClass(cl: ICreateClass): Promise<AxiosResponse<Response<IClass>>> {
    return await adminstrationAxios.put('/intakeLevelClasses/modifyIntakeLevelClasses', {
      ...cl,
    });
  }
}

export const classService = new ClassService();
