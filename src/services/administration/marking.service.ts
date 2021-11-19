import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { MarkingRequired } from '../../types/services/marking.types';

class MarkingService {
    
  public async finishMarking(
    markInfo: MarkingRequired,
  ): Promise<AxiosResponse<Response<any>>> {
    return await evaluationAxios.post(`/student-answers/student-answer/${markInfo.answer_id}/markAnswer`, {mark: markInfo.mark});
  }
}
export const markingService = new MarkingService();
