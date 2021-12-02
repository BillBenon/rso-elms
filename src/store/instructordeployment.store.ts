import { useMutation, useQuery } from 'react-query';

import { instructorDeployment } from '../services/administration/InstructorDeployment.service';

class InstructorDeploymentStore {
  getInstructorsDeployedInAcademy(academyId: string) {
    return useQuery(['instructor-deploy/academy', academyId], () =>
      instructorDeployment.getInstructorsDeployedInAcademy(academyId),
    );
  }
  getInstructorsRegisteredInAcademy(academyId: string) {
    return useQuery(['instructor-deploy/academy', academyId], () =>
      instructorDeployment.getInstructorsRegisteredInAcademy(academyId),
    );
  }
  getInstructorById(id: string) {
    return useQuery(['instructor/id', id], () =>
      instructorDeployment.getInstructorById(id),
    );
  }
  getInstructorByUserId(userId: string) {
    return useQuery(['instructor/userId', userId], () =>
      instructorDeployment.getInstructorByUserId(userId),
    );
  }
  getInstructors() {
    return useQuery(['instructors'], () => instructorDeployment.getInstructors());
  }

  deploy() {
    return useMutation(instructorDeployment.deploy);
  }
}

export default new InstructorDeploymentStore();
