import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  CreateLevelIntakeProgram,
  LevelIntakeProgram,
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
  public async getLevelsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `academicProgramIntakeLevels/getProgramLevelsByIntakeProgram/${intakeProgramId}`,
    );
  }
  public async addLevelsToIntakeProgram(
    newLevels: CreateLevelIntakeProgram[],
  ): Promise<AxiosResponse<Response<LevelIntakeProgram[]>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addLevelsToIntakeProgram`,
      newLevels,
    );
  }
  public async addLevelToIntakeProgram(
    newLevel: CreateLevelIntakeProgram,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram[]>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addAcademicProgramLevelToIntakeProgram`,
      newLevel,
    );
  }
}

export const intakeProgramService = new IntakeProgramService();
