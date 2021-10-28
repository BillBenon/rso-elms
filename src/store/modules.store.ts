import { useMutation, useQuery } from 'react-query';

import { moduleService } from '../services/administration/modules.service';

class ModuleStore {
  addModule() {
    return useMutation(moduleService.create);
  }
  getAllModules() {
    return useQuery('modules', moduleService.fetchAll);
  }

  getModuleById(id: string) {
    return useQuery(['modules/id', id], () => moduleService.getModuleById(id));
  }

  getModulesByAcademy(academyId: string) {
    return useQuery(['modules/academy/id', academyId], () =>
      moduleService.getModulesByAcademy(academyId),
    );
  }

  getModulesByProgram(programId: string) {
    return useQuery(['modules/program/id', programId], () =>
      moduleService.getModulesByProgram(programId),
    );
  }

  modifyModule() {
    return useMutation(moduleService.modifyModule);
  }
  addPrerequisites() {
    return useMutation(moduleService.addPrerequisites);
  }
}

export const moduleStore = new ModuleStore();
