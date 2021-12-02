import { useMutation, useQuery } from 'react-query';

import { moduleMaterialService } from '../../services/administration/module-material.service';

class ModuleMaterialStore {
  addModuleMaterial() {
    return useMutation(moduleMaterialService.addModuleMaterial);
  }
  addFile() {
    return useMutation(moduleMaterialService.addFile);
  }

  downloadFile(materialId: string, enabled = true) {
    return useQuery(
      ['download/material', materialId],
      () => moduleMaterialService.downloadFile(materialId),
      { enabled },
    );
  }
  getFileById(materialId: string) {
    return useQuery(['attachment/id', materialId], () =>
      moduleMaterialService.getFileById(materialId),
    );
  }
  addModuleMaterialAttachment() {
    return useMutation(moduleMaterialService.addModuleMaterialAttachment);
  }
  getModuleMaterial(id: string) {
    return useQuery(['material/id', id], () =>
      moduleMaterialService.getModuleMaterial(id),
    );
  }
  getModuleMaterialAttachments(materialId: string) {
    return useQuery(['material/attachment', materialId], () =>
      moduleMaterialService.getModuleMaterialAttachments(materialId),
    );
  }
  getModuleMaterialByModule(moduleId: string) {
    return useQuery(['material/moduleid', moduleId], () =>
      moduleMaterialService.getModuleMaterialByModule(moduleId),
    );
  }
}

export const moduleMaterialStore = new ModuleMaterialStore();
