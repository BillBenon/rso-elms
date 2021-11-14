import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { InstructorDeployed } from './../../types/services/instructordeployed.types';

class InstructorDeployment {
  public async getInstructorsDeployedInAcademy(
    academyId: string,
  ): Promise<AxiosResponse<Response<InstructorDeployed[]>>> {
    return await adminstrationAxios.get(
      `instructorDeployments/getInstructorsDeployedInAcademy/${academyId}`,
    );
  }
}

export const instructorDeployment = new InstructorDeployment();
