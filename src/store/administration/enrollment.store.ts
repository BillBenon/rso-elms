import { useMutation, useQuery } from 'react-query';

import { enrollmentService } from '../../services/administration/enrollments.service';

class EnrolmmentStore {
  getInstructorLevels(instructorId: string) {
    return useQuery(['instructor/levels', instructorId], () =>
      enrollmentService.getInstructorLevel(instructorId),
    );
  }

  getInstructorEnrollmentLevelByLevelId(levelId: string) {
    return useQuery(['instructor/levelId', levelId], () =>
      enrollmentService.getInstructorEnrollmentLevelByLevelId(levelId),
    );
  }

  getInstructorIntakePrograms(instructorId: string) {
    return useQuery(['instructor/program', instructorId], () =>
      enrollmentService.getInstructorIntakePrograms(instructorId),
    );
  }

  getInstructorIntakeProgramsById(instructorId: string) {
    return useQuery(['instructor/intakeprogram', instructorId], () =>
      enrollmentService.getInstructorIntakeProgramsById(instructorId),
    );
  }

  getModulesByInstructorId(instructorId: string) {
    return useQuery(['instructor/modules', instructorId], () =>
      enrollmentService.getModulesByInstructorId(instructorId),
    );
  }

  getInstructorsByModule(moduleId: string) {
    return useQuery(['instructors/module', moduleId], () =>
      enrollmentService.getInstructorsByModuleId(moduleId),
    );
  }

  getStudentsAcademy(academyId: string) {
    return useQuery(['student/academy', academyId], () =>
      enrollmentService.getStudentAcademy(academyId),
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
  enrollInstructorToLevel() {
    return useMutation(enrollmentService.enrollInstructorToLevel);
  }
  enrollInstructorToModule() {
    return useMutation(enrollmentService.enrollInstructorToModule);
  }
  approveStudent() {
    return useMutation(enrollmentService.approveStudent);
  }
}

export default new EnrolmmentStore();
