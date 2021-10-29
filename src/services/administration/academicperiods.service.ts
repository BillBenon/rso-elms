import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  IAcademicPeriodInfo,
  ICreateAcademicPeriod,
} from '../../types/services/academicperiod.types';

class AcademicPeriodService {
  public async createAcademicPeriod(
    academicPeriodInfo: ICreateAcademicPeriod,
  ): Promise<AxiosResponse<Response<IAcademicPeriodInfo>>> {
    return await adminstrationAxios.post(
      '/periods/addAcademicPeriod',
      academicPeriodInfo,
    );
  }
  public async getAcademicPeriodById(
    id: string,
  ): Promise<AxiosResponse<Response<IAcademicPeriodInfo>>> {
    return await adminstrationAxios.get(`/academies/getAcademyById/${id}`);
  }
  public async getAcademicPeriodsByAcademicYear(
    academiYearId: string,
  ): Promise<AxiosResponse<Response<IAcademicPeriodInfo[]>>> {
    return await adminstrationAxios.get(
      `/periods/getAcademicPeriodsByAcademicYear/${academiYearId}`,
    );
  }

  public async modifyAcademicPeriod(
    yearInfo: ICreateAcademicPeriod,
  ): Promise<AxiosResponse<Response<IAcademicPeriodInfo>>> {
    return await adminstrationAxios.put('/periods/modifyAcademicPeriod', { ...yearInfo });
  }
}

export const academicPeriodService = new AcademicPeriodService();
