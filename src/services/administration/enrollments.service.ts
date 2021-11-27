import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  EnrollInstructorLevel,
  EnrollInstructorLevelInfo,
  EnrollInstructorProgram,
  EnrollStudents,
  EnrollStudentToProgram,
} from '../../types/services/enrollment.types';
import { Instructor } from '../../types/services/instructor.types';
import {
  LevelIntakeProgram,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { InstructorProgram } from './../../types/services/instructor.types';

class EnrollmentService {
  public async getInstructorLevel(
    instructorId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByInstructor/${instructorId}`,
    );
  }

  public async getInstructorPrograms(
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorPrograms/${instructorId}`,
    );
  }

  public async enrollStudentsToLevel(
    newStudent: EnrollStudents,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram>>> {
    return await adminstrationAxios.post(`students/enrollStudentInLevel`, newStudent);
  }

  public async enrollStudentToProgram(
    newStudent: EnrollStudentToProgram,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram>>> {
    return await adminstrationAxios.post(
      `students/enrolStudentInIntakeProgram`,
      newStudent,
    );
  }

  public async enrollInstructorToProgram(
    instructor: EnrollInstructorProgram,
  ): Promise<AxiosResponse<Response<Instructor>>> {
    return await adminstrationAxios.post(
      'instructorEnrolment/enroleInProgram',
      instructor,
    );
  }

  public async enrollInstructorToLevel(
    instructor: EnrollInstructorLevel,
  ): Promise<AxiosResponse<Response<Instructor>>> {
    return await adminstrationAxios.post('instructorEnrolment/enroleInLevel', instructor);
  }
}

export const enrollmentService = new EnrollmentService();
