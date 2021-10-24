import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  IEvaluationCreate,
  IEvaluationInfo,
} from '../../types/services/evaluation.types';

class EvaluationService {
  public async createAcademy(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.post('/evaluations/add', evaluationInfo);
  }
  public async fetEvaluations(): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get('/academies/getAcademies');
  }
  public async getEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.get(`/evaluations/getById/${id}`);
  }

  public async modifyEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.put('/academies/modifyAcademy', { ...evaluationInfo });
  }
}

export const evaluationService = new EvaluationService();
