import { useMutation } from 'react-query';

import { intakeService } from '../services/administration/intake.service';

class IntakeStore {
  create() {
    return useMutation(intakeService.create);
  }
  getAll() {
    return useMutation(intakeService.fetchAll);
  }
  getIntakeById() {
    return useMutation(intakeService.getIntakeById);
  }

  getIntakesByAcademy() {
    return useMutation(intakeService.getIntakesByAcademy);
  }
}

export const intakeStore = new IntakeStore();
