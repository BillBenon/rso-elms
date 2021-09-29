import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { CreateProgramInfo, ProgramInfo } from '../../types/services/program.types';

class ProgramService {
  public async createProgram(
    programInfo: CreateProgramInfo,
  ): Promise<AxiosResponse<Response<ProgramInfo>>> {
    return await adminstrationAxios.post('/programs/addAcademicProgram', programInfo);
  }
  public async fetchPrograms(): Promise<AxiosResponse<Response<ProgramInfo[]>>> {
    return await adminstrationAxios.get('/programs/getPrograms');
  }
}

export const programService = new ProgramService();
