import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ExtendedIntakeInfo,
  IntakeInfo,
  IntakePrograms,
} from '../../types/services/intake.types';
import { IntakeProgramInfo } from '../../types/services/program.types';

class IntakeService {
  public async create(intake: IntakeInfo): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.post('/intakes/addIntake', intake);
  }

  public async addPrograms(
    intakePrograms: IntakePrograms,
  ): Promise<AxiosResponse<Response<IntakePrograms>>> {
    return await adminstrationAxios.post('/intakes/addPrograms', intakePrograms);
  }

  public async fetchAll(): Promise<AxiosResponse<Response<ExtendedIntakeInfo[]>>> {
    return await adminstrationAxios.get('/intakes/getIntakes');
  }

  public async getIntakeById(id: string): Promise<AxiosResponse<Response<IntakeInfo>>> {
    return await adminstrationAxios.get(`/intakes/getIntakeById/${id}`);
  }
  public async getIntakesByAcademy(
    id: string,
  ): Promise<AxiosResponse<Response<ExtendedIntakeInfo[]>>> {
    return await adminstrationAxios.get(`/intakes/getIntakesByAcademy/${id}`);
  }

  public async getProgramsByIntake(
    intakeId: string,
  ): Promise<AxiosResponse<Response<IntakeProgramInfo[]>>> {
    return await adminstrationAxios.get(`/intakes/getProgramsByIntake/${intakeId}`);
  }
}

export const intakeService = new IntakeService();
