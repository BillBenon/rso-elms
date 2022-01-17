import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  IManualMarking,
  IManualMarkingInfo,
  MarkAllEvaluationQuestions,
  studentMarkingAnswer,
} from '../../types/services/marking.types';

class MarkingService {
  public async finishMarking(
    markInfo: MarkAllEvaluationQuestions,
  ): Promise<AxiosResponse<Response<any>>> {
    const correction = markInfo.correction;
    return await evaluationAxios.put(
      `/student-answers/markStudentEvaluation/${markInfo.studentEvaluation}`,
      { correction },
    );
  }

  public async publishResults(data: {
    evaluationId: string;
  }): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.put(
      `/studentEvaluations/evaluation/${data.evaluationId}/publishResults`,
    );
  }

  public async addManualMarking(
    data: IManualMarking[],
  ): Promise<AxiosResponse<Response<IManualMarking[]>>> {
    return await evaluationAxios.post(`/studentEvaluations/marking/manual-marking`, {
      student_evaluations: data,
    });
  }

  public async getManualMarkingMarks(
    evaluationId: string,
    classId: string,
  ): Promise<AxiosResponse<Response<IManualMarkingInfo[]>>> {
    return await evaluationAxios.get(
      `/studentEvaluations/evaluation/${evaluationId}/class/${classId}`,
    );
  }

  public async publishResult(data: {
    studentEvaluationId: any;
  }): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.put(
      `/studentEvaluations/studentEvaluation/${data.studentEvaluationId}/publish`,
    );
  }

  public async finalizaMarkingWithRemarks(data: {
    studentEvaluationId: any;
    body: any;
  }): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.post(
      `/studentEvaluations/studentEvaluation/${data.studentEvaluationId}/addRemark`,
      data.body,
    );
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
    return await evaluationAxios.get(`/studentEvaluations/getById/${id}`);
  }

  public async getStudentEvaluationAnswers(
    id: string,
  ): Promise<AxiosResponse<Response<studentMarkingAnswer[]>>> {
    return await evaluationAxios.get(`/student-answers/getAllByStudentEvaluation/${id}`);
  }

  public async getAllStudentEvaluationsByEvaluation(
    id: string,
  ): Promise<AxiosResponse<Response<any[]>>> {
    return await evaluationAxios.get(`studentEvaluations/getByEvaluation/${id}`);
  }
}
export const markingService = new MarkingService();
