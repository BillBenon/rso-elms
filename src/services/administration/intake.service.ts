import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { ExtendedIntakeInfo, IntakeInfo } from '../../types/services/intake.types';

type TableId = string | number;

class IntakeService {
  public async create(intake: IntakeInfo): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.post('intakes/addIntake', intake);
  }

  public async fetchAll(): Promise<AxiosResponse<Response<ExtendedIntakeInfo[]>>> {
    console.log('in srvice');

    return await adminstrationAxios.get('/intakes/getIntakes');
  }

  public async getIntakeById(id: TableId): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.get(`/intakes/getIntakeById/${id}`);
  }
  public async getIntakesByAcademy(
    id: TableId,
  ): Promise<AxiosResponse<Response<ExtendedIntakeInfo[]>>> {
    return await adminstrationAxios.get(`/api/intakes/getIntakesByAcademy/${id}`);
  }
}

export const intakeService = new IntakeService();
