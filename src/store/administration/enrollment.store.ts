import { useMutation, useQuery } from 'react-query';

import { enrollmentService } from '../../services/administration/enrollments.service';

class EnrolmmentStore {
  getInstructorLevels(instructorId: string) {
    return useQuery(['instructor/levels', instructorId], () =>
      enrollmentService.getInstructorLevel(instructorId),
    );
  }

  getInstructorIntakePrograms(instructorId: string) {
    return useQuery(['instructor/program', instructorId], () =>
      enrollmentService.getInstructorIntakePrograms(instructorId),
    );
  }

  getInstructorsInProgram(intakeProgram: string | number) {
    return useQuery(['instructorsInIntakeprogram/IntakeProgram', intakeProgram], () =>
      enrollmentService.getInstructorsInProgram(intakeProgram),
    );
  }


  getStudentsInProgramLevel(levelId: number) {
    return useQuery(['students/levelsEnrolled', levelId], () =>
      enrollmentService.getStudentLevelEnrollments(levelId),
    );
  }

  getInstructorsInProgramLevel(levelId: string) {
    return useQuery(['instructos/levelsEnrolled', levelId], () =>
      enrollmentService.getInstructorEnrollmentLevelByLevelId(levelId),
    );
  }

  getStudentsAcademy(academyId: string) {
    return useQuery(['student/academy', academyId], () =>
      enrollmentService.getStudentAcademy(academyId),
    );
  }

  getInstructorsonModule(courseId: string | number) {
    return useQuery(['instructorsinModule/ModuleId', courseId], () =>
      enrollmentService.getInstructorAssignedmodule(courseId),
    );
  }

  enrollStudentsToLevel() {
    return useMutation(enrollmentService.enrollStudentsToLevel);
  }
  enrollStudentToProgram() {
    return useMutation(enrollmentService.enrollStudentToProgram);
  }
  enrollInstructorToProgram() {
    return useMutation(enrollmentService.enrollInstructorToProgram);
  }
  enrollInstructorToModule(){
    return useMutation(enrollmentService.enrollInstructorToModule);
  }


  enrollInstructorToLevel() {
    return useMutation(enrollmentService.enrollInstructorToLevel);
  }
  approveStudent() {
    return useMutation(enrollmentService.approveStudent);
  }
}

export default new EnrolmmentStore();
