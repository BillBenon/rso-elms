import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { InstitutionInfo } from '../../types/services/institution.types';
import { TableId } from '../../types/services/intake.types';

class InstitutionService {
  public async create(
    institution: InstitutionInfo,
  ): Promise<AxiosResponse<Response<InstitutionInfo>>> {
    return await adminstrationAxios.post('institutions/addInstitution', institution);
  }

  public async fetchAll(): Promise<AxiosResponse<Response<InstitutionInfo[]>>> {
    return await adminstrationAxios.get('/institutions/getInstitutions');
  }

  public async getInstitutionById({
    id,
  }: TableId): Promise<AxiosResponse<Response<InstitutionInfo>>> {
    return await adminstrationAxios.get(`/institutions/getInstitutionById/${id}`);
  }
  public async update(
    institution: InstitutionInfo,
  ): Promise<AxiosResponse<Response<InstitutionInfo>>> {
    return await adminstrationAxios.put(`/institutions/modifyInstitution`, institution);
  }
}

export const institutionService = new InstitutionService();
