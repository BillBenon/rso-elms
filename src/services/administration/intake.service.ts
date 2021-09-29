import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { IntakeInfo, TableId } from '../../types/services/intake.types';

class IntakeService {
  public async create(intake: IntakeInfo): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.post('intakes/addIntake', intake);
  }

  public async fetchAll() {
    return await adminstrationAxios.get('/intakes/getIntakes');
  }

  public async getIntakeById({ id }: TableId) {
    return await adminstrationAxios.get(`/intakes/getIntakeById/${id}`);
  }
  public async getIntakesByAcademy({ id }: TableId) {
    return await adminstrationAxios.get(`/api/intakes/getIntakesByAcademy/${id}`);
  }
}

export const intakeService = new IntakeService();
