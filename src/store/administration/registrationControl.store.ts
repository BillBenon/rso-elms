import { useMutation, useQuery } from 'react-query';

import { registrationControlService } from '../../services/administration/registrationControl.service';

class RegistrationControlStore {
  createRegControl() {
    return useMutation(registrationControlService.addNew);
  }
  fetchRegControl() {
    return useQuery('regControl', registrationControlService.getAll);
  }

  fetchRegControlById(id: string, enabled = true) {
    return useQuery(['regControl/id', id], () => registrationControlService.getById(id), {
      enabled,
    });
  }

  fetchRegControlByAcademy(id: string, enabled = true) {
    return useQuery(
      ['regControl/academyId', id],
      () => registrationControlService.getByAcademy(id),
      {
        enabled,
      },
    );
  }

  updateRegControl() {
    return useMutation(registrationControlService.update);
  }
}

export default new RegistrationControlStore();
