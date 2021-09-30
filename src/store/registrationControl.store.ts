import { useMutation, useQuery } from 'react-query';

import { registrationControlService } from '../services/administration/registrationControl.service';

class RegistrationControlStore {
  createRegControl() {
    return useMutation(registrationControlService.addNew);
  }
  fetchRegControl() {
    return useQuery('regControl', registrationControlService.getAll);
  }

  fetchRegControlById(id: string) {
    return useQuery(['regControl/id', id], () => registrationControlService.getById(id));
  }

  updateRegControl() {
    return useMutation(registrationControlService.update);
  }
}

export default new RegistrationControlStore();
