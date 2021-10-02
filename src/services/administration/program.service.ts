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
  public async getProgramById(id: string): Promise<AxiosResponse<Response<ProgramInfo>>> {
    return await adminstrationAxios.get(`/programs/getAcademicProgramById/${id}`);
  }

  public async modifyProgram(
    programInfo: CreateProgramInfo,
  ): Promise<AxiosResponse<Response<ProgramInfo>>> {
    return await adminstrationAxios.put('/programs/modifyAcademicProgram', {
      ...programInfo,
    });
  }
}

export const programService = new ProgramService();
