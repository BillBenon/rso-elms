import { useQuery } from 'react-query';

import { instructorDeployment } from '../services/administration/InstructorDeployment.service';

class InstructorDeploymentStore {
  getInstructorsDeployedInAcademy(academyId: string) {
    return useQuery(['instructor-deploy/academy', academyId], () =>
      instructorDeployment.getInstructorsDeployedInAcademy(academyId),
    );
  }
}

export default new InstructorDeploymentStore();
