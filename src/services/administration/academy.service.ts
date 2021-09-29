import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { AcademyCreateInfo, AcademyInfo } from './../../types/services/academy.types';

class AcademyService {
  public async createAcademy(
    academyInfo: AcademyCreateInfo,
  ): Promise<AxiosResponse<Response<AcademyInfo>>> {
    return await adminstrationAxios.post('/academies/addAcademy', academyInfo);
  }
  public async fetchAcademies(): Promise<AxiosResponse<Response<AcademyInfo[]>>> {
    return await adminstrationAxios.get('/academies/getAcademies');
  }
}

export const academyService = new AcademyService();
