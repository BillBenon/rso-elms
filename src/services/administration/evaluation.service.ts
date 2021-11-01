import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  IEvaluationCreate,
  IEvaluationInfo,
  IEvaluationQuestions,
  IEvaluationQuestionsInfo,
} from '../../types/services/evaluation.types';

class EvaluationService {
  public async createEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.post('/evaluations/add', evaluationInfo);
  }

  public async createEvaluationQuestion(
    questionsInfo: IEvaluationQuestions,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.post('/evaluationQuestions/add', questionsInfo);
  }
  public async fetchEvaluations(): Promise<AxiosResponse<Response<IEvaluationInfo[]>>> {
    return await evaluationAxios.get('/evaluations/getAll');
  }

  public async getEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.get(`/evaluations/getById/${id}`);
  }

  public async getEvaluationQuestions(
    id: string,
  ): Promise<AxiosResponse<Response<IEvaluationQuestionsInfo[]>>> {
    return await evaluationAxios.get(`/evaluationQuestions/getEvaluationQuestions/${id}`);
  }

  public async modifyEvaluation(
    evaluationInfo: IEvaluationCreate,
  ): Promise<AxiosResponse<Response<IEvaluationInfo>>> {
    return await evaluationAxios.put('/academies/modifyAcademy', { ...evaluationInfo });
  }
}

export const evaluationService = new EvaluationService();
