import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { DivisionCreateInfo, DivisionInfo } from '../../types/services/division.types';

class DivisionService {
  public async addDivision(
    division: DivisionCreateInfo,
  ): Promise<AxiosResponse<Response<DivisionInfo>>> {
    return await adminstrationAxios.post('/divisions/addDivision', division);
  }

  public async getDivision(id: string): Promise<AxiosResponse<Response<DivisionInfo[]>>> {
    return await adminstrationAxios.get(`/divisions/getDivisionsByType/${id}`);
  }

  public async getDivisionById(
    id: string,
  ): Promise<AxiosResponse<Response<DivisionInfo>>> {
    return await adminstrationAxios.get(`/divisions/getDivisionById/${id}`);
  }

  public async getFacultyByDepartment(
    id: string,
  ): Promise<AxiosResponse<Response<DivisionInfo[]>>> {
    return await adminstrationAxios.get(`/divisions/getDivisionsByParent/${id}`);
  }

  public async modifyDivision(
    division: DivisionCreateInfo,
  ): Promise<AxiosResponse<Response<DivisionInfo>>> {
    return await adminstrationAxios.put('/divisions/modifyDivision', { ...division });
  }
}

export const divisionService = new DivisionService();
