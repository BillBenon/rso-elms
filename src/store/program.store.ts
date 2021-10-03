import { useMutation, useQuery } from 'react-query';

import { programService } from '../services/administration/program.service';

class ProgramStore {
  createProgram() {
    return useMutation(programService.createProgram);
  }
  fetchPrograms() {
    return useQuery('programs', programService.fetchPrograms);
  }
  getProgramById(id: string) {
    return useQuery(['programs/id', id], () => programService.getProgramById(id));
  }
  getAcademicProgramsByLevel(levelId: string) {
    return useQuery(['programs/level', levelId], () =>
      programService.getAcademicProgramsByLevel(levelId),
    );
  }

  getModulesByProgram(program_id: string) {
    return useQuery(['modules/program_id', program_id], () =>
      programService.getModulesByProgram(program_id),
    );
  }

  modifyProgram() {
    return useMutation(programService.modifyProgram);
  }
}

export default new ProgramStore();
