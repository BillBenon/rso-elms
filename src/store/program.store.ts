import { useMutation, useQuery } from 'react-query';

import { programService } from '../services/administration/program.service';

class ProgramStore {
  createProgram() {
    return useMutation(programService.createProgram);
  }
  fetchPrograms() {
    return useQuery('programs', programService.fetchPrograms);
  }
}

export default new ProgramStore();
