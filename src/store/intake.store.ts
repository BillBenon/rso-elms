import { useMutation, useQuery } from 'react-query';

import { intakeService } from '../services/administration/intake.service';

class IntakeStore {
  create() {
    return useMutation(intakeService.create);
  }
  addPrograms() {
    return useMutation(intakeService.addPrograms);
  }
  getAll(registrationControlId?: string) {
    console.log(registrationControlId, 'invoked');
    if (registrationControlId)
      return useQuery(['intakes/programs', registrationControlId], () =>
        intakeService.getIntakesPyRegistrationControl(registrationControlId),
      );
    else return useQuery('intakes', intakeService.fetchAll);
  }
  getIntakeById(id: string) {
    return useQuery(['intakes/id', id], () => intakeService.getIntakeById);
  }

  getProgramsByIntake(intakeId: string) {
    return useQuery(['intakes/id', intakeId], () =>
      intakeService.getProgramsByIntake(intakeId),
    );
  }

  getIntakesByAcademy(academyId: string) {
    return useQuery(['intakes/academy', academyId], () =>
      intakeService.getIntakesByAcademy(academyId),
    );
  }

  getIntakesByProgram(programId: string) {
    return useQuery(['intakes/programs', programId], () =>
      intakeService.getIntakesByProgram(programId),
    );
  }

  getIntakesByRegistrationControl(registrationControlId: string) {
    return useQuery(
      ['intakes/programs', registrationControlId],
      () => intakeService.getIntakesPyRegistrationControl(registrationControlId),
      { enabled: false },
    );
  }
}

export const intakeStore = new IntakeStore();
