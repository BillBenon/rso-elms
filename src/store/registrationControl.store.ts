import { useMutation, useQuery } from 'react-query';

import { registrationControlService } from '../services/administration/registrationControl.service';

class RegistrationControlStore {
  createRegControl() {
    return useMutation(registrationControlService.addNew);
  }
  fetchRegControl() {
    return useQuery('regControl', registrationControlService.getAll);
  }
}

export default new RegistrationControlStore();
