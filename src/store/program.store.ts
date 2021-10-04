import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { programService } from '../services/administration/program.service';
import { Response } from '../types';
import { CreateProgramInfo, ProgramInfo } from '../types/services/program.types';

class ProgramStore {
  createProgram() {
    return useMutation(programService.createProgram, {
      onSuccess(newData) {
        queryClient.setQueryData(['programs'], (old) => {
          const previousData = old as AxiosResponse<Response<CreateProgramInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  fetchPrograms() {
    return useQuery('programs', programService.fetchPrograms);
  }
  getProgramById(id: string) {
    return useQuery(['programs/id', id], () => programService.getProgramById(id));
  }
  getModulesByProgram(program_id: string) {
    return useQuery(['modules/program_id', program_id], () =>
      programService.getModulesByProgram(program_id),
    );
  }

  modifyProgram() {
    return useMutation(programService.modifyProgram, {
      onSuccess(newData) {
        queryClient.setQueryData(['academies'], (old) => {
          const previousData = old as AxiosResponse<Response<ProgramInfo[]>>;
          previousData.data.data.map((program: ProgramInfo, index: number) => {
            if (program.id == newData.data.data.id)
              previousData.data.data[index] = newData.data.data;
          });
          return previousData;
        });
      },
    });
  }
}

export default new ProgramStore();
