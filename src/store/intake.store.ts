import { useMutation, useQuery } from 'react-query';

import { intakeService } from '../services/administration/intake.service';

class IntakeStore {
  create() {
    return useMutation(intakeService.create);
  }
  getAll() {
    console.log('in store');
    return useQuery('intakes', intakeService.fetchAll);
  }
  getIntakeById(id: string) {
    return useQuery(['intakes/id', id], () => intakeService.getIntakeById);
  }

  getIntakesByAcademy(academyId: string) {
    return useQuery(
      ['intakes/academy', academyId],
      () => intakeService.getIntakesByAcademy,
    );
  }
}

export const intakeStore = new IntakeStore();
