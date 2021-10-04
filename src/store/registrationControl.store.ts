import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { registrationControlService } from '../services/administration/registrationControl.service';
import { Response } from '../types';
import { IRegistrationControlInfo } from '../types/services/registrationControl.types';

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

  updateRegControl(IdToUpdate: string) {
    return useMutation(registrationControlService.update, {
      onSuccess(newData) {
        queryClient.setQueryData(['regControl', IdToUpdate], (old) => {
          const previousData = old as AxiosResponse<Response<IRegistrationControlInfo[]>>;
          previousData.data.data = previousData.data.data.map(
            (fac: IRegistrationControlInfo) => {
              if (fac.id === newData.data.data.id) return newData.data.data;
              else return fac;
            },
          );
          return previousData;
        });
      },
    });
  }
}

export default new RegistrationControlStore();
