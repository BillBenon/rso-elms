import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response, SortedContent } from '../../types';
import {
  ApproveStudents,
  EnrollInstructorLevel,
  EnrollInstructorLevelInfo,
  EnrollInstructorProgram,
  EnrollInstructorToSubject,
  EnrollStudentToLevel,
  EnrollStudentToProgram,
  InstructorAssignModule,
  SubjectInstructors,
} from '../../types/services/enrollment.types';
import {
  Instructor,
  InstructorModuleAssignment,
} from '../../types/services/instructor.types';
import {
  LevelIntakeProgram,
  StudentIntakeProgram,
} from '../../types/services/intake-program.types';
import { IntakeLevelProgramInfo, Student } from '../../types/services/user.types';
import {
  EnrollInstructorToModuleInfo,
  ModuleInstructors,
} from './../../types/services/enrollment.types';
import { InstructorProgram } from './../../types/services/instructor.types';

class EnrollmentService {
  public async getInstructorLevel(
    instructorId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByInstructor/${instructorId}`,
    );
  }

  public async getStudentLevelEnrollments(
    levelId: number,
  ): Promise<AxiosResponse<Response<IntakeLevelProgramInfo[]>>> {
    return await adminstrationAxios.get(
      `students/getStudentsInIntakeProgramLevel/${levelId}`,
    );
  }

  public async getInstructorsInProgram(
    intakeProgramId: number | string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorIntakeProgramsByIntakeProgram/${intakeProgramId}`,
    );
  }

  public async getInstructorEnrollmentLevelByLevelId(
    levelId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByAcademicYearProgramIntakeLevel/${levelId}`,
    );
  }

  public async getInstructorIntakePrograms(
    instructorId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorIntakePrograms/${instructorId}`,
    );
  }

  public async getInstructorLevelID(
    levelId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorLevelInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorEnrolmentLevelByAcademicYearProgramIntakeLevel/${levelId}`,
    );
  }

  public async getInstructorIntakeProgramsById(
    intakeProgramInstructorId: string,
  ): Promise<AxiosResponse<Response<InstructorProgram>>> {
    return await adminstrationAxios.get(
      `instructorEnrolment/getInstructorIntakeProgramsById/${intakeProgramInstructorId}`,
    );
  }
  public async getInstructorAssignedmodule(
    courseModuleId: string | number,
  ): Promise<AxiosResponse<Response<InstructorModuleAssignment[]>>> {
    return await adminstrationAxios.get(
      `instructorModuleAssignment/getAllByCourseModule/${courseModuleId}`,
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

  public async enrollInstructorToModule(
    instructor: InstructorAssignModule,
  ): Promise<AxiosResponse<Response<InstructorProgram>>> {
    return await adminstrationAxios.post(
      'instructorModuleAssignment/assignInstructorOnModule',
      instructor,
    );
  }

  public async enrollInstructorToSubject(
    instructor: EnrollInstructorToSubject,
  ): Promise<AxiosResponse<Response<SubjectInstructors>>> {
    return await adminstrationAxios.post(
      'instructorModuleAssignment/assignInstructorOnModule',
      instructor,
    );
  }

  public async enrollInstructorToLevel(
    instructor: EnrollInstructorLevel,
  ): Promise<AxiosResponse<Response<Instructor>>> {
    return await adminstrationAxios.post('instructorEnrolment/enroleInLevel', instructor);
  }

  public async getModulesByInstructorId(
    instructorId: string,
  ): Promise<AxiosResponse<Response<EnrollInstructorToModuleInfo[]>>> {
    return await adminstrationAxios.get(
      `instructorModuleAssignment/getAllByInstructor/${instructorId}`,
    );
  }

  public async getInstructorsByModuleId(
    moduleId: string,
  ): Promise<AxiosResponse<Response<ModuleInstructors[]>>> {
    return await adminstrationAxios.get(
      `instructorModuleAssignment/getAllInstructorsAssignedOnModule/${moduleId}`,
    );
  }

  public async getInstructorsBySubjectId(
    subjectId: string,
  ): Promise<AxiosResponse<Response<SortedContent<EnrollInstructorToSubject[]>>>> {
    return await adminstrationAxios.get(
      `instructorSubjectAssignment/getAll`,
    );
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
