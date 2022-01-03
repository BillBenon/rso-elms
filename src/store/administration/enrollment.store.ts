import { useMutation, useQuery } from 'react-query';

import { enrollmentService } from '../../services/administration/enrollments.service';
import { ModuleAssignmentType } from '../../types/services/enrollment.types';

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

  getModuleAssignmentByIntakeProgramAndModule(data: ModuleAssignmentType) {
    return useQuery(['instructor/module/assignment', data], () =>
      enrollmentService.getModuleAssignmentByIntakeProgramAndModule(data),
    );
  }

  getInstructorsByModule(moduleId: string) {
    return useQuery(['instructors/module', moduleId], () =>
      enrollmentService.getInstructorsByModuleId(moduleId),
    );
  }

  getInstructorsBySubject(subjectId: string) {
    return useQuery(['instructors/subject', subjectId], () =>
      enrollmentService.getInstructorsBySubjectId(subjectId),
    );
  }

  getSubjectsByInstructor(instructorId: string) {
    return useQuery(['subjects/instructors', instructorId], () =>
      enrollmentService.getSubjectsByInstructor(instructorId),
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
    return useQuery(['instructors/levelsEnrolled', levelId], () =>
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
  enrollInstructorToModule() {
    return useMutation(enrollmentService.enrollInstructorToModule);
  }

  enrollInstructorToSubject() {
    return useMutation(enrollmentService.enrollInstructorToSubject);
  }

  enrollInstructorToLevel() {
    return useMutation(enrollmentService.enrollInstructorToLevel);
  }
  approveStudent() {
    return useMutation(enrollmentService.approveStudent);
  }
}

export default new EnrolmmentStore();
