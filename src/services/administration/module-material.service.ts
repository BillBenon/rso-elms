import { AxiosResponse } from 'axios';
import { Blob } from 'buffer';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  MaterialInfo,
  ModuleMaterial,
  ModuleMaterialAttachment,
  ModuleMaterialAttachmentInfo,
  ModuleMaterialInfo,
} from './../../types/services/module-material.types';

class ModuleMaterialService {
  public async addModuleMaterial(
    moduleMaterial: ModuleMaterial,
  ): Promise<AxiosResponse<Response<ModuleMaterial>>> {
    return await adminstrationAxios.post(
      '/learningMaterials/addLearningMaterial',
      moduleMaterial,
    );
  }
  public async addFile(file: FormData): Promise<AxiosResponse<Response<MaterialInfo>>> {
    return await adminstrationAxios.post('/attachments/addFile', file);
  }
  public async downloadFile(attachmentId: string): Promise<AxiosResponse<Blob>> {
    return await adminstrationAxios.get(`/attachments/download/${attachmentId}`);
  }

  public async getFileById(
    attachmentId: string,
  ): Promise<AxiosResponse<Response<MaterialInfo>>> {
    return await adminstrationAxios.get(`/attachments/getById/${attachmentId}`);
  }

  public async addModuleMaterialAttachment(
    moduleMaterial: ModuleMaterialAttachment,
  ): Promise<AxiosResponse<Response<ModuleMaterialAttachmentInfo>>> {
    return await adminstrationAxios.post(
      '/learningMaterials/addLearningMaterialAttachment',
      moduleMaterial,
    );
  }
  public async getModuleMaterialAttachments(
    materialId: string,
  ): Promise<AxiosResponse<Response<ModuleMaterialAttachmentInfo[]>>> {
    return await adminstrationAxios.get(
      `learningMaterials/getLearningMaterialsAttachementsByLearningMaterialId/${materialId}`,
    );
  }
  public async getModuleMaterial(
    id: string,
  ): Promise<AxiosResponse<Response<ModuleMaterialInfo>>> {
    return await adminstrationAxios.get(
      `learningMaterials/getLearningMaterialsById/${id}`,
    );
  }
  public async getModuleMaterialByModule(
    moduleId: string,
  ): Promise<AxiosResponse<Response<ModuleMaterialInfo[]>>> {
    return await adminstrationAxios.get(
      `learningMaterials/getLearningMaterialsByModuleId/${moduleId}`,
    );
  }
}

export const moduleMaterialService = new ModuleMaterialService();
