import { useMutation, useQuery } from 'react-query';

import { intakeService } from '../services/administration/intake.service';

class IntakeStore {
  create() {
    return useMutation(intakeService.create);
  }
  addPrograms() {
    return useMutation(intakeService.addPrograms);
  }
  getAll() {
    return useQuery('intakes', intakeService.fetchAll);
  }
  getIntakeById(id: string) {
    return useQuery(['intakes/id', id], () => intakeService.getIntakeById);
  }

  getIntakesByAcademy(academyId: string) {
    return useQuery(['intakes/academy', academyId], () =>
      intakeService.getIntakesByAcademy(academyId),
    );
  }
  getIntakesByRegControl(regControlId: string) {
    return useQuery(['intakes/regcontrol', regControlId], () =>
      intakeService.getIntakesByRegControl(regControlId),
    );
  }

  getProgramsByIntake(intakeId: string) {
    return useQuery(['intakes/programs', intakeId], () =>
      intakeService.getProgramsByIntake(intakeId),
    );
  }
}

export const intakeStore = new IntakeStore();
