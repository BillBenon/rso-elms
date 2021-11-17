import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  AddLevelToModule,
  CreateLevelIntakeProgram,
  IntakeLevelModule,
  LevelIntakeProgram,
} from '../../types/services/intake-program.types';
import { ModuleInfo } from '../../types/services/modules.types';
import { UserInfo } from '../../types/services/user.types';
import { IAcademicPeriodInfo } from './../../types/services/academicperiod.types';

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

  public async getPeriodsByIntakeAcademicYearLevelId(
    academicYearProgramIntakeLevelId: number,
  ): Promise<AxiosResponse<Response<IAcademicPeriodInfo[]>>> {
    return await adminstrationAxios.get(
      `academicProgramIntakeLevels/getPeriodsByIntakeAcademicYearLevelId/${academicYearProgramIntakeLevelId}`,
    );
  }

  public async getModulesByIntakeAcademicYearLevelId(
    academicYearProgramIntakeLevelId: number,
  ): Promise<AxiosResponse<Response<IntakeLevelModule[]>>> {
    return await adminstrationAxios.get(
      `academicProgramIntakeLevels/getModulesByIntakeAcademicYearLevelId/${academicYearProgramIntakeLevelId}`,
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
  public async addModuleToLevel(
    newModule: AddLevelToModule[],
  ): Promise<AxiosResponse<Response<ModuleInfo[]>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addModulesToIntakeProgramLevel`,
      newModule,
    );
  }
}

export const intakeProgramService = new IntakeProgramService();
