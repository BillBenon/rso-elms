import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  AddIntakeProgramLevelPeriod,
  AddLevelToModule,
  CreateLevelIntakeProgram,
  IntakeLevelModule,
  LevelIntakeProgram,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { ModuleInfo } from '../../types/services/modules.types';
import { IAcademicPeriodInfo } from './../../types/services/academicperiod.types';

class IntakeProgramService {
  public async getStudentsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram[]>>> {
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
  ): Promise<AxiosResponse<Response<LevelIntakeProgram>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addAcademicProgramLevelToIntakeProgram`,
      newLevel,
    );
  }

  public async addPeriodsToLevel(
    newPeriod: AddIntakeProgramLevelPeriod[],
  ): Promise<AxiosResponse<Response<LevelIntakeProgram[]>>> {
    return await adminstrationAxios.post(
      `academicProgramIntakeLevels/addPeriodsToIntakeProgramLevel`,
      newPeriod,
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
