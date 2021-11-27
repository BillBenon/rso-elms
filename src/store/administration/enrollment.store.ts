import { useMutation, useQuery } from 'react-query';

import { enrollmentService } from '../../services/administration/enrollments.service';

class EnrolmmentStore {
  getInstructorLevels(instructorId: string) {
    return useQuery(['instructor/levels', instructorId], () =>
      enrollmentService.getInstructorLevel(instructorId),
    );
  }

  getInstructorPrograms(instructorId: string) {
    return useQuery(['instructor/program', instructorId], () =>
      enrollmentService.getInstructorPrograms(instructorId),
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
}

export default new EnrolmmentStore();
