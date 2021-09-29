import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  IRegistrationControlCreateInfo,
  IRegistrationControlInfo,
} from '../../types/services/registrationControl.types';

class RegistrationControlService {
  public async addNew(
    regControlInfo: IRegistrationControlCreateInfo,
  ): Promise<AxiosResponse<Response<IRegistrationControlInfo>>> {
    return await adminstrationAxios.post(
      '/regControls/addRegistrationControl',
      regControlInfo,
    );
  }

  //   public async getRegistrationControlById() {
  //     return await adminstrationAxios.get('/regControls/getRegistrationControlById/id');
  //   }
}

export const registrationControlService = new RegistrationControlService();
