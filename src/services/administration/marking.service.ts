import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { MarkingRequired } from '../../types/services/marking.types';

class MarkingService {
    
  public async finishMarking(
    markInfo: MarkingRequired,
  ): Promise<AxiosResponse<Response<any>>> {
    console.log(markInfo);
    return await evaluationAxios.post(`/student-answers/student-answer/${markInfo.answer_id}/markAnswer`, {mark: markInfo.mark});
  }

  public async getStudentEvaluationById(
    id: string,
  ): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.get(`/studentEvaluations/getById/${id}`);
  }

  public async getStudentEvaluationAnswers(
    id: string,
  ): Promise<AxiosResponse<Response<any[]>>> {
    return await evaluationAxios.get(`/student-answers/getAllByStudentEvaluation/${id}`);

  }
}
export const markingService = new MarkingService();
