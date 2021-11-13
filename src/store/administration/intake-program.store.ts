import { useMutation, useQuery } from 'react-query';

import { intakeProgramService } from '../../services/administration/IntakeProgram.service';

class IntakeProgramStore {
  getStudentsByIntakeProgram(intakeProgramId: string) {
    return useQuery(['students/intakeProgramId', intakeProgramId], () =>
      intakeProgramService.getStudentsByIntakeProgram(intakeProgramId),
    );
  }
  addLevelsToIntakeProgram() {
    return useMutation(intakeProgramService.addLevelsToIntakeProgram);
  }
}

export default new IntakeProgramStore();
