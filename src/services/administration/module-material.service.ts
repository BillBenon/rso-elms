import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  MaterialInfo,
  ModuleMaterial,
  ModuleMaterialAttachment,
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
  public async addModuleMaterialAttachment(
    moduleMaterial: ModuleMaterialAttachment,
  ): Promise<AxiosResponse<Response<ModuleMaterialAttachment>>> {
    return await adminstrationAxios.post(
      '/learningMaterials/addLearningMaterialAttachment',
      moduleMaterial,
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
