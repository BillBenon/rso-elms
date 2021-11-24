import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { MarkAllEvaluationQuestions } from '../../types/services/marking.types';

class MarkingService {
    
  public async finishMarking(
    markInfo: MarkAllEvaluationQuestions,
  ): Promise<AxiosResponse<Response<any>>> {
    const correction = markInfo.correction;
    console.log(correction);
    return await evaluationAxios.put(`/student-answers/markStudentEvaluation/${markInfo.studentEvaluation}`, {correction});
  }


  // public async finishMarking(
  //   markInfo: MarkingRequired,
  // ): Promise<AxiosResponse<Response<any>>> {
  //   console.log(markInfo);
  //   return await evaluationAxios.post(`/student-answers/student-answer/${markInfo.answer_id}/markAnswer`, {mark: markInfo.mark});
  // }

  public async getStudentEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.get(`/studentEvaluation/getById/${id}`);
  }

  public async getStudentEvaluationAnswers(
    id: string,
  ): Promise<AxiosResponse<Response<any[]>>> {
    return await evaluationAxios.get(`/student-answers/getAllByStudentEvaluation/${id}`);

  }

  public async getAllStudentEvaluationsByEvaluation(
    id: string,
  ): Promise<AxiosResponse<Response<any[]>>> {
    return await evaluationAxios.get(`studentEvaluation/getByEvaluation/${id}`);

  }
}
export const markingService = new MarkingService();
