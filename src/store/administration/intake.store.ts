import { useMutation, useQuery } from 'react-query';

import { intakeService } from '../../services/administration/intake.service';

class IntakeStore {
  create() {
    return useMutation(intakeService.create);
  }
  update() {
    return useMutation(intakeService.update);
  }
  addPrograms() {
    return useMutation(intakeService.addPrograms);
  }

  getAll(registrationControlId?: string) {
    if (registrationControlId)
      return useQuery(['intakes/registrationControl', registrationControlId], () =>
        intakeService.getIntakesPyRegistrationControl(registrationControlId),
      );
    else return useQuery('intakes', intakeService.fetchAll);
  }
  getIntakeById(intakeId: string, enabled = true) {
    return useQuery(
      ['intakes/id', intakeId],
      () => intakeService.getIntakeById(intakeId),
      { enabled },
    );
  }

  getProgramsByIntake(intakeId: string) {
    return useQuery(['programsIntake/id', intakeId], () =>
      intakeService.getProgramsByIntake(intakeId),
    );
  }

  getIntakesByAcademy(id: string, fetchByReg = false) {
    if (fetchByReg)
      return useQuery(['intakes/registrationControl', id], () =>
        intakeService.getIntakesPyRegistrationControl(id),
      );
    else
      return useQuery(['intakes/academy', id], () =>
        intakeService.getIntakesByAcademy(id),
      );
  }
  getIntakesByRegControl(regControlId: string) {
    return useQuery(['intakes/regcontrol', regControlId], () =>
      intakeService.getIntakesByRegControl(regControlId),
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
