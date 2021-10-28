import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { UserInfo } from '../../types/services/user.types';

class IntakeProgramService {
  public async getStudentsByIntakeProgram(
    intakeProgramId: string,
  ): Promise<AxiosResponse<Response<UserInfo[]>>> {
    return await adminstrationAxios.get(
      `/students/getStudentsByIntakeProgram/${intakeProgramId}`,
    );
  }
}

export const intakeProgramService = new IntakeProgramService();
