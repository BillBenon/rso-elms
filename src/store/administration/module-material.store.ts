import { useMutation, useQuery } from 'react-query';

import { moduleMaterialService } from '../../services/administration/module-material.service';

class ModuleMaterialStore {
  addModuleMaterial() {
    return useMutation(moduleMaterialService.addModuleMaterial);
  }
  addFile() {
    return useMutation(moduleMaterialService.addFile);
  }
  addModuleMaterialAttachment() {
    return useMutation(moduleMaterialService.addModuleMaterialAttachment);
  }
  getModuleMaterial(id: string) {
    return useQuery(['material/id', id], () =>
      moduleMaterialService.getModuleMaterial(id),
    );
  }
  getModuleMaterialByModule(moduleId: string) {
    return useQuery(['material/moduleid', moduleId], () =>
      moduleMaterialService.getModuleMaterialByModule(moduleId),
    );
  }
}

export const moduleMaterialStore = new ModuleMaterialStore();
