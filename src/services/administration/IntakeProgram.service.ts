import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  CreateLevelsIntakeProgram,
  IntakeProgramInfo,
} from '../../types/services/intake-program.types';
import { UserInfo } from '../../types/services/user.types';

class IntakeProgramService {
  public async getStudentsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<UserInfo[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsByIntakeProgram/${intakeProgramId}`,
    );
  }
  public async addLevelsToIntakeProgram(
    newLevels: CreateLevelsIntakeProgram[],
  ): Promise<AxiosResponse<Response<IntakeProgramInfo[]>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addLevelsToIntakeProgram`,
      newLevels,
    );
  }
}

export const intakeProgramService = new IntakeProgramService();
