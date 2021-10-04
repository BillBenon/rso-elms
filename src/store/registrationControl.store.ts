import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { registrationControlService } from '../services/administration/registrationControl.service';
import { Response } from '../types';
import {
  IRegistrationControlCreateInfo,
  IRegistrationControlInfo,
} from '../types/services/registrationControl.types';

class RegistrationControlStore {
  createRegControl() {
    return useMutation(registrationControlService.addNew, {
      onSuccess(newData) {
        queryClient.setQueryData(['regControl'], (old) => {
          const previousData = old as AxiosResponse<
            Response<IRegistrationControlCreateInfo[]>
          >;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  fetchRegControl() {
    return useQuery('regControl', registrationControlService.getAll);
  }

  fetchRegControlById(id: string) {
    return useQuery(['regControl/id', id], () => registrationControlService.getById(id));
  }

  updateRegControl() {
    return useMutation(registrationControlService.update, {
      onSuccess(newData) {
        queryClient.setQueryData(['regControl'], (old) => {
          const previousData = old as AxiosResponse<Response<IRegistrationControlInfo[]>>;
          previousData.data.data.map(
            (regControl: IRegistrationControlInfo, index: number) => {
              if (regControl.id == newData.data.data.id)
                previousData.data.data[index] = newData.data.data;
            },
          );
          return previousData;
        });
      },
    });
  }
}

export default new RegistrationControlStore();
