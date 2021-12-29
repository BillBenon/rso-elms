import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ApproveStudents,
  EnrollInstructorLevel,
  EnrollInstructorLevelInfo,
  EnrollInstructorProgram,
  EnrollStudentToLevel,
  EnrollStudentToProgram,
} from '../../types/services/enrollment.types';
import { Instructor } from '../../types/services/instructor.types';
import {
  LevelIntakeProgram,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { Student } from '../../types/services/user.types';
import { InstructorProgram } from './../../types/services/instructor.types';

class EnrollmentService {
  public async getInstructorLevel(
    instructorId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByInstructor/${instructorId}`,
    );
  }
  public async getInstructorEnrollmentLevelByLevelId(
    levelId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByAcademicProgramLevel/${levelId}`,
    );
  }

  public async getInstructorIntakePrograms(
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorIntakePrograms/${instructorId}`,
    );
  }

  public async getStudentAcademy(
    academyId: string,
  ): Promise<AxiosResponse<Response<Student[]>>> {
    return await adminstrationAxios.get(`students/getAccademyStudents/${academyId}`);
  }

  public async enrollStudentsToLevel(
    newStudent: EnrollStudentToLevel,
  ): Promise<AxiosResponse<Response<LevelIntakeProgram>>> {
    return await adminstrationAxios.post(
      `students/enrolStudentInIntakeProgramLevel`,
      newStudent,
    );
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
  ): Promise<AxiosResponse<Response<InstructorProgram>>> {
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

  public async approveStudent(
    student: ApproveStudents,
  ): Promise<AxiosResponse<Response<StudentIntakeProgram>>> {
    return await adminstrationAxios.put(
      'students/changeIntakeProgramStudentEnrolmentStatus',
      student,
    );
  }
}

export const enrollmentService = new EnrollmentService();
