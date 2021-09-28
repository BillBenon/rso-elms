import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../plugins/axios';
import { Response } from '../types';
import { IntakeInfo } from '../types/services/intake.types';

class IntakeService {
  public async create(intake: IntakeInfo): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.post('/intakes/addIntake', intake);
  }

  public async fetchAll() {
    return await adminstrationAxios.get('//intakes/addIntake');
  }
}

export const authenticatorService = new IntakeService();
