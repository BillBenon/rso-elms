import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { ILevel } from '../../types/services/levels.types';
import { ModuleInfo } from '../../types/services/modules.types';
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

  public async getLevelsByAcademicProgram(
    academicProgramId: string,
  ): Promise<AxiosResponse<Response<ILevel[]>>> {
    return await adminstrationAxios.get(
      `/programs/getLevelsByAcademicProgram/${academicProgramId}`,
    );
  }

  public async getModulesByProgram(
    id: string,
  ): Promise<AxiosResponse<Response<ModuleInfo[]>>> {
    return await adminstrationAxios.get(`
    /coursemodules/getModulesByProgram/${id}`);
  }

  public async getProgramsByDepartment(
    id: string,
  ): Promise<AxiosResponse<Response<ProgramInfo[]>>> {
    return await adminstrationAxios.get(`
    /coursemodules/getProgramsByDepartment/${id}`);
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
