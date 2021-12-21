import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { StudentApproval } from '../../types/services/enrollment.types';
import { InstructorProgram } from '../../types/services/instructor.types';
import {
  AddIntakeProgramLevelPeriod,
  AddLevelToModule,
  CreateLevelIntakeProgram,
  IntakeLevelModule,
  IntakeProgramLevelPeriodInfo,
  LevelIntakeProgram,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { ModuleInfo } from '../../types/services/modules.types';
import { Student } from '../../types/services/user.types';
import { StudentIntakeProgramLevel } from './../../types/services/intake-program.types';
import { InstructorModule } from './../../types/services/modules.types';

class IntakeProgramService {
  public async getStudentById(
    studentId: string,
  ): Promise<AxiosResponse<Response<Student>>> {
    return await adminstrationAxios.get(`/students/getStudentById/${studentId}`);
  }
  public async getStudentsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsByIntakeProgram/${intakeProgramId}`,
    );
  }

  public async getStudentsByIntakeProgramByStatus(
    intakeProgram: string,
    status: StudentApproval,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsOnProgramAndEnrolmentStatus/${intakeProgram}/${status}`,
    );
  }

  public async getStudentsByIntakeProgramLevel(
    intakeProgramlevelId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgramLevel[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsInIntakeProgramLevel/${intakeProgramlevelId}`,
    );
  }

  public async getInstructorsByIntakeProgram(
    programId: string,
    intakeId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `/instructorEnrolment/getInstructorProgramsOnProgramAndIntake/${programId}/${intakeId}`,
    );
  }
  public async getInstructorsByIntakeProgramLevel(
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `/instructorEnrolment/getInstructorEnrolmentLevelByInstructor/${instructorId}`,
    );
  }

  public async getModulesByInstructorAndStatus(
    inchargeId: string,
    status: string,
  ): Promise<AxiosResponse<Response<InstructorModule[]>>> {
    return await adminstrationAxios.get(
      `/academicProgramIntakeLevels/getModulesByInstructorInchargeAndStatus/${inchargeId}/${status}`,
    );
  }

  public async getStudentsByAcademy(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsByIntakeProgram/${intakeProgramId}`,
    );
  }

  public async getStudentShipByUserId(
    userId: string,
  ): Promise<AxiosResponse<Response<Student[]>>> {
    return await adminstrationAxios.get(`/students/getStudentShipsByUserI/${userId}`);
  }

  public async getIntakeProgramsByStudent(
    studentId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `/students/getIntakeProgramsByStudent/${studentId}`,
    );
  }

  public async getLevelsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram[]>>> {
    return await adminstrationAxios.get(
      `academicProgramIntakeLevels/getProgramLevelsByIntakeProgram/${intakeProgramId}`,
    );
  }

  public async getIntakeLevelById(
    levelId: string,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram>>> {
    return await adminstrationAxios.get(
      `academicProgramIntakeLevels/getAcademicProgramIntakeLevelById/${levelId}`,
    );
  }

  public async getStudentLevels(
    intakeProgramStudentId: string,
  ): Promise<AxiosResponse<Response<StudentIntakeProgramLevel[]>>> {
    return await adminstrationAxios.get(
      `students/getIntakeProgramLevelsOfStudent/${intakeProgramStudentId}`,
    );
  }

  public async getPeriodsByIntakeAcademicYearLevelId(
    academicYearProgramIntakeLevelId: number,
  ): Promise<AxiosResponse<Response<IntakeProgramLevelPeriodInfo[]>>> {
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
    newPeriod: AddIntakeProgramLevelPeriod,
  ): Promise<AxiosResponse<Response<IntakeProgramLevelPeriodInfo[]>>> {
    return await adminstrationAxios.post(
      `intakeAcademicYearPeriods/addIntakeAcademicYearPeriod`,
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
