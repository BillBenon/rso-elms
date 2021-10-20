import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { programService } from '../services/administration/program.service';
import { Response } from '../types';
import { CreateProgramInfo } from '../types/services/program.types';

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
  addProgramToLevel() {
    return useMutation(programService.addProgramToLevel);
  }

  fetchPrograms() {
    return useQuery('programs', programService.fetchPrograms);
  }
  getProgramById(id: string) {
    return useQuery(['programs/id', id], () => programService.getProgramById(id));
  }
  getLevelsByAcademicProgram(academicProgramId: string) {
    return useQuery(['levels/program_id', academicProgramId], () =>
      programService.getLevelsByAcademicProgram(academicProgramId),
    );
  }

  getModulesByProgram(program_id: string) {
    return useQuery(['modules/program_id', program_id], () =>
      programService.getModulesByProgram(program_id),
    );
  }

  getProgramsByDepartment(program_id: string) {
    return useQuery(['programs/program_id', program_id], () =>
      programService.getProgramsByDepartment(program_id),
    );
  }

  modifyProgram() {
    return useMutation(programService.modifyProgram);
  }
}

export default new ProgramStore();
